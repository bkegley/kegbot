import { IRouteHandler } from "./IRouteHandler";
import { IOrderService } from "../../service";
import { Request, Response } from "express";

export class OrderSuggestionListRouteHandler implements IRouteHandler {
  private orderService: IOrderService;

  constructor(orderService: IOrderService) {
    this.orderService = orderService;
  }

  async handle(req: Request, res: Response) {
    const orders = await this.orderService.listOrderSuggestions();
    res.json(orders);
  }
}
