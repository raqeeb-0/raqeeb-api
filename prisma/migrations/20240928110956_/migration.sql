-- CreateEnum
CREATE TYPE "PurchaseItemTypes" AS ENUM ('storable', 'service', 'consumable');

-- AlterTable
ALTER TABLE "purchase_items" ADD COLUMN     "type" "PurchaseItemTypes" NOT NULL DEFAULT 'storable';
