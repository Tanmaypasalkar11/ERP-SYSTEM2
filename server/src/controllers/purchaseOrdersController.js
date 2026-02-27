import { prisma } from "../config/prisma.js";
import { increaseInventory } from "../services/inventoryService.js";

export async function createPurchaseOrder(req, res, next) {
  try {
    const { vendorId, items } = req.body;

    const purchaseOrder = await prisma.$transaction(async (tx) => {
      const vendor = await tx.vendor.findUnique({ where: { id: vendorId } });
      if (!vendor) {
        throw Object.assign(new Error("Vendor not found"), { status: 404 });
      }

      const products = await tx.product.findMany({
        where: { id: { in: items.map((item) => item.productId) } }
      });

      if (products.length !== items.length) {
        throw Object.assign(new Error("One or more products not found"), { status: 404 });
      }

      const invalid = products.find((product) => product.type !== "RAW_MATERIAL");
      if (invalid) {
        throw Object.assign(new Error("Purchase orders must contain raw materials only"), { status: 400 });
      }

      return tx.purchaseOrder.create({
        data: {
          vendorId,
          status: "PENDING",
          items: {
            create: items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity
            }))
          }
        },
        include: { items: true, vendor: true }
      });
    });

    res.status(201).json(purchaseOrder);
  } catch (err) {
    next(err);
  }
}

export async function inwardPurchaseOrder(req, res, next) {
  try {
    const purchaseOrderId = req.params.id;

    const result = await prisma.$transaction(async (tx) => {
      const po = await tx.purchaseOrder.findUnique({
        where: { id: purchaseOrderId },
        include: { items: true }
      });

      if (!po) {
        throw Object.assign(new Error("Purchase order not found"), { status: 404 });
      }

      if (po.status === "RECEIVED") {
        throw Object.assign(new Error("Purchase order already received"), { status: 400 });
      }

      for (const item of po.items) {
        await increaseInventory(tx, item.productId, item.quantity);
      }

      return tx.purchaseOrder.update({
        where: { id: purchaseOrderId },
        data: { status: "RECEIVED" }
      });
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function listPurchaseOrders(req, res, next) {
  try {
    const orders = await prisma.purchaseOrder.findMany({
      include: { vendor: true, items: { include: { product: true } } },
      orderBy: { createdAt: "desc" }
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
}
