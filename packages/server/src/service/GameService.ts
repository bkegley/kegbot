import { BaseService } from "../abstract";
import { IGameService, GameOptions } from "./IGameService";
import { IPhoneService } from "./IPhoneService";
import { EntityManager } from "typeorm";
import { Server } from "socket.io";

export class GameService extends BaseService implements IGameService {
  private phoneService: IPhoneService;
  private options!: GameOptions;
  private isActive = false;

  constructor(manager: EntityManager, io: Server, phoneService: IPhoneService) {
    super(manager, io);
    this.phoneService = phoneService;
  }

  startGame(options: GameOptions) {
    if (this.isActive) {
      throw new Error("Game is already running");
    }
    this.isActive = true;
    this.options = options;
    this.phoneService.init(this.options.phoneFrequencyMultiplier);
  }

  getGame() {
    return;
  }
}
