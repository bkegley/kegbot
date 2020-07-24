import { BaseModule } from "../utils/BaseModule";
import { TYPES } from "../abstract";
import { CommandHandler } from "./CommandHandler";
import { ICommand } from "./ICommand";
import { HiCommand } from "./HiCommand";
import { ByeCommand } from "./ByeCommand";
import { IModule } from "../utils/IModule";
import { ShoutoutCommand } from "./ShoutoutCommand";
import { AnswerCommand } from "./AnswerCommand";
import { StartCommand } from "./StartCommand";
import { PewPewCommand } from "./PewPewCommand";
import { PurchaseCommand } from "./PurchaseCommand";
import { GiveCommand } from "./GiveCommand";
import { ChooseCruiseCommand } from "./ChooseCruise";
import { PewDoCommand } from "./PewDoCommand";
import { OrderCommand } from "./OrderCommand";

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

    this.commandRegistry.set(
      "!start",
      () =>
        new StartCommand(
          this.container.resolve(TYPES.IOServer),
          this.container.resolve(TYPES.PhoneService)
        )
    );

    this.commandRegistry.set(
      "!answer",
      () =>
        new AnswerCommand(
          this.container.resolve(TYPES.PhoneService),
          this.container.resolve(TYPES.DeliverySessionService)
        )
    );

    this.commandRegistry.set(
      "!pewdo",
      () =>
        new PewDoCommand(
          this.container.resolve(TYPES.IOServer),
          this.container.resolve(TYPES.PewService)
        )
    );

    this.commandRegistry.set(
      "!pewpew",
      () =>
        new PewPewCommand(
          this.container.resolve(TYPES.IOServer),
          this.container.resolve(TYPES.TwitchClient),
          this.container.resolve(TYPES.UserService),
          this.container.resolve(TYPES.PewService)
        )
    );

    this.commandRegistry.set(
      "!choosecruise",
      () =>
        new ChooseCruiseCommand(
          this.container.resolve(TYPES.IOServer),
          this.container.resolve(TYPES.UserService)
        )
    );

    this.commandRegistry.set(
      "!give",
      () =>
        new GiveCommand(
          this.container.resolve(TYPES.IOServer),
          this.container.resolve(TYPES.UserService)
        )
    );

    this.commandRegistry.set(
      "!order",
      () =>
        new OrderCommand(
          this.container.resolve(TYPES.IOServer),
          this.container.resolve(TYPES.TwitchClient),
          this.container.resolve(TYPES.OrderService)
        )
    );

    this.commandRegistry.set(
      "!purchase",
      () =>
        new PurchaseCommand(
          this.container.resolve(TYPES.IOServer),
          this.container.resolve(TYPES.TwitchClient),
          this.container.resolve(TYPES.UserService)
        )
    );
  }
}
