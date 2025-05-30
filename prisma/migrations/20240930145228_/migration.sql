/*
  Warnings:

  - Added the required column `organizationId` to the `inventory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "inventory" ADD COLUMN     "organizationId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
