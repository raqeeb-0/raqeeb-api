/*
  Warnings:

  - You are about to drop the column `purchaseType` on the `expense_purchases` table. All the data in the column will be lost.
  - You are about to drop the column `supplierId` on the `expense_purchases` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `material_purchases` table. All the data in the column will be lost.
  - You are about to drop the column `purchaseType` on the `material_purchases` table. All the data in the column will be lost.
  - You are about to drop the column `supplierId` on the `material_purchases` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "expense_purchases" DROP CONSTRAINT "expense_purchases_supplierId_fkey";

-- DropForeignKey
ALTER TABLE "material_purchases" DROP CONSTRAINT "material_purchases_supplierId_fkey";

-- AlterTable
ALTER TABLE "expense_purchases" DROP COLUMN "purchaseType",
DROP COLUMN "supplierId";

-- AlterTable
ALTER TABLE "material_purchases" DROP COLUMN "createdAt",
DROP COLUMN "purchaseType",
DROP COLUMN "supplierId";

-- DropEnum
DROP TYPE "PurchaseType";

-- CreateTable
CREATE TABLE "invoices" (
    "id" TEXT NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "effectiveDate" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "supplierId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
