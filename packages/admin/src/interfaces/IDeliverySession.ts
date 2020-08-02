import { IUser } from "./index";
import { IUserVehicle } from "./IUserVehicle";

export interface IDeliverySession {
  id: number;
  user: IUser;
  userVehicle: IUserVehicle;
}
