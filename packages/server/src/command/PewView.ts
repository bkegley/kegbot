import { ICommand } from "./ICommand";
import { Server } from "socket.io";
import { ChatUserstate, Client } from "tmi.js";
import { IUserService } from "../service";

export class PewViewCommand implements ICommand {
  private io: Server;
  private twitchClient: Client;
  private userService: IUserService;

  constructor(io: Server, twitchClient: Client, userService: IUserService) {
    this.io = io;
    this.twitchClient = twitchClient;
    this.userService = userService;
  }

  public async handleCommand(
    channel: string,
    user: ChatUserstate,
    message: string,
    self: boolean
  ) {
    if (user.username) {
      const foundUser = await this.userService.getByUsername(user.username);
      if (!foundUser) return;

      const [command, viewType] = message.split(" ") as [
        string,
        "pews" | "vehicles" | "aids" | string
      ];

      switch (viewType) {
        case "pews": {
          const topPews = foundUser.pews
            .sort((a, b) => {
              if (!b.pew?.healthModification) return 1;
              if (!a.pew?.healthModification) return -1;
              return b.pew.healthModification - a.pew.healthModification;
            })
            .slice(0, 3);

          this.twitchClient.say(
            channel,
            `${user.username}'s top pews are ${topPews
              .map(
                pew =>
                  `{name: ${pew.pew.name}, health: ${pew.pew.healthModification}}`
              )
              .join(", ")}.`
          );
          return;
        }
        case "vehicles": {
          const topVehicles = foundUser.vehicles
            .filter(vehicle => vehicle.health > 0)
            .sort((a, b) => {
              const bSpeed = b.vehicle.baseSpeed ?? 0;
              const aSpeed = a.vehicle.baseSpeed ?? 0;

              return bSpeed - aSpeed;
            })
            .slice(0, 3);

          this.twitchClient.say(
            channel,
            `${user.username}'s fastest vehicles are ${topVehicles
              .map(
                vehicle =>
                  `{name: ${vehicle.vehicle.name}, speed: ${vehicle.vehicle.baseSpeed}}`
              )
              .join(", ")}.`
          );
          return;
        }
        case "aids": {
          const topAids = foundUser.aids
            .sort((a, b) => {
              const bHealth = b.aid.healthModification ?? 0;
              const aHealth = a.aid.healthModification ?? 0;

              return bHealth - aHealth;
            })
            .slice(0, 3);

          this.twitchClient.say(
            channel,
            `${user.username}'s most helpful aids are ${topAids
              .map(
                aid =>
                  `{name: ${aid.aid.name}, health: ${aid.aid.healthModification}}`
              )
              .join(", ")}.`
          );
          return;
        }
        default: {
          this.twitchClient.say(
            channel,
            `${user.username} has ${foundUser.kegerrands} kegerrands, ${foundUser.aids.length} aids, ${foundUser.pews.length} pews, and ${foundUser.vehicles.length} vehicles. Use !pewview aids/pews/vehicles to view your aids, pews, or vehicles.`
          );
          return;
        }
      }
    }
  }
}
