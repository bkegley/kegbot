import { BaseModule } from "../utils/BaseModule";
import { TYPES } from "../abstract";
import { CommandHandler } from "./CommandHandler";
import { ICommand } from "./ICommand";
import { HiCommand } from "./HiCommand";
import { ByeCommand } from "./ByeCommand";
import { IModule } from "../utils/IModule";
import { ShoutoutCommand } from "./ShoutoutCommand";

export class CommandModule extends BaseModule implements IModule {
  private commandRegistry = new Map<string, () => ICommand>();

  init() {
    this.container.bind<CommandHandler>(
      TYPES.CommandHandler,
      resolver =>
        new CommandHandler(
          this.commandRegistry,
          resolver.resolve(TYPES.CommandService),
          resolver.resolve(TYPES.TwitchClient)
        )
    );

    this.commandRegistry.set(
      "!hi",
      () =>
        new HiCommand(
          this.container.resolve(TYPES.IOServer),
          this.container.resolve(TYPES.UserService)
        )
    );
    this.commandRegistry.set(
      "!bye",
      () => new ByeCommand(this.container.resolve(TYPES.UserService))
    );
    this.commandRegistry.set(
      "!so",
      () =>
        new ShoutoutCommand(
          this.container.resolve(TYPES.IOServer),
          this.container.resolve(TYPES.TwitchClient),
          this.container.resolve(TYPES.UserService)
        )
    );
  }
}
