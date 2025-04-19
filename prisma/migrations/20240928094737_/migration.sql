/*
  Warnings:

  - You are about to drop the `bill_of_materials` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `expense_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `expense_purchases` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `expenses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `material_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `material_purchases` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `materials` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "bill_of_materials" DROP CONSTRAINT "bill_of_materials_materialId_fkey";

-- DropForeignKey
ALTER TABLE "bill_of_materials" DROP CONSTRAINT "bill_of_materials_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "bill_of_materials" DROP CONSTRAINT "bill_of_materials_productId_fkey";

-- DropForeignKey
ALTER TABLE "expense_categories" DROP CONSTRAINT "expense_categories_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "expense_purchases" DROP CONSTRAINT "expense_purchases_expenseId_fkey";

-- DropForeignKey
ALTER TABLE "expense_purchases" DROP CONSTRAINT "expense_purchases_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "expenses" DROP CONSTRAINT "expenses_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "expenses" DROP CONSTRAINT "expenses_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "material_categories" DROP CONSTRAINT "material_categories_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "material_purchases" DROP CONSTRAINT "material_purchases_materialId_fkey";

-- DropForeignKey
ALTER TABLE "material_purchases" DROP CONSTRAINT "material_purchases_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "materials" DROP CONSTRAINT "materials_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "materials" DROP CONSTRAINT "materials_organizationId_fkey";

-- DropTable
DROP TABLE "bill_of_materials";

-- DropTable
DROP TABLE "expense_categories";

-- DropTable
DROP TABLE "expense_purchases";

-- DropTable
DROP TABLE "expenses";

-- DropTable
DROP TABLE "material_categories";

-- DropTable
DROP TABLE "material_purchases";

-- DropTable
DROP TABLE "materials";

-- CreateTable
CREATE TABLE "purchases" (
    "id" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "purchaseItemId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "purchases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_items" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "notes" TEXT,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "purchase_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory" (
    "id" TEXT NOT NULL,
    "materialId" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL DEFAULT 0.00,

    CONSTRAINT "inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_bill_of_materials" (
    "materialId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "product_bill_of_materials_pkey" PRIMARY KEY ("materialId","productId")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "purchase_items_organizationId_name_key" ON "purchase_items"("organizationId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "inventory_materialId_key" ON "inventory"("materialId");

-- CreateIndex
CREATE UNIQUE INDEX "categories_organizationId_name_key" ON "categories"("organizationId", "name");

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_purchaseItemId_fkey" FOREIGN KEY ("purchaseItemId") REFERENCES "purchase_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_items" ADD CONSTRAINT "purchase_items_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_items" ADD CONSTRAINT "purchase_items_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "purchase_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_bill_of_materials" ADD CONSTRAINT "product_bill_of_materials_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "inventory"("materialId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_bill_of_materials" ADD CONSTRAINT "product_bill_of_materials_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_bill_of_materials" ADD CONSTRAINT "product_bill_of_materials_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
