import { z } from "zod";

export const customerOrderSchema = z.object({
  customerId: z.string().min(1),
  items: z.array(
    z.object({
      productId: z.string().min(1),
      quantity: z.number().positive()
    })
  ).min(1)
});
