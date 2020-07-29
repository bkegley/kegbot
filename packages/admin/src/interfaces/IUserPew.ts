import { IUser } from "./IUser";
import { IPew } from "./IPew";

export interface IUserPew {
  id: number;
  uuid: string;
  user: IUser;
  pew: IPew;
}
