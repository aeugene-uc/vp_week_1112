import { z } from 'zod'
import { CustomerIdSchema } from './customer-validation';
import { RestaurantIdSchema } from './restaurant-validation';

export const CreateOrderSchema = z.object({
  customerId: CustomerIdSchema,
  restaurantId: RestaurantIdSchema,
  itemAmount: z.number().min(1, 'Item amount must be at least 1.').int('Item amount must be an integer.')
});

export const OrderIdSchema = z.any().refine(val => {
  return typeof val === "number" && Number.isInteger(val) && val > 0;
}, {
  message: "Invalid orderId."
});

