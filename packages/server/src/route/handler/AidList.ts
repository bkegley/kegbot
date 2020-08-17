import { IRouteHandler } from "./IRouteHandler";
import { IAidService } from "../../service";
import { Request, Response } from "express";

export class AidListRouteHandler implements IRouteHandler {
  private aidService: IAidService;

  constructor(aidService: IAidService) {
    this.aidService = aidService;
  }

  async handle(req: Request, res: Response) {
    const aid = await this.aidService.listAids();
    res.json(aid);
  }
}
