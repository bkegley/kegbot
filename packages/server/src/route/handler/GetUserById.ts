import { Request, Response } from "express";
import { IRouteHandler } from "./IRouteHandler";
import { UserService } from "../../service";

export class GetUserByIdRouteHandler implements IRouteHandler {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async handle(req: Request<{ id: string }>, res: Response) {
    const user = await this.userService.getByUsername(req.params.id);
    res.json(user);
  }
}
