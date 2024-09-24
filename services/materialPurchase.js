import { PrismaClient } from '@prisma/client';
import { matchedData } from 'express-validator';
import { CustomError } from '@lib/CustomError.js';


const prisma = new PrismaClient();

async function getAllMaterialPurchases(req, res, next) {
  const { organizationId } = matchedData(req);

  try {
    const materialPurchases = await prisma.materialPurchase.findMany({
      where: { organizationId },
      select: {
        id: true,
        material: {
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

    return res.status(200).json(materialPurchases);
  } catch (err) {
    return next(err);
  }
}

async function getMaterialPurchase(req, res, next) {
  const { organizationId, materialPurchaseId } = matchedData(req);

  try {
    const materialPurchase = await prisma.materialPurchase.findUnique({
      where: {
        organizationId,
        id: materialPurchaseId,
      },
      select: {
        id: true,
        material: {
          select: {
            id: true,
            name: true,
          },
        },
        quantity: true,
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
    if (!materialPurchase) {
      throw new CustomError({
        statusCode: 404
      });
    }

    return res.status(200).json(materialPurchase);
  } catch (err) {
    return next(err);
  }
}

async function createMaterialPurchase(req, res, next) {
  const {
    materialId,
    supplierId,
    quantity,
    price,
    organizationId
  } = matchedData(req);

  try {
    const materialPurchase = await prisma.materialPurchase.create({
      data: {
        quantity,
        price,
        material: {
          connect: {
            id: materialId,
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
        quantity: true,
        price: true,
        materialId: true,
        supplierId: true,
        createdAt: true,
      },
    });

    return res.status(201).json(materialPurchase);
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

async function updateMaterialPurchase(req, res, next) {
  const {
    materialPurchaseId,
    materialId,
    quantity,
    price,
    supplierId,
    organizationId
  } = matchedData(req);

  try {
    const materialPurchase = await prisma.materialPurchase.update({
      where: {
        organizationId,
        id: materialPurchaseId,
      },
      data: {
        quantity,
        price,
        material: {
          connect: {
            id: materialId,
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
        quantity: true,
        price: true,
        materialId: true,
        supplierId: true,
        createdAt: true,
      },
    });

    return res.status(200).json(materialPurchase);
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

async function deleteMaterialPurchase(req, res, next) {
  const { organizationId, materialPurchaseId } = matchedData(req);

  try {
    const materialPurchase = await prisma.materialPurchase.delete({
      where: {
        organizationId,
        id: materialPurchaseId,
      },
      select: {
        id: true,
        quantity: true,
        price: true,
        materialId: true,
        supplierId: true,
        createdAt: true,
      },
    });

    return res.status(200).json(materialPurchase);
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
  getAllMaterialPurchases,
  getMaterialPurchase,
  createMaterialPurchase,
  updateMaterialPurchase,
  deleteMaterialPurchase,
}
