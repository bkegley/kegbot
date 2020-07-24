import { BaseService } from "../abstract";
import { IOrderService } from "./IOrderService";
import { Order } from "../entity/Order";

export class OrderService extends BaseService implements IOrderService {
  public async listOrders() {
    const orders = await this.manager
      .createQueryBuilder(Order, "order")
      .getMany();
    return orders;
  }
  public async createSuggestion(
    username: string,
    input: Omit<Order, "id" | "approved">
  ) {
    const orderSuggestion = new Order();

    // @ts-ignore
    orderSuggestion.user = username;

    ((Object.keys(input) as unknown) as Array<keyof Order>).forEach(
      (key: keyof Order) => {
        // @ts-ignore
        orderSuggestion[key] = input[key];
      }
    );

    await this.manager.save(orderSuggestion);
    return orderSuggestion;
  }
}
