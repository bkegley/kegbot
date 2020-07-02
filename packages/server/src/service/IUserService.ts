import { User } from "../entity/User";

export interface IUserService {
  listUsers(): Promise<User[]>;
  getByUsername(username: string): Promise<User | undefined>;
  findOrCreateUser(username: string): Promise<User>;
  saveUserGreeting(username: string, greeting: string): Promise<User>;
}
