import { IRouteHandler } from "./IRouteHandler";
import { IAidService } from "../../service";
import { Request, Response } from "express";

export class ListUserAidsByUsernameRouteHandler implements IRouteHandler {
  private aidService: IAidService;

  constructor(aidService: IAidService) {
    this.aidService = aidService;
  }

  async handle(req: Request<{ username: string }>, res: Response) {
    const vehicles = await this.aidService.listUserAidsByUsername(
      req.params.username
    );
    res.json(vehicles);
  }
}
