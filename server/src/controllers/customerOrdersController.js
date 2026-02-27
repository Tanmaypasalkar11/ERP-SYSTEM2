import { prisma } from "../config/prisma.js";
import { decreaseInventory } from "../services/inventoryService.js";

export async function createCustomerOrder(req, res, next) {
  try {
    const { customerId, items } = req.body;

    const order = await prisma.$transaction(async (tx) => {
      const customer = await tx.customer.findUnique({ where: { id: customerId } });
      if (!customer) {
        throw Object.assign(new Error("Customer not found"), { status: 404 });
      }

      const products = await tx.product.findMany({
        where: { id: { in: items.map((item) => item.productId) } }
      });
      if (products.length !== items.length) {
        throw Object.assign(new Error("One or more products not found"), { status: 404 });
      }
      const invalid = products.find((product) => product.type !== "FINISHED_GOOD");
      if (invalid) {
        throw Object.assign(new Error("Customer orders must contain finished goods only"), { status: 400 });
      }

      return tx.customerOrder.create({
        data: {
          customerId,
          status: "PENDING",
          items: {
            create: items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity
            }))
          }
        },
        include: { items: true, customer: true }
      });
    });

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
}

export async function listCustomerOrders(req, res, next) {
  try {
    const orders = await prisma.customerOrder.findMany({
      include: { customer: true, items: { include: { product: true } } },
      orderBy: { createdAt: "desc" }
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
}

export async function completeCustomerOrder(req, res, next) {
  try {
    const orderId = req.params.id;

    const result = await prisma.$transaction(async (tx) => {
      const order = await tx.customerOrder.findUnique({
        where: { id: orderId },
        include: { items: true }
      });

      if (!order) {
        throw Object.assign(new Error("Customer order not found"), { status: 404 });
      }

      if (order.status === "COMPLETED") {
        throw Object.assign(new Error("Order already completed"), { status: 400 });
      }

      for (const item of order.items) {
        await decreaseInventory(tx, item.productId, item.quantity);
      }

      return tx.customerOrder.update({
        where: { id: orderId },
        data: { status: "COMPLETED" }
      });
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
}
