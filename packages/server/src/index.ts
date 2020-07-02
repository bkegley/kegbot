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
import { HiCommand, ICommand } from "./command";
import { ServiceRegistry } from "./service";
import { RouteRegistry, RouteModule } from "./route";
import { Application } from "express";
import { CreateCommand } from "./command/CreateCommand";
import fetch from "node-fetch";
import { CommandModule } from "./command";

class Server {
  private port = process.env.PORT || 4040;
  private app = require("express")();
  private http = require("http").createServer(this.app);
  private io = require("socket.io")(this.http);
  private container = new Container();
  // private commandHandler = new CommandHandler(this.container);

  constructor() {
    this.container.bind<Application>(TYPES.ExpressApplication, () => this.app);
  }

  public async start() {
    // const clientId = process.env.CLIENT_ID;
    // const clientSecret = process.env.CLIENT_SECRET;
    // const token = await fetch(
    //   `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
    //   {
    //     method: "POST",
    //   }
    // )
    //   .then((res) => res.json())
    //   .then((res) => console.log({ res }))
    //   .catch((err) => console.log({ err }));
    await Promise.all([
      this.registerDb(),
      // this.registerCommands(),
      this.registerSocket(),
      this.registerTwitchClient(),
    ]);
    this.container.registerModule(CommandModule).registerModule(RouteModule);

    new ServiceRegistry(this.container).registerServices();
    // new RouteRegistry(this.container).registerRoutes();
    this.app.use(bodyParser.json());
    this.app.use(cors());

    this.http.listen(this.port, () => {
      this.container.build();
      console.log(`Server listening on port ${this.port}`);
    });
  }

  private async registerDb() {
    await createConnection(ormConfig);
    const manager = await getManager();
    this.container.bind<EntityManager>(TYPES.EntityManager, manager);
  }

  // private async registerCommands() {
  //   this.commandHandler.registerCommand("!hi", TYPES.HiCommand);
  //   this.commandHandler.registerCommand("!create", TYPES.CreateCommand);
  //   this.container.bind<ICommand>(
  //     TYPES.HiCommand,
  //     (resolver) =>
  //       new HiCommand(
  //         resolver.resolve(TYPES.IOServer),
  //         resolver.resolve(TYPES.UserService)
  //       )
  //   );

  //   this.container.bind<ICommand>(
  //     TYPES.CreateCommand,
  //     (resolver) =>
  //       new CreateCommand(
  //         resolver.resolve(TYPES.IOServer),
  //         resolver.resolve(TYPES.CommandService)
  //       )
  //   );
  // }

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
        password: process.env.OAUTH_TOKEN,
      },
      channels: ["bjkegley"],
    };
    const twitchClient = client(options);
    this.container.bind<Client>(TYPES.TwitchClient, twitchClient);

    twitchClient.on("message", (channel, user, message, self) => {
      console.log({ channel, message, user, self });
      if (message[0] === "!") {
        this.container
          .resolve<CommandHandler>(TYPES.CommandHandler)
          .handleCommand(channel, user, message, self);
      }
    });

    twitchClient.connect();
  }
}

const server = new Server();
server.start();
