import { ICommand } from "./ICommand";
import { Server } from "socket.io";
import { ChatUserstate } from "tmi.js";
import { IPhoneService } from "../service";

export class StartCommand implements ICommand {
  private io: Server;
  private phoneService: IPhoneService;

  constructor(io: Server, phoneService: IPhoneService) {
    this.io = io;
    this.phoneService = phoneService;
  }

  public async handleCommand(
    channel: string,
    user: ChatUserstate,
    message: string,
    self: boolean
  ) {
    console.log("starting the phone game!!");
    this.phoneService.init();
  }
}
