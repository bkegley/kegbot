import { ICommand } from "./ICommand";
import { Server } from "socket.io";
import { ChatUserstate, Client } from "tmi.js";
import { IOrderService } from "../service/IOrderService";

export class OrderCommand implements ICommand {
  private io: Server;
  private twitchClient: Client;
  private orderService: IOrderService;

  constructor(io: Server, twitchClient: Client, orderService: IOrderService) {
    this.io = io;
    this.twitchClient = twitchClient;
    this.orderService = orderService;
  }

  public async handleCommand(
    channel: string,
    user: ChatUserstate,
    message: string,
    self: boolean
  ) {
    if (user.username) {
      const [_, ...descriptionWords] = message.split(" ");
      const description = descriptionWords.join(" ");

      const orderSuggestion = await this.orderService.createSuggestion(
        user.username,
        { description }
      );

      this.io.emit("order-suggested", orderSuggestion);
    }
  }
}
