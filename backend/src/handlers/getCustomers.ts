import { Context, HandlerEvent } from "../types/Handler";
import { PrismaClient } from "../db/generated/client";
const prisma = new PrismaClient();

export async function getCustomers(event: HandlerEvent, context: Context) {
  return await prisma.customer.findMany({})
}
