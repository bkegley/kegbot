import { ICommand } from "./ICommand";
import { Server } from "socket.io";
import { ChatUserstate } from "tmi.js";
import { ICommandService } from "../service/ICommandService";

export class CreateCommand implements ICommand {
  private io: Server;
  private commandService: ICommandService;

  constructor(io: Server, commandService: ICommandService) {
    this.io = io;
    this.commandService = commandService;
  }

  public async handleCommand(
    channel: string,
    user: ChatUserstate,
    message: string,
    self: boolean
  ) {
    if (user.username) {
      const [_, command, ...response] = message.split(" ");
      await this.commandService.create({
        command,
        response: response.join(" "),
      });
    }
  }
}
