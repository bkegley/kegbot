import { ICommand } from "./ICommand";
import { Server } from "socket.io";
import { ChatUserstate, Client } from "tmi.js";
import { IUserService } from "../service";

type PurchaseTypes = "vehicle" | "pew" | "aid";
export class PurchaseCommand implements ICommand {
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
      const [_, type, ...nameWords] = message.split(" ") as [
        string,
        PurchaseTypes,
        string[] | undefined
      ];

      if (!nameWords) return;
      const name = nameWords?.join(" ");

      switch (type) {
        case "vehicle": {
          const purchasedVehicle = await this.userService.purchaseVehicle(
            user.username,
            name
          );
          this.io.emit("purchased-vehicle", {
            vehicle: purchasedVehicle
          });
          break;
        }

        case "pew": {
          const purchasedPew = await this.userService.purchasePew(
            user.username,
            name
          );
          this.io.emit("purchased-pew", {
            pew: purchasedPew
          });
          break;
        }

        case "aid": {
          const purchasedAid = await this.userService.purchaseAid(
            user.username,
            name
          );
          this.io.emit("purchased-aid", {
            aid: purchasedAid
          });
          break;
        }
      }
    }
  }
}
