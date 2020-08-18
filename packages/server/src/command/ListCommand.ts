import { ICommand } from "./ICommand";
import { Server } from "socket.io";
import { ChatUserstate, Client } from "tmi.js";
import { IPewService, IVehicleService, IAidService } from "../service";

export class ListCommand implements ICommand {
  private io: Server;
  private twitchClient: Client;
  private pewService: IPewService;
  private vehicleService: IVehicleService;
  private aidService: IAidService;

  constructor(
    io: Server,
    twitchClient: Client,
    pewService: IPewService,
    vehicleService: IVehicleService,
    aidService: IAidService
  ) {
    this.io = io;
    this.twitchClient = twitchClient;
    this.pewService = pewService;
    this.vehicleService = vehicleService;
    this.aidService = aidService;
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
        "vehicles" | "pews" | "aids" | string
      ];
      if (!type) {
        this.twitchClient.say(
          channel,
          "Please specify either vehicles, pews, or aids with !list type"
        );
        return;
      }

      switch (type) {
        case "vehicles": {
          const vehicles = await this.vehicleService.listVehicles();
          this.twitchClient.say(
            channel,
            `Purchase a vehicle with !purchase vehicle vehicleName - you can purchase ${vehicles
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
            `Purchase a pew with !purchase pew pewName - you can purchase ${pews
              .map(pew => `${pew.name} for ${pew.cost}`)
              .join(" and ")}.`
          );
          this.io.emit("list-pews", pews);
          return;
        }

        case "aids": {
          const aids = await this.aidService.listAids();
          if (!aids) {
            return;
          }

          this.twitchClient.say(
            channel,
            `Purchase an aid with !purchase aid aidName - you can purchase ${aids
              .map(aid => `${aid.name} for ${aid.cost}`)
              .join(" and ")}.`
          );
          this.io.emit("list-aids", aids);
          return;
        }

        default: {
          return;
        }
      }
    }
  }
}
