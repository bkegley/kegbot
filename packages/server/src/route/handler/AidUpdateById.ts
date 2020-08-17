import { Request, Response } from "express";
import { IAidService } from "../../service";
import { IRouteHandler } from "./IRouteHandler";

export class AidUpdateByIdRouteHandler implements IRouteHandler {
  private aidService: IAidService;
  constructor(aidService: IAidService) {
    this.aidService = aidService;
  }

  async handle(req: Request<{ id: string }>, res: Response) {
    const aid = await this.aidService.update(
      parseInt(req.params.id, 10),
      req.body
    );
    res.json(aid);
  }
}
