import { ICommand } from "./ICommand";
import { Server } from "socket.io";
import { ChatUserstate, Client } from "tmi.js";
import { IUserService } from "../service";

export class GitHubCommand implements ICommand {
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
      const [_, email] = message.split(" ");
      await this.userService.saveUserGitHubEmail(user.username, email);
      this.twitchClient.say(
        channel,
        `Woo! I've updated your GitHub email to ${email}`
      );
    }
  }
}
