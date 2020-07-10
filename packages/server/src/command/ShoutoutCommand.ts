import { ICommand } from "./ICommand";
import { Server } from "socket.io";
import { ChatUserstate, Client } from "tmi.js";
import { IUserService } from "../service";

export class ShoutoutCommand implements ICommand {
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
    if (user.username && (user.mod || user.badges?.broadcaster)) {
      const [command, channelName] = message.split(" ");
      this.twitchClient.say(
        "bjkegley",
        `Let's give a warm hoot an' holla to https://twitch.tv/${channelName}`
      );
    }
  }
}
