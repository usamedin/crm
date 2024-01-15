import { PrismaClient } from "../db/generated/client";
import { Context, HandlerEvent } from "../types/Handler";
const prisma = new PrismaClient();

export async function getCustomerOrders(event: HandlerEvent, context: Context) {
  const customerId = event.params.customerId
  const orders = await prisma.order.findMany({ where: { customerId } })
  console.log(customerId, orders)
  return orders
}
