import { ICommand } from "./ICommand";
import { Server } from "socket.io";
import { ChatUserstate } from "tmi.js";
import { IPewService } from "../service/IPewService";

export class PewDoCommand implements ICommand {
  private io: Server;
  private pewService: IPewService;

  constructor(io: Server, pewService: IPewService) {
    this.io = io;
    this.pewService = pewService;
  }

  public async handleCommand(
    channel: string,
    user: ChatUserstate,
    message: string,
    self: boolean
  ) {
    if (user.username) {
      const [_, pewName, ...descriptionWords] = message.split(" ");
      const description = descriptionWords.join(" ");

      const pewSuggestion = await this.pewService.createSuggestion(
        user.username,
        {
          name: pewName,
          description
        }
      );

      this.io.emit("pewpew-suggested", pewSuggestion);
    }
  }
}
