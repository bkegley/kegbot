import { BaseModule } from "../utils/BaseModule";
import {
  ListUsersRouteHandler,
  GetUserByIdRouteHandler,
  CommandUpdateRouteHandler,
  VehicleListRouteHandler,
  VehicleGetByIdRouteHandler,
  VehicleUpdateRouteHandler
} from "./handler";
import { Application, Request } from "express";
import { TYPES } from "../abstract";
import { CommandCreateRouteHandler } from "./handler/CommandCreate";
import { CommandListRouteHandler } from "./handler/CommandList";
import { CommandDeleteRouteHandler } from "./handler/CommandDelete";
import { VehicleCreateRouteHandler } from "./handler/VehicleCreate";
import { PewSuggestionListRouteHandler } from "./handler/PewSuggestionList";
import { OrderListRouteHandler } from "./handler/OrderList";
import { PewCreateRouteHandler } from "./handler/PewCreate";
import { PewSuggestionModerateRouteHandler } from "./handler/PewSuggestionModerateRouteHandler";
import { ListUserVehiclesByUsernameRouteHandler } from "./handler/ListUserVehiclesByUsername";

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

    app.get(
      "/users/:username/vehicles",
      (req: Request<{ username: string }>, res) =>
        new ListUserVehiclesByUsernameRouteHandler(
          this.container.resolve(TYPES.VehicleService)
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

    app.get("/orders", (req: Request, res) =>
      new OrderListRouteHandler(
        this.container.resolve(TYPES.OrderService)
      ).handle(req, res)
    );

    app.get("/pew-suggestions", (req: Request, res) =>
      new PewSuggestionListRouteHandler(
        this.container.resolve(TYPES.PewService)
      ).handle(req, res)
    );

    app.patch(
      "/pew-suggestions/:id/moderate",
      (req: Request<{ id: string }>, res) =>
        new PewSuggestionModerateRouteHandler(
          this.container.resolve(TYPES.PewService)
        ).handle(req, res)
    );

    app.post("/pews", (req: Request, res) =>
      new PewCreateRouteHandler(
        this.container.resolve(TYPES.PewService)
      ).handle(req, res)
    );
    app.get("/xstream/vehicles", (req: Request, res) =>
      new VehicleListRouteHandler(
        this.container.resolve(TYPES.VehicleService)
      ).handle(req, res)
    );

    app.get("/xstream/vehicles/:id", (req: Request<{ id: string }>, res) =>
      new VehicleGetByIdRouteHandler(
        this.container.resolve(TYPES.VehicleService)
      ).handle(req, res)
    );

    app.put("/xstream/vehicles/:id", (req: Request<{ id: string }>, res) =>
      new VehicleUpdateRouteHandler(
        this.container.resolve(TYPES.VehicleService)
      ).handle(req, res)
    );

    app.post("/xstream/vehicles", (req: Request, res) =>
      new VehicleCreateRouteHandler(
        this.container.resolve(TYPES.VehicleService)
      ).handle(req, res)
    );
  }
}
