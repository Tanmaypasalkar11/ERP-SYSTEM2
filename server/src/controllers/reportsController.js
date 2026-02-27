import { prisma } from "../config/prisma.js";

export async function ordersReport(req, res, next) {
  try {
    const statusCounts = await prisma.customerOrder.groupBy({
      by: ["status"],
      _count: { status: true }
    });
    const latest = await prisma.customerOrder.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { customer: true }
    });
    res.json({ statusCounts, latest });
  } catch (err) {
    next(err);
  }
}

export async function inventoryReport(req, res, next) {
  try {
    const inventory = await prisma.inventory.findMany({ include: { product: true } });
    const lowStock = inventory.filter((item) => item.quantity < 50);
    res.json({ totalItems: inventory.length, lowStock });
  } catch (err) {
    next(err);
  }
}

export async function productionReport(req, res, next) {
  try {
    const count = await prisma.production.count();
    const recent = await prisma.production.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { finishedProduct: true }
    });
    res.json({ totalBatches: count, recent });
  } catch (err) {
    next(err);
  }
}
