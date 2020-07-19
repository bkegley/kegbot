import { ICommand } from "./ICommand";
import { Server } from "socket.io";
import { ChatUserstate, Client } from "tmi.js";
import { IPewService } from "../service/IPewService";

export class PewCreateCommand implements ICommand {
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
    const pew = await this.pewService.create({ name, cost: 0 });
    this.io.emit("pew-created", pew);
    this.twitchClient.say(
      "bjkegley",
      `${user.username} created a pew! It's called ${pew.name} and has an id of ${pew.id}`
    );
  }
}
