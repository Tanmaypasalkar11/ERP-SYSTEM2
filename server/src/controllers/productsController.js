import { prisma } from "../config/prisma.js";

export async function createProduct(req, res, next) {
  try {
    const { name, type, unit, bom } = req.body;

    const product = await prisma.$transaction(
      async (tx) => {
      const created = await tx.product.create({
        data: { name, type, unit }
      });

      await tx.inventory.create({
        data: { productId: created.id, quantity: 0 }
      });

      if (Array.isArray(bom) && bom.length > 0) {
        if (type !== "FINISHED_GOOD") {
          throw Object.assign(new Error("BOM is only allowed for finished goods"), { status: 400 });
        }

        const rawMaterials = await tx.product.findMany({
          where: { id: { in: bom.map((line) => line.rawMaterialId) } }
        });
        if (rawMaterials.length !== bom.length) {
          throw Object.assign(new Error("One or more BOM materials not found"), { status: 404 });
        }
        const invalid = rawMaterials.find((material) => material.type !== "RAW_MATERIAL");
        if (invalid) {
          throw Object.assign(new Error("BOM must reference raw materials"), { status: 400 });
        }

        await tx.billOfMaterial.createMany({
          data: bom.map((line) => ({
            finishedProductId: created.id,
            rawMaterialId: line.rawMaterialId,
            quantityRequired: line.quantityRequired
          })),
          skipDuplicates: true
        });
      }

        return created;
      },
      { timeout: 15000, maxWait: 5000 }
    );

    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
}

export async function listProducts(req, res, next) {
  try {
    const products = await prisma.product.findMany({
      include: { inventory: true },
      orderBy: { createdAt: "desc" }
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
}
