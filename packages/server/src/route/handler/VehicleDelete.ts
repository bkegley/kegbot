import { IRouteHandler } from "./IRouteHandler";
import { Request, Response } from "express";
import { IVehicleService } from "../../service/IVehicleService";

export class VehicleDeleteRouteHandler implements IRouteHandler {
  private vehicleService: IVehicleService;
  constructor(vehicleService: IVehicleService) {
    this.vehicleService = vehicleService;
  }

  async handle(req: Request<{ id: string }>, res: Response) {
    const vehicle = await this.vehicleService.delete(parseInt(req.params.id));
    res.json(vehicle);
  }
}
