import { PrismaClient } from '@prisma/client';
import { matchedData } from 'express-validator';
import { CustomError } from '@lib/CustomError.js';


const prisma = new PrismaClient();

async function getAllPurchaseItems(req, res, next) {
  const { organizationId } = matchedData(req);

  try {
    const purchaseItems = await prisma.purchaseItem.findMany({
      where: { organizationId },
      select: {
        id: true,
        name: true,
        type: true,
        price: true,
        createdAt: true,
        inventory: {
          select: {
            quantity: true,
          },
        },
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

    return res.status(200).json(purchaseItems);
  } catch (err) {
    return next(err);
  }
}

async function getPurchaseItem(req, res, next) {
  const { organizationId, purchaseItemId } = matchedData(req);

  try {
    const purchaseItem = await prisma.purchaseItem.findUnique({
      where: {
        organizationId,
        id: purchaseItemId,
      },
      select: {
        id: true,
        name: true,
        type: true,
        price: true,
        notes: true,
        createdAt: true,
        inventory: {
          select: {
            quantity: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!purchaseItem) {
      throw new CustomError({
        statusCode: 404
      });
    }

    return res.status(200).json(purchaseItem);
  } catch (err) {
    return next(err);
  }
}

async function createPurchaseItem(req, res, next) {
  const {
    name,
    type,
    price,
    notes,
    categoryId,
    organizationId
  } = matchedData(req);

  try {
    const prismaPurchaseObj = {
      data: {
        name,
        type,
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
        type: true,
        price: true,
        notes: true,
        createdAt: true,
        categoryId: true,
      },
    }

    if (type === 'storable') {
      prismaPurchaseObj.data.inventory = { create: {} };
    }
    
    const purchaseItem = await prisma.purchaseItem.create(
      prismaPurchaseObj
    );

    return res.status(201).json(purchaseItem);
  } catch (err) {
    if (err.code === 'P2002') {
      return next(new CustomError({
        statusCode: 409,
        message: 'Name already taken'
      }));
    }

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

async function updatePurchaseItem(req, res, next) {
  const {
    purchaseItemId,
    name,
    price,
    notes,
    categoryId,
    organizationId
  } = matchedData(req);

  try {
    const purchaseItem = await prisma.purchaseItem.update({
      where: {
        organizationId,
        id: purchaseItemId,
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
        type: true,
        price: true,
        notes: true,
        createdAt: true,
        categoryId: true,
      },
    });

    return res.status(200).json(purchaseItem);
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
        message: JSON.stringify(err)//`${err.meta.cause.split("'")[1]} not found`
      }));
    }
    return next(err);
  }
}

async function deletePurchaseItem(req, res, next) {
  const { organizationId, purchaseItemId } = matchedData(req);

  try {
    const purchaseItem = await prisma.purchaseItem.delete({
      where: {
        organizationId,
        id: purchaseItemId,
      },
      select: {
        id: true,
        name: true,
        type: true,
        price: true,
        notes: true,
        createdAt: true,
        categoryId: true,
      },
    });

    return res.status(200).json(purchaseItem);
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
  getAllPurchaseItems,
  getPurchaseItem,
  createPurchaseItem,
  updatePurchaseItem,
  deletePurchaseItem,
}
