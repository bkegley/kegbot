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
import { OrderSuggestionListRouteHandler } from "./handler/OrderSuggestionList";
import { PewCreateRouteHandler } from "./handler/PewCreate";
import { PewSuggestionModerateRouteHandler } from "./handler/PewSuggestionModerateRouteHandler";
import { ListUserVehiclesByUsernameRouteHandler } from "./handler/ListUserVehiclesByUsername";
import { PewListRouteHandler } from "./handler/PewList";
import { PewUpdateByIdRouteHandler } from "./handler/PewUpdateById";
import { PewDeleteRouteHandler } from "./handler/PewDelete";
import { PewGetByIdRouteHandler } from "./handler/PewGetById";
import { GameStartRouteHandler } from "./handler/GameStart";
import { GameStopRouteHandler } from "./handler/GameStop";
import { GameGetRouteHandler } from "./handler/GameGet";
import { GameUpdateRouteHandler } from "./handler/GameUpdate";
import { VehicleDeleteRouteHandler } from "./handler/VehicleDelete";
import { CommandGetRouteHandler } from "./handler/CommandGet";

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

    app.get("/commands/:id", (req: Request<{ id: string }>, res) =>
      new CommandGetRouteHandler(
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

    app.get("/game", (req, res) =>
      new GameGetRouteHandler(this.container.resolve(TYPES.GameService)).handle(
        req,
        res
      )
    );

    app.patch("/game", (req: Request, res) =>
      new GameUpdateRouteHandler(
        this.container.resolve(TYPES.GameService)
      ).handle(req, res)
    );

    app.post("/game/start", (req: Request, res) =>
      new GameStartRouteHandler(
        this.container.resolve(TYPES.GameService)
      ).handle(req, res)
    );

    app.post("/game/stop", (req: Request, res) =>
      new GameStopRouteHandler(
        this.container.resolve(TYPES.GameService)
      ).handle(req, res)
    );

    app.get("/orders", (req: Request, res) =>
      new OrderSuggestionListRouteHandler(
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

    app.get("/pews", (req: Request, res) =>
      new PewListRouteHandler(this.container.resolve(TYPES.PewService)).handle(
        req,
        res
      )
    );

    app.get("/pews/:id", (req: Request<{ id: string }>, res) =>
      new PewGetByIdRouteHandler(
        this.container.resolve(TYPES.PewService)
      ).handle(req, res)
    );

    app.post("/pews", (req: Request, res) =>
      new PewCreateRouteHandler(
        this.container.resolve(TYPES.PewService)
      ).handle(req, res)
    );

    app.patch("/pews/:id", (req: Request<{ id: string }>, res) =>
      new PewUpdateByIdRouteHandler(
        this.container.resolve(TYPES.PewService)
      ).handle(req, res)
    );

    app.delete("/pews/:id", (req: Request<{ id: string }>, res) =>
      new PewDeleteRouteHandler(
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

    app.delete("/xstream/vehicles/:id", (req: Request<{ id: string }>, res) =>
      new VehicleDeleteRouteHandler(
        this.container.resolve(TYPES.VehicleService)
      ).handle(req, res)
    );
  }
}
