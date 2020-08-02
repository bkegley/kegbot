import { BaseService } from "../abstract";
import { EntityManager } from "typeorm";
import { Server } from "socket.io";
import { IUserService } from "./IUserService";
import { DeliverySession } from "../entity/DeliverySession";
import { IDeliverySessionService } from "./IDeliverySession";
import { UserVehicle } from "../entity/UserVehicle";

export class DeliverySessionService extends BaseService
  implements IDeliverySessionService {
  private userService: IUserService;

  constructor(manager: EntityManager, io: Server, userService: IUserService) {
    super(manager, io);
    this.userService = userService;
  }

  async createForUser(username: string) {
    const user = await this.userService.findOrCreateUser(username);
    if (user) {
      const deliverySession = new DeliverySession();
      deliverySession.user = user;
      deliverySession.isActive = true;
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
}
