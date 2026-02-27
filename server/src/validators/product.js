import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2),
  type: z.enum(["RAW_MATERIAL", "FINISHED_GOOD"]),
  unit: z.string().min(1),
  bom: z
    .array(
      z.object({
        rawMaterialId: z.string().min(1),
        quantityRequired: z.number().positive()
      })
    )
    .optional()
});

export const bomSchema = z.object({
  finishedProductId: z.string().min(1),
  rawMaterialId: z.string().min(1),
  quantityRequired: z.number().positive()
});
