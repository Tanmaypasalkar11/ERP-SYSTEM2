import { prisma } from "../config/prisma.js";

export async function createCustomer(req, res, next) {
  try {
    const customer = await prisma.customer.create({ data: req.body });
    res.status(201).json(customer);
  } catch (err) {
    next(err);
  }
}

export async function listCustomers(req, res, next) {
  try {
    const customers = await prisma.customer.findMany({ orderBy: { createdAt: "desc" } });
    res.json(customers);
  } catch (err) {
    next(err);
  }
}
