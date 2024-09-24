import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { matchedData } from 'express-validator';
import { CustomError } from '@lib/CustomError.js';


const prisma = new PrismaClient();

async function getAllExpenseCategories(req, res, next) {
  const { organizationId } = matchedData(req);

  try {
    const categories = await prisma.expenseCategory.findMany({
      where: { organizationId },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.status(200).json(categories);
  } catch (err) {
    return next(err);
  }
}

async function getExpenseCategory(req, res, next) {
  const { organizationId, categoryId } = matchedData(req);

  try {
    const category = await prisma.expenseCategory.findUnique({
      where: {
        organizationId,
        id: categoryId,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    });
    if (!category) {
      throw new CustomError({
        statusCode: 404
      });
    }

    return res.status(200).json(category);
  } catch (err) {
    return next(err);
  }
}

async function createExpenseCategory(req, res, next) {
  const {
    name,
    organizationId
  } = matchedData(req);

  try {
    const category = await prisma.expenseCategory.create({
      data: {
        name,
        organization: {
          connect: {
            id: organizationId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    });

    return res.status(201).json(category);
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

async function updateExpenseCategory(req, res, next) {
  const {
    categoryId,
    name,
    organizationId
  } = matchedData(req);

  try {
    const category = await prisma.expenseCategory.update({
      where: {
        organizationId,
        id: categoryId,
      },
      data: {
        name,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    });

    return res.status(200).json(category);
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

async function deleteExpenseCategory(req, res, next) {
  const { organizationId, categoryId } = matchedData(req);

  try {
    const category = await prisma.expenseCategory.delete({
      where: {
        organizationId,
        id: categoryId,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    });

    return res.status(200).json(category);
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
  getAllExpenseCategories,
  getExpenseCategory,
  createExpenseCategory,
  updateExpenseCategory,
  deleteExpenseCategory,
}
