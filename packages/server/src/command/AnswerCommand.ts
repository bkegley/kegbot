import { ICommand } from "./ICommand";
import { IPhoneService, IDeliverySessionService } from "../service";
import { ChatUserstate, Client } from "tmi.js";

export class AnswerCommand implements ICommand {
  private twitchClient: Client;
  private readonly phoneService: IPhoneService;
  private readonly deliverySessionService: IDeliverySessionService;

  constructor(
    twitchClient: Client,
    phoneService: IPhoneService,
    deliverySessionService: IDeliverySessionService
  ) {
    this.twitchClient = twitchClient;
    this.phoneService = phoneService;
    this.deliverySessionService = deliverySessionService;
  }

  public async handleCommand(
    channel: string,
    user: ChatUserstate,
    message: string,
    self: boolean
  ) {
    if (user.username) {
      if (this.phoneService.isRinging) {
        const deliverySession = await this.deliverySessionService.createForUser(
          user.username
        );

        if (!deliverySession) {
          return;
        }
        this.phoneService.answer();
        this.twitchClient.say(
          channel,
          `${deliverySession.user.username} answered the phone!`
        );
      }
    }
  }
}
