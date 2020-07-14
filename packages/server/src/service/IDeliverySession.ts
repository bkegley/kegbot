import { DeliverySession } from "../entity/DeliverySession";

export interface IDeliverySessionService {
  createForUser(username: string): Promise<DeliverySession | null>;
}
