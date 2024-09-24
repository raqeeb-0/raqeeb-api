import { PrismaClient } from '@prisma/client';
import { matchedData } from 'express-validator';
import { CustomError } from '@lib/CustomError.js';


const prisma = new PrismaClient();

async function getAllSales(req, res, next) {
  const { organizationId } = matchedData(req);

  try {
    const sales = await prisma.sale.findMany({
      where: { organizationId },
      select: {
        id: true,
        product: {
          select: {
            name: true,
          },
        },
        quantity: true,
        price: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.status(200).json(sales);
  } catch (err) {
    return next(err);
  }
}

async function getSale(req, res, next) {
  const { organizationId, saleId } = matchedData(req);

  try {
    const sale = await prisma.sale.findUnique({
      where: {
        organizationId,
        id: saleId,
      },
      select: {
        id: true,
        product: {
          select: {
            id: true,
            name: true,
          },
        },
        quantity: true,
        price: true,
        customer: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
      },
    });
    if (!sale) {
      throw new CustomError({
        statusCode: 404
      });
    }

    return res.status(200).json(sale);
  } catch (err) {
    return next(err);
  }
}

async function createSale(req, res, next) {
  const {
    productId,
    customerId,
    quantity,
    price,
    organizationId
  } = matchedData(req);

  try {
    const sale = await prisma.sale.create({
      data: {
        quantity,
        price,
        product: {
          connect: {
            id: productId,
          },
        },
        customer: {
          connect: {
            id: customerId,
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
        quantity: true,
        price: true,
        productId: true,
        customerId: true,
        createdAt: true,
      },
    });

    return res.status(201).json(sale);
  } catch (err) {
    if (err.code === 'P2002') {
      return next(new CustomError({
        statusCode: 409,
        message: 'Name already taken'
      }));
    }
    return next(err);
  }
}

async function updateSale(req, res, next) {
  const {
    saleId,
    productId,
    quantity,
    price,
    customerId,
    organizationId
  } = matchedData(req);

  try {
    const sale = await prisma.sale.update({
      where: {
        organizationId,
        id: saleId,
      },
      data: {
        quantity,
        price,
        product: {
          connect: {
            id: productId,
          },
        },
        customer: {
          connect: {
            id: customerId,
          },
        },
      },
      select: {
        id: true,
        quantity: true,
        price: true,
        productId: true,
        customerId: true,
        createdAt: true,
      },
    });

    return res.status(200).json(sale);
  } catch (err) {
    if (err.code === 'P2002') {
      return next(new CustomError({
        statusCode: 409,
        message: 'Name already taken'
      }));
    }
    if (err.code === 'P2025') {
      return next(new CustomError({
        statusCode: 404,
      }));
    }
    return next(err);
  }
}

async function deleteSale(req, res, next) {
  const { organizationId, saleId } = matchedData(req);

  try {
    const sale = await prisma.sale.delete({
      where: {
        organizationId,
        id: saleId,
      },
      select: {
        id: true,
        quantity: true,
        price: true,
        productId: true,
        customerId: true,
        createdAt: true,
      },
    });

    return res.status(200).json(sale);
  } catch (err) {
    if (err.code === 'P2025') {
      return next(new CustomError({
        statusCode: 404,
      }));
    }
    return next(err);
  }
}


export {
  getAllSales,
  getSale,
  createSale,
  updateSale,
  deleteSale,
}
