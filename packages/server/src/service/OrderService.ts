import { BaseService } from "../abstract";
import { IOrderService } from "./IOrderService";
import { OrderSuggestion } from "../entity/OrderSuggestion";

export class OrderService extends BaseService implements IOrderService {
  public async listOrderSuggestions() {
    const orders = await this.manager
      .createQueryBuilder(OrderSuggestion, "order")
      .getMany();
    return orders;
  }
  public async createSuggestion(
    username: string,
    input: Omit<OrderSuggestion, "id" | "approved">
  ) {
    const orderSuggestion = new OrderSuggestion();

    // @ts-ignore
    orderSuggestion.user = username;

    ((Object.keys(input) as unknown) as Array<keyof OrderSuggestion>).forEach(
      (key: keyof OrderSuggestion) => {
        // @ts-ignore
        orderSuggestion[key] = input[key];
      }
    );

    await this.manager.save(orderSuggestion);
    return orderSuggestion;
  }
}
