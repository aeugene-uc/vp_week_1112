import { z } from 'zod'

export const CreateRestaurantSchema = z.object({
  name: z.string().min(1, 'Restaurant name is required.').trim(),
  description: z.string().trim(),
  isOpen: z.boolean().optional().default(true)
});

export const UpdateRestaurantSchema = CreateRestaurantSchema.partial().refine((data) => Object.keys(data).length > 0, {
  message: 'At least one field must be provided to update.'
}).strict();

export const RestaurantIdSchema = z.any().refine(val => {
  return typeof val === "number" && Number.isInteger(val) && val > 0;
}, {
  message: "Invalid restaurantId."
});

export const RestaurantStatusSchema = z.any().refine(val => (
  typeof val === 'string' && ['opened', 'closed'].includes(val.toLowerCase().trim())
), {
  message: 'Invalid restaurant status. Only \"opened\" and \"closed\" are available.'
})
