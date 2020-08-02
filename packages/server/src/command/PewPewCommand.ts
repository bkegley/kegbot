import { ICommand } from "./ICommand";
import { Server } from "socket.io";
import { ChatUserstate, Client } from "tmi.js";
import { IUserService } from "../service";
import { IPewService } from "../service/IPewService";
import crypto from "crypto";

export class PewPewCommand implements ICommand {
  private io: Server;
  private twitchClient: Client;
  private userService: IUserService;
  private pewService: IPewService;

  constructor(
    io: Server,
    twitchClient: Client,
    userService: IUserService,
    pewService: IPewService
  ) {
    this.io = io;
    this.twitchClient = twitchClient;
    this.userService = userService;
    this.pewService = pewService;
  }

  public async handleCommand(
    channel: string,
    user: ChatUserstate,
    message: string,
    self: boolean
  ) {
    if (user.username) {
      const [_, name] = message.split(" ");
      const pew = await this.userService.getUserPewByName(user.username, name);
      if (pew) {
        const uuid = crypto.randomBytes(6).toString("hex");
        this.io.emit("pewpew-queued", { ...pew, uuid });
      }
    }
  }
}
