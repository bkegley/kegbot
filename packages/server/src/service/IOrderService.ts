import { Order } from "../entity/Order";

export interface IOrderService {
  listOrders(): Promise<Order[] | undefined>;
  createSuggestion(
    username: string,
    input: Omit<Order, "id" | "approved" | "user">
  ): Promise<Order | undefined>;
}
