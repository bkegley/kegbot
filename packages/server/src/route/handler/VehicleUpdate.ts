import { IRouteHandler } from "./IRouteHandler";
import { Request, Response } from "express";
import { IVehicleService } from "../../service/IVehicleService";

export class VehicleUpdateRouteHandler implements IRouteHandler {
  private vehicleService: IVehicleService;

  constructor(vehicleService: IVehicleService) {
    this.vehicleService = vehicleService;
  }

  async handle(req: Request<{ id: string }>, res: Response) {
    const vehicles = await this.vehicleService.update(
      parseInt(req.params.id),
      req.body
    );
    res.json(vehicles);
  }
}
