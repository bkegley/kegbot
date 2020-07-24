import { IUser, IVehicle } from "./index";

export interface IUserVehicle {
  id: number;
  health: number;
  user: IUser;
  vehicle: IVehicle;
}
