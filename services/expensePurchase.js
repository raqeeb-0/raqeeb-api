import { PrismaClient } from '@prisma/client';
import { matchedData } from 'express-validator';
import { CustomError } from '@lib/CustomError.js';


const prisma = new PrismaClient();

async function getAllExpensePurchases(req, res, next) {
  const { organizationId } = matchedData(req);

  try {
    const expensePurchases = await prisma.expensePurchase.findMany({
      where: { organizationId },
      select: {
        id: true,
        expense: {
          select: {
            name: true,
          },
        },
        price: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.status(200).json(expensePurchases);
  } catch (err) {
    return next(err);
  }
}

async function getExpensePurchase(req, res, next) {
  const { organizationId, expensePurchaseId } = matchedData(req);

  try {
    const expensePurchase = await prisma.expensePurchase.findUnique({
      where: {
        organizationId,
        id: expensePurchaseId,
      },
      select: {
        id: true,
        expense: {
          select: {
            id: true,
            name: true,
          },
        },
        price: true,
        supplier: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
      },
    });
    if (!expensePurchase) {
      throw new CustomError({
        statusCode: 404
      });
    }

    return res.status(200).json(expensePurchase);
  } catch (err) {
    return next(err);
  }
}

async function createExpensePurchase(req, res, next) {
  const {
    expenseId,
    supplierId,
    price,
    organizationId
  } = matchedData(req);

  try {
    const expensePurchase = await prisma.expensePurchase.create({
      data: {
        price,
        expense: {
          connect: {
            id: expenseId,
          },
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
        price: true,
        expenseId: true,
        supplierId: true,
        createdAt: true,
      },
    });

    return res.status(201).json(expensePurchase);
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

async function updateExpensePurchase(req, res, next) {
  const {
    expensePurchaseId,
    expenseId,
    price,
    supplierId,
    organizationId
  } = matchedData(req);

  try {
    const expensePurchase = await prisma.expensePurchase.update({
      where: {
        organizationId,
        id: expensePurchaseId,
      },
      data: {
        price,
        expense: {
          connect: {
            id: expenseId,
          },
        },
        supplier: {
          connect: {
            id: supplierId,
          },
        },
      },
      select: {
        id: true,
        price: true,
        expenseId: true,
        supplierId: true,
        createdAt: true,
      },
    });

    return res.status(200).json(expensePurchase);
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

async function deleteExpensePurchase(req, res, next) {
  const { organizationId, expensePurchaseId } = matchedData(req);

  try {
    const expensePurchase = await prisma.expensePurchase.delete({
      where: {
        organizationId,
        id: expensePurchaseId,
      },
      select: {
        id: true,
        price: true,
        expenseId: true,
        supplierId: true,
        createdAt: true,
      },
    });

    return res.status(200).json(expensePurchase);
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
  getAllExpensePurchases,
  getExpensePurchase,
  createExpensePurchase,
  updateExpensePurchase,
  deleteExpensePurchase,
}
