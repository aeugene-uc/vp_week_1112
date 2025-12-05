import { z } from 'zod'

export const CreateCustomerSchema = z.object({
  name: z.string().trim().min(1, 'Customer name is required.'),
  phone: z.string().regex(/^\+?[0-9]\d{1,14}$/, 'Phone number is not valid.')
}).strict();

export const UpdateCustomerSchema = CreateCustomerSchema.partial().refine((data) => Object.keys(data).length > 0, {
  message: 'At least one field must be provided to update.'
}).strict();

export const CustomerIdSchema = z.any().refine(val => {
  return typeof val === "number" && Number.isInteger(val) && val > 0;
}, {
  message: "Invalid customerId."
});