/*
  Warnings:

  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `customers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `inventory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `invoices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `organizations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_bill_of_materials` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `production_orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `purchase_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `purchases` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sales` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `staff` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `suppliers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "customers" DROP CONSTRAINT "customers_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "inventory" DROP CONSTRAINT "inventory_materialId_fkey";

-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_supplierId_fkey";

-- DropForeignKey
ALTER TABLE "organizations" DROP CONSTRAINT "organizations_userId_fkey";

-- DropForeignKey
ALTER TABLE "product_bill_of_materials" DROP CONSTRAINT "product_bill_of_materials_materialId_fkey";

-- DropForeignKey
ALTER TABLE "product_bill_of_materials" DROP CONSTRAINT "product_bill_of_materials_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "product_bill_of_materials" DROP CONSTRAINT "product_bill_of_materials_productId_fkey";

-- DropForeignKey
ALTER TABLE "product_categories" DROP CONSTRAINT "product_categories_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "production_orders" DROP CONSTRAINT "production_orders_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "production_orders" DROP CONSTRAINT "production_orders_productId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "purchase_items" DROP CONSTRAINT "purchase_items_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "purchase_items" DROP CONSTRAINT "purchase_items_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "purchases" DROP CONSTRAINT "purchases_invoiceId_fkey";

-- DropForeignKey
ALTER TABLE "purchases" DROP CONSTRAINT "purchases_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "purchases" DROP CONSTRAINT "purchases_purchaseItemId_fkey";

-- DropForeignKey
ALTER TABLE "sales" DROP CONSTRAINT "sales_customerId_fkey";

-- DropForeignKey
ALTER TABLE "sales" DROP CONSTRAINT "sales_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "sales" DROP CONSTRAINT "sales_productId_fkey";

-- DropForeignKey
ALTER TABLE "staff" DROP CONSTRAINT "staff_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "suppliers" DROP CONSTRAINT "suppliers_organizationId_fkey";

-- DropTable
DROP TABLE "categories";

-- DropTable
DROP TABLE "customers";

-- DropTable
DROP TABLE "inventory";

-- DropTable
DROP TABLE "invoices";

-- DropTable
DROP TABLE "organizations";

-- DropTable
DROP TABLE "product_bill_of_materials";

-- DropTable
DROP TABLE "product_categories";

-- DropTable
DROP TABLE "production_orders";

-- DropTable
DROP TABLE "products";

-- DropTable
DROP TABLE "purchase_items";

-- DropTable
DROP TABLE "purchases";

-- DropTable
DROP TABLE "sales";

-- DropTable
DROP TABLE "staff";

-- DropTable
DROP TABLE "suppliers";

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "PurchaseItemTypes";

-- DropEnum
DROP TYPE "Status";
