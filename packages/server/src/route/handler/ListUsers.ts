import { IRouteHandler } from "./IRouteHandler";
import { UserService } from "../../service";
import { Request, Response } from "express";

export class ListUsersRouteHandler implements IRouteHandler {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async handle(req: Request, res: Response) {
    const users = await this.userService.listUsers();
    res.json(users);
  }
}
