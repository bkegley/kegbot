import { IRouteHandler } from "./IRouteHandler";
import { Request, Response } from "express";
import { IVehicleService } from "../../service/IVehicleService";

export class VehicleGetByIdRouteHandler implements IRouteHandler {
  private vehicleService: IVehicleService;
  constructor(vehicleService: IVehicleService) {
    this.vehicleService = vehicleService;
  }

  async handle(req: Request<{ id: string }>, res: Response) {
    const vehicle = await this.vehicleService.get(parseInt(req.params.id));
    res.json(vehicle);
  }
}
