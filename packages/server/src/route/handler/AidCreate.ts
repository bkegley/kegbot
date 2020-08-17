import { IRouteHandler } from "./IRouteHandler";
import { IAidService } from "../../service";
import { Request, Response } from "express";

export class AidCreateRouteHandler implements IRouteHandler {
  private aidService: IAidService;

  constructor(aidService: IAidService) {
    this.aidService = aidService;
  }

  async handle(req: Request, res: Response) {
    const aid = await this.aidService.create(req.body);
    res.json(aid);
  }
}
