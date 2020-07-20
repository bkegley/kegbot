import { User } from "../entity/User";
import { BaseService } from "../abstract";
import { IUserService } from "./IUserService";
import { EntityManager } from "typeorm";
import { Server } from "socket.io";
import { IVehicleService } from "./IVehicleService";
import { UserVehicle } from "../entity/UserVehicle";

export class UserService extends BaseService implements IUserService {
  private vehicleService: IVehicleService;

  constructor(
    manager: EntityManager,
    io: Server,
    vehicleService: IVehicleService
  ) {
    super(manager, io);
    this.vehicleService = vehicleService;
  }

  public listUsers() {
    return this.manager.createQueryBuilder(User, "user").getMany();
  }

  public getByUsername(username: string) {
    return this.manager
      .createQueryBuilder(User, "user")
      .where("username = :username", { username })
      .getOne();
  }

  public async saveUserGreeting(username: string, greeting: string) {
    const user = await this.findOrCreateUser(username);
    user.greeting = greeting;
    await this.manager.save(user);
    return user;
  }

  public async findOrCreateUser(username: string) {
    const user = await this.getByUsername(username);
    if (user) {
      return user;
    }

    const newUser = new User();
    newUser.username = username;
    await this.manager.save(newUser);
    return newUser;
  }

  public async purchaseVehicle(username: string, vehicleName: string) {
    const [user, vehicle] = await Promise.all([
      this.findOrCreateUser(username),
      this.vehicleService.getByName(vehicleName)
    ]);

    if (!user || !vehicle) {
      throw new Error("User or Vehicle not found");
    }

    console.log({ user, vehicle });

    // check for necessary currency

    const purchasedVehicle = new UserVehicle();
    purchasedVehicle.user = user;
    purchasedVehicle.vehicle = vehicle;
    purchasedVehicle.health = vehicle?.baseHealth;
    console.log({ purchasedVehicle });
    this.manager.save(purchasedVehicle);

    return purchasedVehicle;
  }

  public async purchasePew(username: string, pewName: string) {
    return;
  }
}
