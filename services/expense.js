import { PrismaClient } from '@prisma/client';
import { matchedData } from 'express-validator';
import { CustomError } from '@lib/CustomError.js';


const prisma = new PrismaClient();

async function getAllExpenses(req, res, next) {
  const { organizationId } = matchedData(req);
  try {
    const expenses = await prisma.expense.findMany({
      where: { organizationId },
      select: {
        id: true,
        name: true,
        price: true,
        notes: true,
        createdAt: true,
        category: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.status(200).json(expenses);
  } catch (err) {
    return next(err);
  }
}

async function getExpense(req, res, next) {
  const { organizationId, expenseId } = matchedData(req);

  try {
    const expense = await prisma.expense.findUnique({
      where: {
        organizationId,
        id: expenseId,
      },
      select: {
        id: true,
        name: true,
        price: true,
        notes: true,
        createdAt: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!expense) {
      throw new CustomError({
        statusCode: 404
      });
    }

    return res.status(200).json(expense);
  } catch (err) {
    return next(err);
  }
}

async function createExpense(req, res, next) {
  const {
    name,
    price,
    notes,
    categoryId,
    organizationId
  } = matchedData(req);

  try {
    const expense = await prisma.expense.create({
      data: {
        name,
        price,
        notes,
        category: {
          connect: {
            id: categoryId,
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
        name: true,
        price: true,
        notes: true,
        createdAt: true,
        categoryId: true,
      },
    });

    return res.status(201).json(expense);
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

async function updateExpense(req, res, next) {
  const {
    expenseId,
    name,
    price,
    notes,
    categoryId,
    organizationId
  } = matchedData(req);

  try {
    const expense = await prisma.expense.update({
      where: {
        organizationId,
        id: expenseId,
      },
      data: {
        name,
        price,
        notes,
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        price: true,
        notes: true,
        createdAt: true,
        categoryId: true,
      },
    });

    return res.status(200).json(expense);
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

async function deleteExpense(req, res, next) {
  const { organizationId, expenseId } = matchedData(req);

  try {
    const expense = await prisma.expense.delete({
      where: {
        organizationId,
        id: expenseId,
      },
      select: {
        id: true,
        name: true,
        price: true,
        notes: true,
        createdAt: true,
        categoryId: true,
      },
    });

    return res.status(200).json(expense);
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
  getAllExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
}
