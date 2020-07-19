import { IRouteHandler } from "./IRouteHandler";
import { Request, Response } from "express";
import { IVehicleService } from "../../service/IVehicleService";

export class VehicleListRouteHandler implements IRouteHandler {
  private vehicleService: IVehicleService;

  constructor(vehicleService: IVehicleService) {
    this.vehicleService = vehicleService;
  }

  async handle(req: Request, res: Response) {
    const vehicles = await this.vehicleService.listVehicles();
    res.json(vehicles);
  }
}
