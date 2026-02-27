import { z } from "zod";

export const productionSchema = z.object({
  finishedProductId: z.string().min(1),
  quantityProduced: z.number().positive()
});
