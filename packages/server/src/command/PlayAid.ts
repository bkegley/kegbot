import { ICommand } from "./ICommand";
import { Server } from "socket.io";
import { ChatUserstate, Client } from "tmi.js";
import { IUserService } from "../service";
import crypto from "crypto";

export class PlayAidCommand implements ICommand {
  private io: Server;
  private twitchClient: Client;
  private userService: IUserService;

  constructor(io: Server, twitchClient: Client, userService: IUserService) {
    this.io = io;
    this.twitchClient = twitchClient;
    this.userService = userService;
  }

  public async handleCommand(
    channel: string,
    user: ChatUserstate,
    message: string,
    self: boolean
  ) {
    if (user.username) {
      const [_, name] = message.split(" ");
      const aid = await this.userService.getUserAidByName(user.username, name);
      if (aid) {
        const uuid = crypto.randomBytes(6).toString("hex");
        this.io.emit("aid-played", { ...aid, uuid });
      }
    }
  }
}
