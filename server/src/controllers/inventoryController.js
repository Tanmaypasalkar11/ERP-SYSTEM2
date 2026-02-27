import { prisma } from "../config/prisma.js";

export async function listInventory(req, res, next) {
  try {
    const inventory = await prisma.inventory.findMany({
      include: { product: true },
      orderBy: { updatedAt: "desc" }
    });
    res.json(inventory);
  } catch (err) {
    next(err);
  }
}
