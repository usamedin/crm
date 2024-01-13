import { Context, HandlerEvent } from "../types/Handler";

export async function getCustomerOrders(event: HandlerEvent, context: Context) {
  const customerId = event.params.customerId

  return []
}
