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
import { PewClueCommand } from "./PewClueCommand";
import { ChoosePeruseCommand } from "./ChoosePeruse";

export class CommandModule extends BaseModule implements IModule {
  private commandRegistry = new Map<string, () => ICommand>();
  private aliasRegistry = new Map<string, string>();

  init() {
    this.container.bind<CommandHandler>(
      TYPES.CommandHandler,
      resolver =>
        new CommandHandler(
          this.commandRegistry,
          this.aliasRegistry,
          resolver.resolve(TYPES.CommandService),
          resolver.resolve(TYPES.TwitchClient)
        )
    );

    this.aliasRegistry.set("!pp", "!pewpew");
    this.aliasRegistry.set("!help", "!pewclue");
    this.aliasRegistry.set("!cc", "!choosecruise");
    this.aliasRegistry.set("!cruisechoose", "!choosecruise");
    this.aliasRegistry.set("!give", "!pewaccrue");
    this.aliasRegistry.set("!pewsspew", "!pewaccrue");

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
      "!pewclue",
      () =>
        new PewClueCommand(
          this.container.resolve(TYPES.IOServer),
          this.container.resolve(TYPES.TwitchClient)
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
          this.container.resolve(TYPES.UserService),
          this.container.resolve(TYPES.DeliverySessionService)
        )
    );

    this.commandRegistry.set(
      "!chooseperuse",
      () =>
        new ChoosePeruseCommand(
          this.container.resolve(TYPES.IOServer),
          this.container.resolve(TYPES.GameService)
        )
    );

    this.commandRegistry.set(
      "!pewaccrue",
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
