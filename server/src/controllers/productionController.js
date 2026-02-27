import { prisma } from "../config/prisma.js";
import { decreaseInventory, increaseInventory } from "../services/inventoryService.js";

export async function createProduction(req, res, next) {
  try {
    const { finishedProductId, quantityProduced } = req.body;

    const result = await prisma.$transaction(
      async (tx) => {
      const product = await tx.product.findUnique({ where: { id: finishedProductId } });
      if (!product || product.type !== "FINISHED_GOOD") {
        throw Object.assign(new Error("Finished product not found"), { status: 404 });
      }

      const bomLines = await tx.billOfMaterial.findMany({
        where: { finishedProductId },
        include: { rawMaterial: true }
      });

      if (bomLines.length === 0) {
        throw Object.assign(new Error("BOM not defined for this product"), { status: 400 });
      }

      for (const line of bomLines) {
        if (line.rawMaterial.type !== "RAW_MATERIAL") {
          throw Object.assign(new Error("BOM raw material invalid"), { status: 400 });
        }
        const requiredQty = line.quantityRequired * quantityProduced;
        await decreaseInventory(tx, line.rawMaterialId, requiredQty);
      }

      await increaseInventory(tx, finishedProductId, quantityProduced);

        return tx.production.create({
        data: {
          finishedProductId,
          quantityProduced
        }
        });
      },
      { timeout: 15000, maxWait: 5000 }
    );

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}
