/*
  Warnings:

  - The values [MANAGER,STORE,PRODUCTION,SALES] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `updatedAt` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `dueDate` on the `CustomerOrder` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `CustomerOrder` table. All the data in the column will be lost.
  - You are about to drop the column `orderCode` on the `CustomerOrder` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `CustomerOrder` table. All the data in the column will be lost.
  - The `status` column on the `CustomerOrder` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `itemId` on the `CustomerOrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `CustomerOrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `itemId` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `onHand` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `reserved` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `expectedAt` on the `PurchaseOrder` table. All the data in the column will be lost.
  - You are about to drop the column `poCode` on the `PurchaseOrder` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `PurchaseOrder` table. All the data in the column will be lost.
  - The `status` column on the `PurchaseOrder` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `itemId` on the `PurchaseOrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `PurchaseOrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the `Dispatch` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DispatchItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InwardItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InwardReceipt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductionBatch` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductionInput` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductionOutput` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StockMovement` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[productId]` on the table `Inventory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customerOrderId` to the `CustomerOrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `CustomerOrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `PurchaseOrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purchaseOrderId` to the `PurchaseOrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('RAW_MATERIAL', 'FINISHED_GOOD');

-- CreateEnum
CREATE TYPE "PurchaseOrderStatus" AS ENUM ('PENDING', 'RECEIVED');

-- CreateEnum
CREATE TYPE "CustomerOrderStatus" AS ENUM ('PENDING', 'COMPLETED');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'PURCHASE_MANAGER', 'PRODUCTION_MANAGER', 'SALES_MANAGER');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'ADMIN';
COMMIT;

-- DropForeignKey
ALTER TABLE "CustomerOrderItem" DROP CONSTRAINT "CustomerOrderItem_itemId_fkey";

-- DropForeignKey
ALTER TABLE "CustomerOrderItem" DROP CONSTRAINT "CustomerOrderItem_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Dispatch" DROP CONSTRAINT "Dispatch_orderId_fkey";

-- DropForeignKey
ALTER TABLE "DispatchItem" DROP CONSTRAINT "DispatchItem_dispatchId_fkey";

-- DropForeignKey
ALTER TABLE "DispatchItem" DROP CONSTRAINT "DispatchItem_itemId_fkey";

-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_itemId_fkey";

-- DropForeignKey
ALTER TABLE "InwardItem" DROP CONSTRAINT "InwardItem_itemId_fkey";

-- DropForeignKey
ALTER TABLE "InwardItem" DROP CONSTRAINT "InwardItem_receiptId_fkey";

-- DropForeignKey
ALTER TABLE "InwardReceipt" DROP CONSTRAINT "InwardReceipt_purchaseOrderId_fkey";

-- DropForeignKey
ALTER TABLE "ProductionBatch" DROP CONSTRAINT "ProductionBatch_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductionInput" DROP CONSTRAINT "ProductionInput_batchId_fkey";

-- DropForeignKey
ALTER TABLE "ProductionInput" DROP CONSTRAINT "ProductionInput_itemId_fkey";

-- DropForeignKey
ALTER TABLE "ProductionOutput" DROP CONSTRAINT "ProductionOutput_batchId_fkey";

-- DropForeignKey
ALTER TABLE "ProductionOutput" DROP CONSTRAINT "ProductionOutput_itemId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseOrderItem" DROP CONSTRAINT "PurchaseOrderItem_itemId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseOrderItem" DROP CONSTRAINT "PurchaseOrderItem_orderId_fkey";

-- DropForeignKey
ALTER TABLE "StockMovement" DROP CONSTRAINT "StockMovement_itemId_fkey";

-- DropIndex
DROP INDEX "Customer_name_key";

-- DropIndex
DROP INDEX "CustomerOrder_orderCode_key";

-- DropIndex
DROP INDEX "Inventory_itemId_key";

-- DropIndex
DROP INDEX "PurchaseOrder_poCode_key";

-- DropIndex
DROP INDEX "Vendor_name_key";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "CustomerOrder" DROP COLUMN "dueDate",
DROP COLUMN "notes",
DROP COLUMN "orderCode",
DROP COLUMN "updatedAt",
DROP COLUMN "status",
ADD COLUMN     "status" "CustomerOrderStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "CustomerOrderItem" DROP COLUMN "itemId",
DROP COLUMN "orderId",
ADD COLUMN     "customerOrderId" TEXT NOT NULL,
ADD COLUMN     "productId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "itemId",
DROP COLUMN "onHand",
DROP COLUMN "reserved",
ADD COLUMN     "productId" TEXT NOT NULL,
ADD COLUMN     "quantity" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "PurchaseOrder" DROP COLUMN "expectedAt",
DROP COLUMN "poCode",
DROP COLUMN "updatedAt",
DROP COLUMN "status",
ADD COLUMN     "status" "PurchaseOrderStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "PurchaseOrderItem" DROP COLUMN "itemId",
DROP COLUMN "orderId",
ADD COLUMN     "productId" TEXT NOT NULL,
ADD COLUMN     "purchaseOrderId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "updatedAt",
ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'ADMIN';

-- AlterTable
ALTER TABLE "Vendor" DROP COLUMN "updatedAt";

-- DropTable
DROP TABLE "Dispatch";

-- DropTable
DROP TABLE "DispatchItem";

-- DropTable
DROP TABLE "InwardItem";

-- DropTable
DROP TABLE "InwardReceipt";

-- DropTable
DROP TABLE "Item";

-- DropTable
DROP TABLE "ProductionBatch";

-- DropTable
DROP TABLE "ProductionInput";

-- DropTable
DROP TABLE "ProductionOutput";

-- DropTable
DROP TABLE "StockMovement";

-- DropEnum
DROP TYPE "DispatchStatus";

-- DropEnum
DROP TYPE "ItemType";

-- DropEnum
DROP TYPE "MovementType";

-- DropEnum
DROP TYPE "OrderStatus";

-- DropEnum
DROP TYPE "ProductionStatus";

-- DropEnum
DROP TYPE "PurchaseStatus";

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ProductType" NOT NULL,
    "unit" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BillOfMaterial" (
    "id" TEXT NOT NULL,
    "finishedProductId" TEXT NOT NULL,
    "rawMaterialId" TEXT NOT NULL,
    "quantityRequired" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "BillOfMaterial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Production" (
    "id" TEXT NOT NULL,
    "finishedProductId" TEXT NOT NULL,
    "quantityProduced" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Production_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BillOfMaterial_finishedProductId_rawMaterialId_key" ON "BillOfMaterial"("finishedProductId", "rawMaterialId");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_productId_key" ON "Inventory"("productId");

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillOfMaterial" ADD CONSTRAINT "BillOfMaterial_finishedProductId_fkey" FOREIGN KEY ("finishedProductId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillOfMaterial" ADD CONSTRAINT "BillOfMaterial_rawMaterialId_fkey" FOREIGN KEY ("rawMaterialId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrderItem" ADD CONSTRAINT "PurchaseOrderItem_purchaseOrderId_fkey" FOREIGN KEY ("purchaseOrderId") REFERENCES "PurchaseOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrderItem" ADD CONSTRAINT "PurchaseOrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Production" ADD CONSTRAINT "Production_finishedProductId_fkey" FOREIGN KEY ("finishedProductId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerOrderItem" ADD CONSTRAINT "CustomerOrderItem_customerOrderId_fkey" FOREIGN KEY ("customerOrderId") REFERENCES "CustomerOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerOrderItem" ADD CONSTRAINT "CustomerOrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
