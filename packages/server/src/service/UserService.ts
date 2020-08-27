import { User } from "../entity/User";
import { BaseService } from "../abstract";
import { IUserService } from "./IUserService";
import { EntityManager } from "typeorm";
import { Server } from "socket.io";
import { IVehicleService } from "./IVehicleService";
import { UserVehicle } from "../entity/UserVehicle";
import { IPewService } from "./IPewService";
import { UserPew } from "../entity/UserPew";
import { Pew } from "../entity/Pew";
import { IAidService } from "./IAidService";
import { UserAid } from "../entity/UserAid";

export class UserService extends BaseService implements IUserService {
  private vehicleService: IVehicleService;
  private pewService: IPewService;
  private aidService: IAidService;

  constructor(
    manager: EntityManager,
    io: Server,
    vehicleService: IVehicleService,
    pewService: IPewService,
    aidService: IAidService
  ) {
    super(manager, io);
    this.vehicleService = vehicleService;
    this.pewService = pewService;
    this.aidService = aidService;
  }

  public listUsers() {
    return this.manager.createQueryBuilder(User, "user").getMany();
  }

  public getByUsername(username: string) {
    return this.manager
      .createQueryBuilder(User, "user")
      .where("username = :username", { username: username.toLowerCase() })
      .leftJoinAndSelect("user.vehicles", "vehicles")
      .leftJoinAndSelect("vehicles.vehicle", "vehicle")
      .leftJoinAndSelect("user.pews", "pews")
      .leftJoinAndSelect("pews.pew", "pew")
      .leftJoinAndSelect("user.aids", "aids")
      .leftJoinAndSelect("aids.aid", "aid")
      .getOne();
  }

  public async saveUserGreeting(username: string, greeting: string) {
    const user = await this.findOrCreateUser(username);
    user.greeting = greeting;
    await this.manager.save(user);
    return user;
  }

  public async saveUserGitHubEmail(username: string, email: string) {
    const user = await this.findOrCreateUser(username);
    user.email = email;
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

  public async give(username: string, amount: number) {
    const user = await this.findOrCreateUser(username);
    if (!user) {
      throw new Error("Not a valid user");
    }

    user.kegerrands += amount;
    await this.manager.save(user);
    return user;
  }

  public async purchaseVehicle(username: string, vehicleName: string) {
    const [user, vehicle] = await Promise.all([
      this.findOrCreateUser(username),
      this.vehicleService.getByName(vehicleName)
    ]);

    if (!user || !vehicle) {
      throw new Error("User or Vehicle not found");
    }

    if (user.kegerrands < vehicle.cost) {
      throw new Error("User does not have enough kegerrands to purchase");
    }

    const purchasedVehicle = new UserVehicle();
    purchasedVehicle.user = user;
    purchasedVehicle.vehicle = vehicle;
    purchasedVehicle.health = vehicle?.baseHealth;
    this.manager.save(purchasedVehicle);

    user.kegerrands -= vehicle.cost;
    this.manager.save(user);

    return purchasedVehicle;
  }

  public async getUserVehicle(username: string, vehicleId: number) {
    const vehicle = await this.manager
      .createQueryBuilder(UserVehicle, "userVehicle")
      .innerJoinAndSelect("userVehicle.user", "user")
      .innerJoinAndSelect("userVehicle.vehicle", "vehicle")
      .where("user.username = :username", { username })
      .andWhere("userVehicle.id = :vehicleId", { vehicleId })
      .getOne();

    return vehicle;
  }

  public async getUserVehicleByName(username: string, vehicleName: string) {
    const vehicle = await this.manager
      .createQueryBuilder(UserVehicle, "userVehicle")
      .innerJoinAndSelect("userVehicle.user", "user")
      .innerJoinAndSelect("userVehicle.vehicle", "vehicle")
      .where("user.username = :username", { username })
      .andWhere("vehicle.name = :name", { name: vehicleName })
      .getOne();

    return vehicle;
  }

  public async updateUserVehicle(
    userVehicleId: number,
    input: Partial<Omit<UserVehicle, "id">>
  ) {
    const userVehicle = await this.manager
      .createQueryBuilder(UserVehicle, "userVehicle")
      .where("id = :userVehicleId", { userVehicleId })
      .getOne();

    if (!userVehicle) return;

    (Object.keys(input) as Array<keyof typeof input>).map(key => {
      // @ts-ignore
      userVehicle[key] = input[key];
    });

    await this.manager.save(userVehicle);
    return userVehicle;
  }

  public async purchasePew(username: string, pewName: string) {
    const [user, pew] = await Promise.all([
      this.getByUsername(username),
      this.pewService.getByName(pewName)
    ]);

    if (!user || !pew) {
      throw new Error("User or Pew was not found");
    }

    if (user.kegerrands < pew.cost) {
      throw new Error("User does not have enough kegerrands to purchase");
    }

    if (user.pews.find(pew => pew.pew.name === pewName) && !pew.expendable) {
      throw new Error("User already has this non-expendable pew");
    }

    const purchasedPew = new UserPew();
    purchasedPew.pew = pew;
    purchasedPew.user = user;
    this.manager.save(purchasedPew);

    user.kegerrands -= pew.cost;
    this.manager.save(user);

    return purchasedPew;
  }

  public async getUserPewByName(username: string, pewName: string) {
    const pew = await this.manager
      .createQueryBuilder(UserPew, "userPew")
      .innerJoinAndSelect("userPew.user", "user")
      .innerJoinAndSelect("userPew.pew", "pew")
      .where("user.username = :username", { username })
      .andWhere("pew.name = :name", { name: pewName })
      .getOne();

    if (pew && pew.pew.expendable) {
      this.manager.delete(UserPew, pew);
    }

    return pew;
  }

  public async purchaseAid(username: string, aidName: string) {
    const [user, aid] = await Promise.all([
      this.findOrCreateUser(username),
      this.aidService.getByName(aidName)
    ]);

    if (!user || !aid) {
      throw new Error("User or Vehicle not found");
    }

    if (user.kegerrands < aid.cost) {
      throw new Error("User does not have enough kegerrands to purchase");
    }

    const purchasedAid = new UserAid();
    purchasedAid.user = user;
    purchasedAid.aid = aid;
    this.manager.save(purchasedAid);

    user.kegerrands -= aid.cost;
    this.manager.save(user);

    return purchasedAid;
  }

  public async getUserAidByName(username: string, aidName: string) {
    const aid = await this.manager
      .createQueryBuilder(UserAid, "userAid")
      .innerJoinAndSelect("userAid.user", "user")
      .innerJoinAndSelect("userAid.aid", "aid")
      .where("user.username = :username", { username })
      .andWhere("aid.name = :name", { name: aidName })
      .getOne();

    if (aid && aid.aid.expendable) {
      this.manager.delete(UserAid, aid);
    }

    return aid;
  }
}
