import { User } from "../entity/User";
import { UserVehicle } from "../entity/UserVehicle";

export interface IUserService {
  listUsers(): Promise<User[]>;
  getByUsername(username: string): Promise<User | undefined>;
  findOrCreateUser(username: string): Promise<User>;
  saveUserGreeting(username: string, greeting: string): Promise<User>;
  purchaseVehicle(username: string, vehicleName: string): Promise<UserVehicle>;
  purchasePew(username: string, pewName: string): Promise<any>;
}
