import { IRouteHandler } from "./IRouteHandler";
import { Request, Response } from "express";
import { IVehicleService } from "../../service/IVehicleService";

export class VehicleCreateRouteHandler implements IRouteHandler {
  private vehicleService: IVehicleService;
  constructor(vehicleService: IVehicleService) {
    this.vehicleService = vehicleService;
  }

  async handle(req: Request, res: Response) {
    const vehicle = await this.vehicleService.create(req.body);
    res.json(vehicle);
  }
}
