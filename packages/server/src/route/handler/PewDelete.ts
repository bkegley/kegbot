import { Request, Response } from "express";
import { IPewService } from "../../service";
import { IRouteHandler } from "./IRouteHandler";

export class PewDeleteRouteHandler implements IRouteHandler {
  private pewService: IPewService;
  constructor(pewService: IPewService) {
    this.pewService = pewService;
  }

  async handle(req: Request<{ id: string }>, res: Response) {
    const pew = await this.pewService.delete(parseInt(req.params.id));
    res.json(pew);
  }
}
