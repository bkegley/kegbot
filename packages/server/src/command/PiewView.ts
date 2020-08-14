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
        "pews" | "vehicles" | string
      ];

      console.log(JSON.stringify(foundUser));

      if (viewType === "pews") {
        console.log("we are lookin for pews");
        const topPews = foundUser.pews
          .sort((a, b) => {
            if (!b.pew?.healthModification) return 1;
            if (!a.pew?.healthModification) return -1;
            return b.pew.healthModification - a.pew.healthModification;
          })
          .slice(0, 3);

        this.twitchClient.say(
          channel,
          `Your top pews are ${topPews
            .map(
              pew =>
                `{name: ${pew.pew.name}, health: ${pew.pew.healthModification}}`
            )
            .join(", ")}.`
        );
      } else if (viewType === "vehicles") {
        const topVehicles = foundUser.vehicles
          .sort((a, b) => {
            const bSpeed = b.vehicle.baseSpeed ?? 0;
            const aSpeed = a.vehicle.baseSpeed ?? 0;

            return bSpeed - aSpeed;
          })
          .slice(0, 3);

        this.twitchClient.say(
          channel,
          `Your fastest vehicles are ${topVehicles
            .map(
              vehicle =>
                `{name: ${vehicle.vehicle.name}, speed: ${vehicle.vehicle.baseSpeed}}`
            )
            .join(", ")}.`
        );
      } else {
        this.twitchClient.say(
          channel,
          `You have ${foundUser.kegerrands} kegerrands, ${foundUser.pews.length} pews and ${foundUser.vehicles.length} vehicles. Use !pewview pews/vehicles to view your pews or vehicles`
        );
      }
    }
  }
}
