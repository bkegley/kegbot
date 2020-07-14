import { BaseService } from "../abstract";
import { EntityManager } from "typeorm";
import { Server } from "socket.io";
import { IUserService } from "./IUserService";
import { DeliverySession } from "../entity/DeliverySession";
import { IDeliverySessionService } from "./IDeliverySession";

export class DeliverySessionService extends BaseService
  implements IDeliverySessionService {
  private userService: IUserService;

  constructor(manager: EntityManager, io: Server, userService: IUserService) {
    super(manager, io);
    this.userService = userService;
  }

  async createForUser(username: string) {
    const user = await this.userService.findOrCreateUser(username);
    if (user) {
      const deliverySession = new DeliverySession();
      deliverySession.user = user;
      await this.manager
        .save(deliverySession)
        .catch(err => console.log({ err }));

      this.io.emit("delivery-session-created", deliverySession);

      return deliverySession;
    }
    return null;
  }
}
