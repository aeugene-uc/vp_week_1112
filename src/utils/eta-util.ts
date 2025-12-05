import { Order } from "../../generated/prisma";

export function calculateETA(order: Order) {
  return new Date(order.createdAt.getTime() + (order.itemAmount + 1) * 10 * 60 * 1000);
}