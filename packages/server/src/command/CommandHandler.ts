import { ChatUserstate } from "tmi.js";
import { ICommand } from "./ICommand";
import { CommandService } from "../service/CommandService";

export class CommandHandler {
  private registry: Map<string, () => ICommand>;
  private commandService: CommandService;

  constructor(
    registry: Map<string, () => ICommand>,
    commandService: CommandService
  ) {
    this.registry = registry;
    this.commandService = commandService;
  }

  // public registerCommand(command: string, symbol: Symbol) {
  //   this.registry.set(command, symbol);
  // }

  public async handleCommand(
    channel: string,
    user: ChatUserstate,
    message: string,
    self: boolean
  ) {
    const commandText = message.split(" ")[0];
    const handler = this.registry.get(commandText);
    if (!handler) {
      const command = await this.commandService.getCommand(commandText);
      if (!command) {
        console.log(`${commandText} not found`);
      }
      return;
    }

    return handler().handleCommand(channel, user, message, self);
  }
}
