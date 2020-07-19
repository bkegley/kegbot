import { Application } from "express";
import { Container } from "../utils/Container";
import { TYPES } from "../abstract";
import { IRouteHandler } from "./handler/IRouteHandler";
import {
  GetUserByIdRouteHandler,
  ListUsersRouteHandler,
  VehicleListRouteHandler
} from "./handler";

const RouteTypes = {
  ListUsers: Symbol("ListUsers"),
  UsersGetById: Symbol("UsersGetById"),
  ListVehicles: Symbol("ListVehicles")
};

export class RouteRegistry {
  private container: Container;

  constructor(container: Container) {
    this.container = container;
    this.buildContainer();
  }

  private buildContainer() {
    this.container.bind<IRouteHandler>(
      RouteTypes.ListUsers,
      resolver => new ListUsersRouteHandler(resolver.resolve(TYPES.UserService))
    );
    this.container.bind<IRouteHandler>(
      RouteTypes.UsersGetById,
      resolver =>
        new GetUserByIdRouteHandler(resolver.resolve(TYPES.UserService))
    );
    this.container.bind<IRouteHandler>(
      RouteTypes.ListVehicles,
      resolver =>
        new VehicleListRouteHandler(resolver.resolve(TYPES.VehicleService))
    );
  }

  registerRoutes() {
    const app = this.container.resolve<Application>(TYPES.ExpressApplication);
    app.get("/users/:id", this.createHandler(RouteTypes.UsersGetById));
    app.get("/users", this.createHandler(RouteTypes.ListUsers));
    app.get("/xstream/vehicles", this.createHandler(RouteTypes.ListVehicles));
    app.get("/otherusers", this.createHandler(RouteTypes.ListUsers));
  }

  private createHandler(type: typeof RouteTypes[keyof typeof RouteTypes]) {
    const handler = this.container.resolve<IRouteHandler>(type);
    return handler.handle.bind(handler);
  }
}
