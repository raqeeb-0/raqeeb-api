import { PrismaClient } from '@prisma/client';
import { matchedData } from 'express-validator';
import { CustomError } from '@lib/CustomError.js';


const prisma = new PrismaClient();

async function getAllProductCategories(req, res, next) {
  const { organizationId } = req;

  try {
    const categories = await prisma.productCategory.findMany({
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

async function getProductCategory(req, res, next) {
  const { organizationId } = req;
  const { categoryId } = matchedData(req);

  try {
    const category = await prisma.productCategory.findUnique({
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

async function createProductCategory(req, res, next) {
  const { organizationId } = req;
  const { name } = matchedData(req);

  try {
    const category = await prisma.productCategory.create({
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

async function updateProductCategory(req, res, next) {
  const { organizationId } = req;
  const {
    categoryId,
    name
  } = matchedData(req);

  try {
    const category = await prisma.productCategory.update({
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

async function deleteProductCategory(req, res, next) {
  const { organizationId } = req;
  const { categoryId } = matchedData(req);

  try {
    const category = await prisma.productCategory.delete({
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
  getAllProductCategories,
  getProductCategory,
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
}
