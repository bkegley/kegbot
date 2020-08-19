import { ICommand } from "./ICommand";
import { Server } from "socket.io";
import { IUserService } from "../service";
import { ChatUserstate, Client } from "tmi.js";

export class GiveCommand implements ICommand {
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
    if (user.mod || user.username === "bjkegley") {
      const [_, username, amount] = message.split(" ");
      const parsedAmount = parseInt(amount);
      if (!isNaN(parsedAmount)) {
        await this.userService.give(username, parsedAmount);
        this.twitchClient.say(
          channel,
          `${username} was given ${parsedAmount}!`
        );
      }
    }
  }
}
