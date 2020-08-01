import { OrderSuggestion } from "../entity/OrderSuggestion";

export interface IOrderService {
  listOrderSuggestions(): Promise<OrderSuggestion[] | undefined>;
  createSuggestion(
    username: string,
    input: Omit<OrderSuggestion, "id" | "approved" | "user">
  ): Promise<OrderSuggestion | undefined>;
}
