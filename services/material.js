import { PrismaClient } from '@prisma/client';
import { matchedData } from 'express-validator';
import { CustomError } from '@lib/CustomError.js';


const prisma = new PrismaClient();

async function getAllMaterials(req, res, next) {
  const { organizationId } = matchedData(req);

  try {
    const materials = await prisma.material.findMany({
      where: { organizationId },
      select: {
        id: true,
        name: true,
        price: true,
        quantity: true,
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

    return res.status(200).json(materials);
  } catch (err) {
    return next(err);
  }
}

async function getMaterial(req, res, next) {
  const { organizationId, materialId } = matchedData(req);

  try {
    const material = await prisma.material.findUnique({
      where: {
        organizationId,
        id: materialId,
      },
      select: {
        id: true,
        name: true,
        price: true,
        quantity: true,
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
    if (!material) {
      throw new CustomError({
        statusCode: 404
      });
    }

    return res.status(200).json(material);
  } catch (err) {
    return next(err);
  }
}

async function createMaterial(req, res, next) {
  const {
    name,
    price,
    notes,
    categoryId,
    organizationId
  } = matchedData(req);

  try {
    const material = await prisma.material.create({
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
        quantity: true,
        notes: true,
        createdAt: true,
        categoryId: true,
      },
    });

    return res.status(201).json(material);
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

async function updateMaterial(req, res, next) {
  const {
    materialId,
    name,
    price,
    notes,
    categoryId,
    organizationId
  } = matchedData(req);

  try {
    const material = await prisma.material.update({
      where: {
        organizationId,
        id: materialId,
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
        quantity: true,
        notes: true,
        createdAt: true,
        categoryId: true,
      },
    });

    return res.status(200).json(material);
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

async function deleteMaterial(req, res, next) {
  const { organizationId, materialId } = matchedData(req);

  try {
    const material = await prisma.material.delete({
      where: {
        organizationId,
        id: materialId,
      },
      select: {
        id: true,
        name: true,
        price: true,
        quantity: true,
        notes: true,
        createdAt: true,
        categoryId: true,
      },
    });

    return res.status(200).json(material);
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
  getAllMaterials,
  getMaterial,
  createMaterial,
  updateMaterial,
  deleteMaterial,
}
