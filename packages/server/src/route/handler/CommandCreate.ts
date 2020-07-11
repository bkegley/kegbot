import { IRouteHandler } from "./IRouteHandler";
import { CommandService } from "../../service/CommandService";
import { Request, Response } from "express";

export class CommandCreateRouteHandler implements IRouteHandler {
  private commandService: CommandService;

  constructor(commandService: CommandService) {
    this.commandService = commandService;
  }

  async handle(req: Request, res: Response) {
    const user = await this.commandService.create(req.body);
    res.json(user);
  }
}
