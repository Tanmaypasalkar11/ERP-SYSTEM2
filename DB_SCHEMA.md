# Streleam ERP Database Schema (Prisma)

Core tables:
- `User` (role-based access + auth)
- `Customer`
- `Vendor`
- `Product` (RAW_MATERIAL / FINISHED_GOOD)
- `Inventory`
- `BillOfMaterial`
- `PurchaseOrder` + `PurchaseOrderItem`
- `Production`
- `CustomerOrder` + `CustomerOrderItem`

Business rules:
- Purchase Order inward increases RAW_MATERIAL inventory.
- Production deducts RAW_MATERIAL based on BOM and increases FINISHED_GOOD inventory.
- Completing Customer Order deducts FINISHED_GOOD inventory.
- Operations are blocked if inventory is insufficient.

Schema file: `server/prisma/schema.prisma`
