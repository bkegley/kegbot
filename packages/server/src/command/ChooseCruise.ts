import { ICommand } from "./ICommand";
import { Server } from "socket.io";
import { IUserService, IDeliverySessionService } from "../service";
import { ChatUserstate } from "tmi.js";

export class ChooseCruiseCommand implements ICommand {
  private io: Server;
  private userService: IUserService;
  private deliverySessionService: IDeliverySessionService;

  constructor(
    io: Server,
    userService: IUserService,
    deliverySessionService: IDeliverySessionService
  ) {
    this.io = io;
    this.userService = userService;
    this.deliverySessionService = deliverySessionService;
  }

  public async handleCommand(
    channel: string,
    user: ChatUserstate,
    message: string,
    self: boolean
  ) {
    if (user.username) {
      const userActiveDeliverySession = await this.deliverySessionService.getUserActiveDeliverySession(
        user.username
      );

      if (!userActiveDeliverySession) {
        // TODO: should do something
        return null;
      }

      const [_, idString] = message.split(" ");
      const id = parseInt(idString);

      if (isNaN(id)) {
        // TODO: we should do something here
        return null;
      }

      const vehicle = await this.userService.getUserVehicle(user.username, id);

      if (!vehicle) {
        // TODO: Should throw? an error
        return null;
      }

      await this.deliverySessionService.setVehicle(
        userActiveDeliverySession.id,
        vehicle
      );

      this.io.emit("cruise-choosed", vehicle);
    }
  }
}
