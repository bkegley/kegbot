import { BaseModule } from "../utils/BaseModule";
import {
  ListUsersRouteHandler,
  GetUserByIdRouteHandler,
  CommandUpdateRouteHandler
} from "./handler";
import { Application, Request } from "express";
import { TYPES } from "../abstract";
import { CommandCreateRouteHandler } from "./handler/CommandCreate";
import { CommandListRouteHandler } from "./handler/CommandList";
import { CommandDeleteRouteHandler } from "./handler/CommandDelete";

export class RouteModule extends BaseModule {
  init() {
    const app = this.container.resolve<Application>(TYPES.ExpressApplication);

    app.get("/users", (req, res) =>
      new ListUsersRouteHandler(
        this.container.resolve(TYPES.UserService)
      ).handle(req, res)
    );

    app.get("/users/:id", (req: Request<{ id: string }>, res) =>
      new GetUserByIdRouteHandler(
        this.container.resolve(TYPES.UserService)
      ).handle(req, res)
    );

    app.get("/commands", (req, res) =>
      new CommandListRouteHandler(
        this.container.resolve(TYPES.CommandService)
      ).handle(req, res)
    );

    app.post("/commands", (req: Request, res) =>
      new CommandCreateRouteHandler(
        this.container.resolve(TYPES.CommandService)
      ).handle(req, res)
    );

    app.put("/commands/:id", (req: Request<{ id: string }>, res) =>
      new CommandUpdateRouteHandler(
        this.container.resolve(TYPES.CommandService)
      ).handle(req, res)
    );

    app.delete("/commands/:id", (req: Request<{ id: string }>, res) =>
      new CommandDeleteRouteHandler(
        this.container.resolve(TYPES.CommandService)
      ).handle(req, res)
    );
  }
}
