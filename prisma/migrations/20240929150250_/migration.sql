/*
  Warnings:

  - Added the required column `invoiceId` to the `purchases` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "purchases" ADD COLUMN     "invoiceId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
