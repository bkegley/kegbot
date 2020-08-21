import { BaseService } from "../abstract";
import { EntityManager } from "typeorm";
import { Server } from "socket.io";
import { IUserService } from "./IUserService";
import { DeliverySession } from "../entity/DeliverySession";
import { IDeliverySessionService } from "./IDeliverySession";
import { UserVehicle } from "../entity/UserVehicle";
import { IGameService } from "./IGameService";

export class DeliverySessionService extends BaseService
  implements IDeliverySessionService {
  private userService: IUserService;
  private gameService: IGameService;

  constructor(
    manager: EntityManager,
    io: Server,
    userService: IUserService,
    gameService: IGameService
  ) {
    super(manager, io);
    this.userService = userService;
    this.gameService = gameService;
  }

  async createForUser(username: string) {
    const user = await this.userService.findOrCreateUser(username);

    if (user) {
      if (!user.vehicles.length) {
        this.io.emit("delivery-session-no-vehicles", user);
        return null;
      }

      const game = await this.gameService.getGame();

      if (!game) {
        // TODO: this should do something
        return null;
      }

      const { rewardMultiplier, difficultyModifier } = game.options;

      const deliverySession = new DeliverySession();
      deliverySession.user = user;
      deliverySession.isActive = true;
      deliverySession.reward = Math.floor(
        // rewardMultiplier 1-100
        25 + (Math.random() + 0.5) * rewardMultiplier * 5
      );

      const distance = Math.floor(
        // difficultyModifier 1-100
        500 + (Math.random() + 0.5) * 100 * difficultyModifier
      );
      deliverySession.distance = distance;

      deliverySession.duration = Math.floor(
        distance * (Math.random() + 0.65) * 10
      );

      deliverySession.queueTimer = Math.floor(Math.random() * (5 - 1) + 1);

      await this.manager
        .save(deliverySession)
        .catch(err => console.log({ err }));

      this.io.emit("delivery-session-created", deliverySession);

      return deliverySession;
    }
    return null;
  }

  async getUserActiveDeliverySession(username: string) {
    const deliverySession = await this.manager
      .createQueryBuilder(DeliverySession, "deliverySession")
      .innerJoinAndSelect("deliverySession.user", "user")
      .where("user.username = :username", { username })
      .andWhere("deliverySession.isActive = :isActive", { isActive: true })
      .getOne();

    return deliverySession;
  }

  async setVehicle(deliverySessionId: number, userVehicle: UserVehicle) {
    const res = await this.manager
      .createQueryBuilder()
      .update(DeliverySession)
      .set({ userVehicle })
      .where("id = :deliverySessionId", { deliverySessionId })
      .execute();
    return res.affected === 1;
  }

  async win(deliverySessionId: number) {
    const res = await this.manager
      .createQueryBuilder()
      .update(DeliverySession)
      .set({ status: "won" })
      .where("id = :deliverySessionId", { deliverySessionId })
      .execute();
    return res.affected === 1;
  }

  async lose(deliverySessionId: number) {
    const res = await this.manager
      .createQueryBuilder()
      .update(DeliverySession)
      .set({ status: "lost" })
      .where("id = :deliverySessionId", { deliverySessionId })
      .execute();
    return res.affected === 1;
  }
}
