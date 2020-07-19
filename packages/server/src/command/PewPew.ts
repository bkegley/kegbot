import { ICommand } from "./ICommand";
import { Server } from "socket.io";
import { ChatUserstate, Client } from "tmi.js";
import { IPewService } from "../service/IPewService";

export class PewPewCommand implements ICommand {
  private io: Server;
  private twitchClient: Client;
  private pewService: IPewService;

  constructor(io: Server, twitchClient: Client, pewService: IPewService) {
    this.io = io;
    this.twitchClient = twitchClient;
    this.pewService = pewService;
  }

  public async handleCommand(
    channel: string,
    user: ChatUserstate,
    message: string,
    self: boolean
  ) {
    const [_, name] = message.split(" ");
    const pew = await this.pewService.getByName(name);
    if (pew) {
      this.io.emit("pew-pewed", pew);
      this.twitchClient.say(
        "bjkegley",
        `${user.username} pewed the pew ${pew.name}`
      );
    }
  }
}
