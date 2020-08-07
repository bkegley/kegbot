import { ICommand } from "./ICommand";
import { Server } from "socket.io";
import { ChatUserstate } from "tmi.js";
import { IGameService } from "../service";

export class ChoosePeruseCommand implements ICommand {
  private io: Server;
  private gameService: IGameService;
  constructor(io: Server, gameService: IGameService) {
    this.io = io;
    this.gameService = gameService;
  }

  public async handleCommand(
    channel: string,
    user: ChatUserstate,
    message: string,
    self: boolean
  ) {
    // TODO: this isn't currently working
    if (user.username) {
      const game = await this.gameService.getGame();

      if (game?.activeDeliverySession?.user.username === user.username) {
        this.io.emit("choose-peruse");
      }
    }
  }
}
