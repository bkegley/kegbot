import { User } from "../entity/User";
import { UserVehicle } from "../entity/UserVehicle";
import { UserPew } from "../entity/UserPew";

export interface IUserService {
  listUsers(): Promise<User[]>;
  getByUsername(username: string): Promise<User | undefined>;
  findOrCreateUser(username: string): Promise<User>;
  saveUserGreeting(username: string, greeting: string): Promise<User>;
  give(username: string, amount: number): Promise<User>;
  purchaseVehicle(username: string, vehicleName: string): Promise<UserVehicle>;
  getUserVehicle(
    username: string,
    vehicleId: number
  ): Promise<UserVehicle | undefined>;
  getUserVehicleByName(
    username: string,
    vehicleName: string
  ): Promise<UserVehicle | undefined>;
  updateUserVehicle(
    userVehicleId: number,
    input: Partial<UserVehicle>
  ): Promise<UserVehicle | undefined>;
  purchasePew(username: string, pewName: string): Promise<any>;
  getUserPewByName(
    username: string,
    pewName: string
  ): Promise<UserPew | undefined>;
}
