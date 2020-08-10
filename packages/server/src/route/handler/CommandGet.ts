import { IRouteHandler } from "./IRouteHandler";
import { CommandService } from "../../service/CommandService";
import { Request, Response } from "express";

export class CommandGetRouteHandler implements IRouteHandler {
  private commandService: CommandService;

  constructor(commandService: CommandService) {
    this.commandService = commandService;
  }

  async handle(req: Request<{ id: string }>, res: Response) {
    const command = await this.commandService.getCommand(
      parseInt(req.params.id)
    );
    res.json(command);
  }
}
