/**
 * Seed script - safe to run multiple times (idempotent).
 * Creates demo users, vendor, customer, products, BOM, and sample data.
 *
 * Run: node prisma/seed.js
 */
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/index.js";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ─── Users ────────────────────────────────────────────────────────────────
  const users = [
    { name: "Admin User", email: "admin@erp.com", password: "admin123", role: "ADMIN" },
    { name: "Purchase Manager", email: "purchase@erp.com", password: "purchase123", role: "PURCHASE_MANAGER" },
    { name: "Production Manager", email: "production@erp.com", password: "production123", role: "PRODUCTION_MANAGER" },
    { name: "Sales Manager", email: "sales@erp.com", password: "sales123", role: "SALES_MANAGER" }
  ];

  for (const u of users) {
    const hashed = await bcrypt.hash(u.password, 10);
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: { name: u.name, email: u.email, password: hashed, role: u.role }
    });
  }
  console.log("  ✓ Users created");

  // ─── Vendor ───────────────────────────────────────────────────────────────
  let vendor = await prisma.vendor.findFirst({ where: { email: "steel@corp.com" } });
  if (!vendor) {
    vendor = await prisma.vendor.create({
      data: {
        name: "Steel Corp",
        phone: "9876543210",
        email: "steel@corp.com",
        address: "123 Industrial Area, Mumbai"
      }
    });
  }
  console.log("  ✓ Vendor created");

  // ─── Customer ─────────────────────────────────────────────────────────────
  let customer = await prisma.customer.findFirst({ where: { email: "procurement@apexmotors.com" } });
  if (!customer) {
    customer = await prisma.customer.create({
      data: {
        name: "Apex Motors",
        phone: "8765432109",
        email: "procurement@apexmotors.com",
        address: "456 Business Park, Delhi"
      }
    });
  }
  console.log("  ✓ Customer created");

  // ─── Products ─────────────────────────────────────────────────────────────
  const productDefs = [
    { name: "Steel Sheet", type: "RAW_MATERIAL", unit: "kg" },
    { name: "Rubber Gasket", type: "RAW_MATERIAL", unit: "pcs" },
    { name: "Bolt Set", type: "RAW_MATERIAL", unit: "pcs" },
    { name: "Engine Block", type: "FINISHED_GOOD", unit: "pcs" },
    { name: "Gear Assembly", type: "FINISHED_GOOD", unit: "pcs" }
  ];

  const productMap = {};
  for (const pd of productDefs) {
    let product = await prisma.product.findFirst({ where: { name: pd.name } });
    if (!product) {
      product = await prisma.product.create({ data: pd });
    }
    productMap[pd.name] = product;

    await prisma.inventory.upsert({
      where: { productId: product.id },
      update: { quantity: 50 },
      create: { productId: product.id, quantity: 50 }
    });
  }
  console.log("  ✓ Products + Inventory initialized");

  // ─── Bill of Materials ────────────────────────────────────────────────────
  const bomDefs = [
    { finishedName: "Engine Block", rawName: "Steel Sheet", qty: 50 },
    { finishedName: "Engine Block", rawName: "Rubber Gasket", qty: 10 },
    { finishedName: "Engine Block", rawName: "Bolt Set", qty: 20 },
    { finishedName: "Gear Assembly", rawName: "Steel Sheet", qty: 30 },
    { finishedName: "Gear Assembly", rawName: "Bolt Set", qty: 5 }
  ];

  for (const b of bomDefs) {
    const exists = await prisma.billOfMaterial.findFirst({
      where: {
        finishedProductId: productMap[b.finishedName].id,
        rawMaterialId: productMap[b.rawName].id
      }
    });
    if (!exists) {
      await prisma.billOfMaterial.create({
        data: {
          finishedProductId: productMap[b.finishedName].id,
          rawMaterialId: productMap[b.rawName].id,
          quantityRequired: b.qty
        }
      });
    }
  }
  console.log("  ✓ Bill of Materials created");

  // ─── Sample Purchase Order (PENDING) ──────────────────────────────────────
  const existingPO = await prisma.purchaseOrder.findFirst({
    where: { vendorId: vendor.id, status: "PENDING" }
  });
  if (!existingPO) {
    await prisma.purchaseOrder.create({
      data: {
        vendorId: vendor.id,
        items: {
          create: [
            { productId: productMap["Steel Sheet"].id, quantity: 500 },
            { productId: productMap["Rubber Gasket"].id, quantity: 200 },
            { productId: productMap["Bolt Set"].id, quantity: 400 }
          ]
        }
      }
    });
    console.log("  ✓ Sample pending Purchase Order created");
  }

  // ─── Sample Customer Order (PENDING) ──────────────────────────────────────
  const existingCO = await prisma.customerOrder.findFirst({
    where: { customerId: customer.id, status: "PENDING" }
  });
  if (!existingCO) {
    await prisma.customerOrder.create({
      data: {
        customerId: customer.id,
        items: {
          create: [{ productId: productMap["Engine Block"].id, quantity: 2 }]
        }
      }
    });
    console.log("  ✓ Sample pending Customer Order created");
  }

  console.log("\n✅ Seed complete!\n");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("📋 Login credentials:");
  console.log("  Admin:       admin@erp.com       / admin123");
  console.log("  Purchase:    purchase@erp.com     / purchase123");
  console.log("  Production:  production@erp.com   / production123");
  console.log("  Sales:       sales@erp.com        / sales123");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("\n🔄 Suggested test workflow:");
  console.log("  1. Purchase Manager → Inward the sample PO  (fills raw material inventory)");
  console.log("  2. Production Manager → Run a Production batch  (deducts raw, adds finished)");
  console.log("  3. Sales Manager → Complete the sample Customer Order  (deducts finished)");
  console.log("  4. Any role → Reports to verify all inventory movements\n");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
