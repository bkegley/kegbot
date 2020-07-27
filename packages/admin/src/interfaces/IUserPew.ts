import { IUser } from "./IUser";
import { IPew } from "./IPew";

export interface IUserPew {
  id: number;
  user: IUser;
  pew: IPew;
}
