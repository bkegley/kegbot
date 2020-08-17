import { Request, Response } from "express";
import { IAidService } from "../../service";
import { IRouteHandler } from "./IRouteHandler";

export class AidGetByIdRouteHandler implements IRouteHandler {
  private aidService: IAidService;
  constructor(aidService: IAidService) {
    this.aidService = aidService;
  }

  async handle(req: Request<{ id: string }>, res: Response) {
    const aid = await this.aidService.getById(parseInt(req.params.id, 10));
    res.json(aid);
  }
}
