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

async function getInvoice(req, res, next) {
  const { organizationId, invoiceId } = matchedData(req);

  try {
    const invoice = await prisma.invoice.findUnique({
      where: {
        organizationId,
        id: invoiceId,
      },
      select: {
        invoiceNumber: true,
        totalAmount: true,
        effectiveDate: true,
        createdAt: true,
        supplier: {
          select: {
            name: true,
          },
        },
        purchaseItems: true,
      },
    });
    if (!invoice) {
      throw new CustomError({
        statusCode: 404
      });
    }

    return res.status(200).json(invoice);
  } catch (err) {
    return next(err);
  }
}

async function createInvoice(req, res, next) {
  const {
    invoiceNumber,
    effectiveDate,
    totalAmount,
    purchaseItems,
    supplierId,
    organizationId
  } = matchedData(req);

  if (purchaseItems.length === 0) {
    return next(
      new CustomError({
        statusCode: 400,
        message: 'Purchase Items list should be not empty'
      })
    );
  }

  try {
    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber,
        effectiveDate,
        totalAmount,
        purchaseItems: {
          create: purchaseItems.map((item) => {
            return {
              purchaseItem: {
                connect: {
                  id: item.id,
                },
              },
              description: item.description,
              quantity: item.quantity,
              price: item.price,
              amount: item.amount,
              organization: {
                connect: {
                  id: organizationId,
                },
              },
            };
          }),
        },
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
        supplierId: true,
        purchaseItems: true,
      },
    });

    return res.status(201).json(invoice);
  } catch (err) {

    if (err.code === 'P2025') {
      return next(
        new CustomError({
          statusCode: 404,
          message: `${err.meta.cause.split("'")[1]} not found`
        })
      );
    }

    return next(err);
  }
}


export {
  getAllInvoices,
  getInvoice,
  createInvoice,
}
