import { DeliverySession } from "../entity/DeliverySession";
import { UserVehicle } from "../entity/UserVehicle";

export interface IDeliverySessionService {
  createForUser(username: string): Promise<DeliverySession | null>;
  getUserActiveDeliverySession(
    username: string
  ): Promise<DeliverySession | undefined>;
  setVehicle(
    deliverySessionId: number,
    userVehicle: UserVehicle
  ): Promise<boolean>;
  win(deliverySessionId: number): Promise<boolean | undefined>;
  lose(deliverySessionId: number): Promise<boolean | undefined>;
}
