import { ICommand } from "./ICommand";
import { IPhoneService, IDeliverySessionService } from "../service";
import { ChatUserstate } from "tmi.js";

export class AnswerCommand implements ICommand {
  private readonly phoneService: IPhoneService;
  private readonly deliverySessionService: IDeliverySessionService;

  constructor(
    phoneService: IPhoneService,
    deliverySessionService: IDeliverySessionService
  ) {
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
      console.log(
        `${user.username} tried to answer the phone and it ${
          this.phoneService.isRinging ? "was" : "was not"
        } ringing.`
      );
      if (this.phoneService.isRinging) {
        this.phoneService.answer(user.username);
        this.deliverySessionService.createForUser(user.username);
      }
    }
  }
}
