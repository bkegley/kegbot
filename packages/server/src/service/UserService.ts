import { User } from "../entity/User";
import { BaseService } from "../abstract";
import { IUserService } from "./IUserService";
import { EntityManager } from "typeorm";
import { Server } from "socket.io";

export class UserService extends BaseService implements IUserService {
  private io: Server;

  constructor(manager: EntityManager, io: Server) {
    super(manager);
    this.io = io;
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
    this.manager.save(newUser);
    return newUser;
  }
}
