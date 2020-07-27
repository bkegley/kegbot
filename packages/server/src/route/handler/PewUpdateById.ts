import { Request, Response } from "express";
import { IPewService } from "../../service";
import { IRouteHandler } from "./IRouteHandler";

export class PewUpdateByIdRouteHandler implements IRouteHandler {
  private pewService: IPewService;
  constructor(pewService: IPewService) {
    this.pewService = pewService;
  }

  async handle(req: Request<{ id: string }>, res: Response) {
    const pew = await this.pewService.update(parseInt(req.params.id), req.body);
    res.json(pew);
  }
}
