import { Vehicle } from "../entity/Vehicle";
import { UserVehicle } from "../entity/UserVehicle";

export interface IVehicleService {
  listVehicles(): Promise<Vehicle[]>;
  listUserVehiclesByUsername(username: string): Promise<UserVehicle[]>;
  get(id: number): Promise<Vehicle | undefined>;
  getByName(name: string): Promise<Vehicle | undefined>;
  create(input: Omit<Vehicle, "id">): Promise<Vehicle>;
  update(id: number, input: Omit<Vehicle, "id">): Promise<Vehicle | undefined>;
  updateByName(
    name: string,
    input: Omit<Vehicle, "name">
  ): Promise<Vehicle | undefined>;
  delete(id: number): Promise<boolean>;
}
