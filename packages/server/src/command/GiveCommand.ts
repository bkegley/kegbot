import { ICommand } from "./ICommand";
import { Server } from "socket.io";
import { IUserService } from "../service";
import { ChatUserstate } from "tmi.js";

export class GiveCommand implements ICommand {
  private io: Server;
  private userService: IUserService;

  constructor(io: Server, userService: IUserService) {
    this.io = io;
    this.userService = userService;
  }

  public async handleCommand(
    channel: string,
    user: ChatUserstate,
    message: string,
    self: boolean
  ) {
    if (user.username) {
      const [_, username, amount] = message.split(" ");
      const parsedAmount = parseInt(amount);
      if (!isNaN(parsedAmount)) {
        await this.userService.give(username, parsedAmount);
      }
    }
  }
}
