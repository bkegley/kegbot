import { ICommand } from "./ICommand";
import { Server } from "socket.io";
import { ChatUserstate, Client } from "tmi.js";
import { IPewService, IVehicleService } from "../service";

export class ListCommand implements ICommand {
  private io: Server;
  private twitchClient: Client;
  private pewService: IPewService;
  private vehicleService: IVehicleService;

  constructor(
    io: Server,
    twitchClient: Client,
    pewService: IPewService,
    vehicleService: IVehicleService
  ) {
    this.io = io;
    this.twitchClient = twitchClient;
    this.pewService = pewService;
    this.vehicleService = vehicleService;
  }

  public async handleCommand(
    channel: string,
    user: ChatUserstate,
    message: string,
    self: boolean
  ) {
    if (user.username) {
      const [_, type] = message.split(" ") as [
        string,
        "vehicles" | "pews" | string
      ];
      switch (type) {
        case "vehicles": {
          const vehicles = await this.vehicleService.listVehicles();
          this.twitchClient.say(
            channel,
            `You can purchase ${vehicles
              .map(vehicle => `${vehicle.name} for ${vehicle.cost}`)
              .join(" and ")}.`
          );
          this.io.emit("list-vehicles", vehicles);
          return;
        }

        case "pews": {
          const pews = await this.pewService.listPews();
          if (!pews) {
            return;
          }

          this.twitchClient.say(
            channel,
            `You can purchase ${pews
              .map(pew => `${pew.name} for ${pew.cost}`)
              .join(" and ")}.`
          );
          this.io.emit("list-pews", pews);
          return;
        }

        default: {
          return;
        }
      }
    }
  }
}
