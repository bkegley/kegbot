import { IUser } from "./index";
import { IUserVehicle } from "./IUserVehicle";

export interface IDeliverySession {
  id: number;
  duration: number;
  reward: number;
  user: IUser;
  userVehicle: IUserVehicle;
}
