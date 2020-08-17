import { BaseService } from "../abstract";
import { Vehicle } from "../entity/Vehicle";
import { IVehicleService } from "./IVehicleService";
import { UserVehicle } from "../entity/UserVehicle";

export class VehicleService extends BaseService implements IVehicleService {
  async listVehicles() {
    const vehicles = await this.manager
      .createQueryBuilder(Vehicle, "vehicle")
      .getMany();
    return vehicles;
  }

  // @ts-ignore
  async listUserVehiclesByUsername(username: string) {
    const vehicles = await this.manager
      .createQueryBuilder(UserVehicle, "userVehicle")
      .innerJoinAndSelect("userVehicle.user", "user")
      .innerJoinAndSelect("userVehicle.vehicle", "vehicle")
      .where("user.username = :username", { username })
      .andWhere("userVehicle.health > 0")
      .getMany();

    return vehicles;
  }

  async get(id: number) {
    const vehicle = await this.manager
      .createQueryBuilder(Vehicle, "vehicle")
      .where("id = :id", { id })
      .getOne();
    return vehicle;
  }

  async getByName(name: string) {
    const vehicle = await this.manager
      .createQueryBuilder(Vehicle, "vehicle")
      .where("name = :name", { name })
      .getOne();
    return vehicle;
  }

  async create(input: Omit<Vehicle, "id">) {
    const vehicle = new Vehicle();
    ((Object.keys(input) as unknown) as Array<keyof Vehicle>).forEach(
      (key: keyof Vehicle) => {
        // @ts-ignore
        vehicle[key] = input[key];
      }
    );
    await this.manager.save(vehicle);
    return vehicle;
  }

  async update(id: number, input: Omit<Vehicle, "id">) {
    const res = await this.manager
      .createQueryBuilder(Vehicle, "vehicle")
      .update(input)
      .where("id = :id", { id })
      .execute();
    return { id, ...input };
  }

  async updateByName(name: string, input: Omit<Vehicle, "name">) {
    const res = await this.manager
      .createQueryBuilder(Vehicle, "vehicle")
      .update(input)
      .where("name = :name", { name })
      .execute();
    return {
      name,
      ...input
    };
  }

  async delete(id: number) {
    const res = await this.manager
      .createQueryBuilder(Vehicle, "vehicle")
      .delete()
      .where("id = :id", { id })
      .execute();
    return true;
  }
}
