import { Aid } from "../entity/Aid";
import { UserAid } from "../entity/UserAid";

export interface IAidService {
  listAids(): Promise<Aid[]>;
  listUserAidsByUsername(username: string): Promise<UserAid[] | undefined>;
  getById(id: number): Promise<Aid | undefined>;
  getByName(name: string): Promise<Aid | undefined>;
  create(input: Omit<Aid, "id">): Promise<Aid>;
  update(id: number, input: Omit<Aid, "id">): Promise<Aid | undefined>;
  delete(id: number): Promise<boolean>;
}
