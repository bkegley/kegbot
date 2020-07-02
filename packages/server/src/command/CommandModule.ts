import { BaseModule } from "../utils/BaseModule";
import { TYPES } from "../abstract";
import { CommandHandler } from "./CommandHandler";
import { ICommand } from "./ICommand";
import { HiCommand } from "./HiCommand";

export class CommandModule extends BaseModule {
  private commandRegistry = new Map<string, () => ICommand>();

  init() {
    this.container.bind<CommandHandler>(
      TYPES.CommandHandler,
      (resolver) =>
        new CommandHandler(
          this.commandRegistry,
          resolver.resolve(TYPES.CommandService)
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
  }
}
