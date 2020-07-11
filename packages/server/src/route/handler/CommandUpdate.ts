import { IRouteHandler } from "./IRouteHandler";
import { CommandService } from "../../service/CommandService";
import { Request, Response } from "express";

export class CommandUpdateRouteHandler implements IRouteHandler {
  private commandService: CommandService;

  constructor(commandService: CommandService) {
    this.commandService = commandService;
  }

  async handle(req: Request<{ id: string }>, res: Response) {
    const updatedCommand = await this.commandService.updateCommand(
      req.params.id,
      req.body
    );
    res.json(updatedCommand);
  }
}
