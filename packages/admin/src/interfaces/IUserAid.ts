import { IUser } from "./IUser";
import { IAid } from "./IAid";

export interface IUserAid {
  id: number;
  uuid: string;
  user: IUser;
  aid: IAid;
}
