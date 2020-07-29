import { ICommand } from "./ICommand";
import { Server } from "socket.io";
import { ChatUserstate, Client } from "tmi.js";

type IHelp = {
  [command: string]: {
    use: string;
    description: string;
  };
};
export class PewClueCommand implements ICommand {
  private io: Server;
  private twitchClient: Client;

  constructor(io: Server, twitchClient: Client) {
    this.io = io;
    this.twitchClient = twitchClient;
  }

  public async handleCommand(
    channel: string,
    user: ChatUserstate,
    message: string,
    self: boolean
  ) {
    const help: IHelp = {
      "!pewdo": {
        use: "!pewdo commandName description",
        description: "This is a description"
      },
      "!pewpew": {
        use: "!pewpew pewName",
        description: "During a delivery session attack the driver"
      }
    };
    this.io.emit("pew-clue", help);
  }
}
