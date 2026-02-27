import { z } from "zod";

export const purchaseOrderSchema = z.object({
  vendorId: z.string().min(1),
  items: z.array(
    z.object({
      productId: z.string().min(1),
      quantity: z.number().positive()
    })
  ).min(1)
});
