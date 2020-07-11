import { IRouteHandler } from "./IRouteHandler";
import { CommandService } from "../../service/CommandService";
import { Request, Response } from "express";

export class CommandDeleteRouteHandler implements IRouteHandler {
  private commandService: CommandService;

  constructor(commandService: CommandService) {
    this.commandService = commandService;
  }

  async handle(req: Request<{ id: string }>, res: Response) {
    const user = await this.commandService.delete(req.params.id);
    res.json(user);
  }
}
