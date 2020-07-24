import { IRouteHandler } from "./IRouteHandler";
import { IPewService } from "../../service";
import { Request, Response } from "express";

export class PewCreateRouteHandler implements IRouteHandler {
  private pewService: IPewService;

  constructor(pewService: IPewService) {
    this.pewService = pewService;
  }

  async handle(req: Request, res: Response) {
    const pew = await this.pewService.create(req.body);
    res.json(pew);
  }
}
