import { BaseService } from "../abstract";
import { IGameService, GameOptions, IGame } from "./IGameService";
import { IPhoneService } from "./IPhoneService";
import { EntityManager } from "typeorm";
import { Server } from "socket.io";
import { IDeliverySessionService } from "./IDeliverySession";
import { IUserService } from "./IUserService";

interface IGameEndData {
  deliverySessionId: number;
  vehicleId: number;
  vehicleHealth: number;
  username: string;
  reward: number;
}

export class GameService extends BaseService implements IGameService {
  private phoneService: IPhoneService;
  private game?: IGame;
  private deliverySessionService: IDeliverySessionService;
  private userService: IUserService;

  constructor(
    manager: EntityManager,
    io: Server,
    phoneService: IPhoneService,
    deliverySessionService: IDeliverySessionService,
    userService: IUserService
  ) {
    super(manager, io);
    this.phoneService = phoneService;
    this.deliverySessionService = deliverySessionService;
    this.userService = userService;

    this.io.on("connection", socket => {
      socket.on(
        "game-won",
        async ({
          deliverySessionId,
          vehicleId,
          vehicleHealth,
          username,
          reward
        }: IGameEndData) => {
          await Promise.all([
            this.deliverySessionService.win(deliverySessionId),
            this.userService.updateUserVehicle(vehicleId, {
              health: vehicleHealth
            }),
            this.userService.give(username, reward)
          ]);

          this.phoneService.restart();
        }
      );

      socket.on(
        "game-over",
        async ({
          deliverySessionId,
          vehicleId,
          vehicleHealth
        }: IGameEndData) => {
          await Promise.all([
            this.deliverySessionService.lose(deliverySessionId),
            this.userService.updateUserVehicle(vehicleId, {
              health: vehicleHealth
            })
          ]);

          this.phoneService.restart();
        }
      );
    });
  }

  getGame() {
    return new Promise<IGame | undefined>((resolve, reject) => {
      if (!this.game) {
        reject("There is no current game");
      }
      resolve(this.game);
    });
  }

  startGame(options: GameOptions) {
    return new Promise<IGame>((resolve, reject) => {
      if (this.game) {
        reject("Game already running");
      }

      this.game = {
        options,
        activeDeliverySession: undefined
      };

      this.phoneService.init(options.phoneFrequencyMultiplier);
      this.io.emit("game-started", this.game);
      resolve(this.game);
    });
  }

  stopGame() {
    this.io.emit("game-stopped");
    this.game = undefined;
  }

  setGameOptions(options: GameOptions) {
    return new Promise<IGame>((resolve, reject) => {
      this.phoneService.reset();

      this.game = {
        options,
        activeDeliverySession: undefined
      };

      this.phoneService.init(options.phoneFrequencyMultiplier);

      resolve(this.game);
    });
  }
}
