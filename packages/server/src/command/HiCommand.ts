import { ICommand } from "./ICommand";
import { Server } from "socket.io";
import { IUserService } from "../service";
import { ChatUserstate } from "tmi.js";

export class HiCommand implements ICommand {
  private io: Server;
  private userService: IUserService;

  constructor(io: Server, userService: IUserService) {
    this.io = io;
    this.userService = userService;

    console.log({ this: this });
  }

  public async handleCommand(
    channel: string,
    user: ChatUserstate,
    message: string,
    self: boolean
  ) {
    if (user.username) {
      const [command, ...greeting] = message.split(" ");
      await this.userService.saveUserGreeting(
        user.username,
        greeting.join(" ")
      );
    }
  }
}
