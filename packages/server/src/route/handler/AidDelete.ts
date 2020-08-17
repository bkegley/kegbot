import { Request, Response } from "express";
import { IAidService } from "../../service";
import { IRouteHandler } from "./IRouteHandler";

export class AidDeleteRouteHandler implements IRouteHandler {
  private aidService: IAidService;
  constructor(aidService: IAidService) {
    this.aidService = aidService;
  }

  async handle(req: Request<{ id: string }>, res: Response) {
    const aid = await this.aidService.delete(parseInt(req.params.id));
    res.json(aid);
  }
}
