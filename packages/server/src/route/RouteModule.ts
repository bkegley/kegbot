import { BaseModule } from "../utils/BaseModule";
import { ListUsersRouteHandler, GetUserByIdRouteHandler } from "./handler";
import { Application, Request } from "express";
import { TYPES } from "../abstract";

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
  }
}
