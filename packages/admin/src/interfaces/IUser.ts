import { IVehicle, IPew } from "./index";

export interface IUser {
  username: string;
  greeting: string;
  kegerrands: number;
  vehicles: IVehicle[];
  pews: IPew[];
}
