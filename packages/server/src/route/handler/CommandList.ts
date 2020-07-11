import { IRouteHandler } from "./IRouteHandler";
import { CommandService } from "../../service/CommandService";
import { Request, Response } from "express";

export class CommandListRouteHandler implements IRouteHandler {
  private commandService: CommandService;

  constructor(commandService: CommandService) {
    this.commandService = commandService;
  }

  async handle(req: Request, res: Response) {
    const commands = await this.commandService.listCommands();
    return res.json(commands);
  }
}
