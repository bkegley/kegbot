import { IRouteHandler } from "./IRouteHandler";
import { IVehicleService } from "../../service";
import { Request, Response } from "express";

export class ListUserVehiclesByUsernameRouteHandler implements IRouteHandler {
  private vehicleService: IVehicleService;

  constructor(vehicleService: IVehicleService) {
    this.vehicleService = vehicleService;
  }

  async handle(req: Request<{ username: string }>, res: Response) {
    const vehicles = await this.vehicleService.listUserVehiclesByUsername(
      req.params.username
    );
    res.json(vehicles);
  }
}
