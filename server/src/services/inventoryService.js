import { prisma } from "../config/prisma.js";

export async function ensureInventory(tx, productId) {
  const existing = await tx.inventory.findUnique({ where: { productId } });
  if (existing) return existing;
  return tx.inventory.create({ data: { productId, quantity: 0 } });
}

export async function increaseInventory(tx, productId, quantity) {
  await ensureInventory(tx, productId);
  return tx.inventory.update({
    where: { productId },
    data: { quantity: { increment: quantity } }
  });
}

export async function decreaseInventory(tx, productId, quantity) {
  await ensureInventory(tx, productId);
  const inventory = await tx.inventory.findUnique({ where: { productId } });
  if (!inventory || inventory.quantity < quantity) {
    throw Object.assign(new Error("Insufficient inventory"), { status: 400 });
  }
  return tx.inventory.update({
    where: { productId },
    data: { quantity: { decrement: quantity } }
  });
}
