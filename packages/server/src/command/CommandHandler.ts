import { ChatUserstate, Client } from "tmi.js";
import { ICommandHandler } from "./ICommandHandler";
import { ICommand } from "./ICommand";
import { CommandService } from "../service/CommandService";

export class CommandHandler implements ICommandHandler {
  private registry: Map<string, () => ICommand>;
  private commandService: CommandService;
  private twitchClient: Client;

  constructor(
    registry: Map<string, () => ICommand>,
    commandService: CommandService,
    twitchClient: Client
  ) {
    this.registry = registry;
    this.commandService = commandService;
    this.twitchClient = twitchClient;
  }

  public async handle(
    channel: string,
    user: ChatUserstate,
    message: string,
    self: boolean
  ) {
    const commandText = message.split(" ")[0];
    const handler = this.registry.get(commandText);
    if (!handler) {
      const command = await this.commandService.getCommand(
        commandText.replace("!", "")
      );
      if (!command) {
        console.log(`${commandText} not found`);
        return;
      }
      this.twitchClient.say("bjkegley", command.response);
      return;
    }

    return handler().handleCommand(channel, user, message, self);
  }
}
