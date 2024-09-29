import { PrismaClient } from '@prisma/client';
import { matchedData } from 'express-validator';
import { CustomError } from '@lib/CustomError.js';


const prisma = new PrismaClient();

async function getAllProductionOrders(req, res, next) {
  const { organizationId } = matchedData(req);

  try {
    const productionOrders = await prisma.productionOrder.findMany({
      where: { organizationId },
      select: {
        id: true,
        product: {
          select: {
            name: true,
          },
        },
        count: true,
        status: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.status(200).json(productionOrders);
  } catch (err) {
    return next(err);
  }
}

async function getProductionOrder(req, res, next) {
  const { organizationId, productionOrderId } = matchedData(req);

  try {
    const productionOrder = await prisma.productionOrder.findUnique({
      where: {
        organizationId,
        id: productionOrderId,
      },
      select: {
        id: true,
        product: {
          select: {
            id: true,
            name: true,
          },
        },
        count: true,
        status: true,
        createdAt: true,
      },
    });
    if (!productionOrder) {
      throw new CustomError({
        statusCode: 404
      });
    }

    return res.status(200).json(productionOrder);
  } catch (err) {
    return next(err);
  }
}

async function createProductionOrder(req, res, next) {
  const {
    count,
    productId,
    organizationId
  } = matchedData(req);

  try {
    const productionOrder = await prisma.productionOrder.create({
      data: {
        count,
        product: {
          connect: {
            id: productId,
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
        count: true,
        status: true,
        productId: true,
        createdAt: true,
      },
    });

    return res.status(201).json(productionOrder);
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

async function updateProductionOrder(req, res, next) {
  const {
    productionOrderId,
    status,
    organizationId
  } = matchedData(req);

  try {
    const productionOrder = await prisma.productionOrder.update({
      where: {
        organizationId,
        id: productionOrderId,
      },
      data: {
        status,
      },
      select: {
        id: true,
        count: true,
        status: true,
        productId: true,
        createdAt: true,
      },
    });

    return res.status(200).json(productionOrder);
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

async function deleteProductionOrder(req, res, next) {
  const { organizationId, productionOrderId } = matchedData(req);

  try {
    const productionOrder = await prisma.productionOrder.delete({
      where: {
        organizationId,
        id: productionOrderId,
      },
      select: {
        id: true,
        count: true,
        status: true,
        productId: true,
        createdAt: true,
      },
    });

    return res.status(200).json(productionOrder);
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
  getAllProductionOrders,
  getProductionOrder,
  createProductionOrder,
  updateProductionOrder,
  deleteProductionOrder,
}
