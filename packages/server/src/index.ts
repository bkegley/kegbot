require("dotenv").config();
import "reflect-metadata";
import bodyParser from "body-parser";
import cors from "cors";
import { Server as SocketServer } from "socket.io";
import { client, Options, Client } from "tmi.js";
import { createConnection, EntityManager, getManager } from "typeorm";
import { ormConfig } from "./config";
import { TYPES } from "./abstract";
import { CommandHandler } from "./command/CommandHandler";
import { Container } from "./utils/Container";
import {
  ServiceRegistry,
  IGameService,
  IDeliverySessionService,
  IUserService
} from "./service";
import { RouteModule } from "./route";
import { Application } from "express";
import { CommandModule } from "./command";

class Server {
  private port = process.env.PORT || 4040;
  private app = require("express")();
  private http = require("http").createServer(this.app);
  private io = require("socket.io")(this.http);
  private container = new Container();

  constructor() {
    this.container.bind<Application>(TYPES.ExpressApplication, () => this.app);
  }

  public async start() {
    await Promise.all([
      this.registerDb(),
      this.registerSocket(),
      this.registerTwitchClient()
    ]);

    // Register app modules
    this.container.registerModule(CommandModule).registerModule(RouteModule);

    new ServiceRegistry(this.container).registerServices();
    this.app.use(bodyParser.json());
    this.app.use(cors());

    this.http.listen(this.port, () => {
      this.container.build();
      console.log(`Server listening on port ${this.port}`);
    });
  }

  private async registerDb() {
    await createConnection(ormConfig);
    const manager = getManager();
    this.container.bind<EntityManager>(TYPES.EntityManager, manager);
  }

  private async registerSocket() {
    this.container.bind<SocketServer>(TYPES.IOServer, this.io);
    this.io.on("connection", (socket: any) => {
      console.log("a user connected!");
    });
  }

  private async registerTwitchClient() {
    const options: Options = {
      identity: {
        username: "bkegbot",
        password: process.env.OAUTH_TOKEN
      },
      channels: ["bjkegley", "bkegbot"]
    };
    const twitchClient = client(options);
    this.container.bind<Client>(TYPES.TwitchClient, twitchClient);

    twitchClient.on("message", async (channel, user, message, self) => {
      this.io.emit("message", message);
      const userService = this.container.resolve<IUserService>(
        TYPES.UserService
      );

      if (user.username) {
        userService.give(user.username, 5);
      }

      if (
        user.username === "bjkegley" &&
        message.startsWith(`Congrats! We'll punch `)
      ) {
        await userService.give(message.split("**")[1], 1000);
      }
      if (message[0] === "!") {
        this.container
          .resolve<CommandHandler>(TYPES.CommandHandler)
          .handle(channel, user, message, self);
      }
    });

    twitchClient.connect();
  }
}

const server = new Server();
server.start();
