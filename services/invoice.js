import { PrismaClient } from '@prisma/client';
import { matchedData } from 'express-validator';
import { CustomError } from '@lib/CustomError.js';


const prisma = new PrismaClient();

async function getAllInvoices(req, res, next) {
  const { organizationId } = matchedData(req);

  try {
    const invoices = await prisma.invoice.findMany({
      where: { organizationId },
      select: {
        id: true,
        invoiceNumber: true,
        effectiveDate: true,
        totalAmount: true,
        createdAt: true,
        supplier: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.status(200).json(invoices);
  } catch (err) {
    return next(err);
  }
}

async function createInvoice(req, res, next) {
  const {
    effectiveDate,
    invoiceNumber,
    supplierId,
    totalAmount,
    organizationId
  } = matchedData(req);

  try {
    const invoice = await prisma.invoice.create({
      data: {
        effectiveDate,
        invoiceNumber,
        totalAmount,
        supplier: {
          connect: {
            id: supplierId,
          },
        },
        organization: {
          connect: {
            id: organizationId,
          },
        },
      },
      select: {
        id: true,
        effectiveDate: true,
        invoiceNumber: true,
        totalAmount: true,
      },
    });

    return res.status(201).json(invoice);
  } catch (err) {
    return next(err);
  }
}


export {
  getAllInvoices,
  createInvoice,
}
