import { IUser } from "./index";
import { IUserVehicle } from "./IUserVehicle";

export interface IDeliverySession {
  id: number;
  duration: number;
  reward: number;
  distance: number;
  queueTimer: number;
  user: IUser;
  userVehicle: IUserVehicle;
}
