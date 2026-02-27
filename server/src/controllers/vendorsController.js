import { prisma } from "../config/prisma.js";

export async function createVendor(req, res, next) {
  try {
    const vendor = await prisma.vendor.create({ data: req.body });
    res.status(201).json(vendor);
  } catch (err) {
    next(err);
  }
}

export async function listVendors(req, res, next) {
  try {
    const vendors = await prisma.vendor.findMany({ orderBy: { createdAt: "desc" } });
    res.json(vendors);
  } catch (err) {
    next(err);
  }
}
