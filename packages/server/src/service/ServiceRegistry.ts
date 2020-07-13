import { Container } from "../utils/Container";
import { IUserService } from "./IUserService";
import { TYPES } from "../abstract";
import { UserService } from "./UserService";
import { ICommandService } from "./ICommandService";
import { CommandService } from "./CommandService";
import { IPhoneService } from "./IPhoneService";
import { PhoneService } from "./PhoneService";

export class ServiceRegistry {
  private container: Container;

  constructor(container: Container) {
    this.container = container;
  }

  registerServices() {
    this.container.bind<IUserService>(
      TYPES.UserService,
      resolver =>
        new UserService(
          resolver.resolve(TYPES.EntityManager),
          resolver.resolve(TYPES.IOServer)
        )
    );

    this.container.bind<ICommandService>(
      TYPES.CommandService,
      resolver =>
        new CommandService(
          resolver.resolve(TYPES.EntityManager),
          resolver.resolve(TYPES.IOServer)
        )
    );
    this.container.bind<IPhoneService>(
      TYPES.PhoneService,
      new PhoneService(
        this.container.resolve(TYPES.EntityManager),
        this.container.resolve(TYPES.IOServer)
      )
    );
  }
}
