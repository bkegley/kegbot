import { ChatUserstate, Client } from "tmi.js";
import { ICommandHandler } from "./ICommandHandler";
import { ICommand } from "./ICommand";
import { CommandService } from "../service/CommandService";

export class CommandHandler implements ICommandHandler {
  private registry: Map<string, () => ICommand>;
  private aliasRegistry: Map<string, string>;
  private commandService: CommandService;
  private twitchClient: Client;

  constructor(
    registry: Map<string, () => ICommand>,
    aliasRegistry: Map<string, string>,
    commandService: CommandService,
    twitchClient: Client
  ) {
    this.registry = registry;
    this.aliasRegistry = aliasRegistry;
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
    let handler = this.registry.get(commandText);
    const aliasedCommand = this.aliasRegistry.get(commandText);

    if (!handler && aliasedCommand) {
      handler = this.registry.get(aliasedCommand);
    }

    if (!handler) {
      const command = await this.commandService.getCommandByName(
        commandText.replace("!", "")
      );
      if (!command) {
        console.log(`${commandText} not found`);
        return;
      }
      if (!command.modOnly || user.mod || user.badges?.broadcaster) {
        this.twitchClient.say("bjkegley", command.response);
      }
      return;
    }

    return handler().handleCommand(channel, user, message, self);
  }
}
