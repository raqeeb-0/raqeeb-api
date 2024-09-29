import { PrismaClient } from '@prisma/client';
import { matchedData } from 'express-validator';
import { CustomError } from '@lib/CustomError.js';
import fs from 'fs/promises';
import os from 'os';
import path from 'path';


const prisma = new PrismaClient();

async function getAllProducts(req, res, next) {
  const { organizationId } = req;

  try {
    const products = await prisma.product.findMany({
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

    return res.status(200).json(products);
  } catch (err) {
    return next(err);
  }
}

async function getProduct(req, res, next) {
  const { organizationId } = req;
  const { productId } = matchedData(req);

  try {
    const product = await prisma.product.findUnique({
      where: {
        organizationId,
        id: productId,
      },
      select: {
        id: true,
        name: true,
        price: true,
        quantity: true,
        profitPercent: true,
        indirectCostPercent: true,
        imagePath: true,
        notes: true,
        materials: {
          select: {
            material: {
              select: {
                id: true,
                name: true,
              },
            },
            quantity: true,
          },
        },
        createdAt: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!product) {
      throw new CustomError({
        statusCode: 404
      });
    }

    product.materials = product.materials.map((item) => {
      return {
        id: item.material.id,
        name: item.material.name,
        quantity: item.quantity,
      };
    });

    return res.status(200).json(product);
  } catch (err) {
    return next(err);
  }
}

async function createProduct(req, res, next) {
  const { organizationId } = req;
  const {
    image,
    name,
    profitPercent,
    indirectCostPercent,
    notes,
    materials,
    categoryId
  } = matchedData(req);

  try {

    const homeDir = os.homedir();

    const uploadsDir = path.join(homeDir, 'raqeeb_uploads');

    await fs.mkdir(uploadsDir, { recursive: true });

    const imageBuffer = Buffer.from(image.data, 'base64');

    const imagePath = path.join(uploadsDir, `${Date.now()}-${image.name}`);

    await fs.writeFile(imagePath, imageBuffer);

    const product = await prisma.product.create({
      data: {
        name,
        profitPercent,
        indirectCostPercent,
        notes,
        imagePath,
        materials: {
          create: materials?.map((material) => {
            return {
              material: {
                connect: {
                  id: material.id,
                },
              },
              quantity: material.quantity,
              organization: {
                connect: {
                  id: organizationId,
                },
              },
            };
          }),
        },
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
        profitPercent: true,
        indirectCostPercent: true,
        imagePath: true,
        notes: true,
        createdAt: true,
        categoryId: true,
      },
    });

    return res.status(201).json(product);
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

async function updateProduct(req, res, next) {
  const { organizationId } = req;
  const {
    productId,
    name,
    profitPercent,
    indirectCostPercent,
    notes,
    materials,
    categoryId
  } = matchedData(req);

  try {
    const product = await prisma.product.update({
      where: {
        organizationId,
        id: productId,
      },
      data: {
        name,
        profitPercent,
        indirectCostPercent,
        notes,
        materials: {
          deleteMany: {},
          create: materials?.map((material) => {
            return {
              material: {
                connect: {
                  id: material.id,
                },
              },
              quantity: material.quantity,
              organization: {
                connect: {
                  id: organizationId,
                },
              },
            };
          }),
        },
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
        profitPercent: true,
        indirectCostPercent: true,
        imagePath: true,
        notes: true,
        createdAt: true,
        categoryId: true,
      },
    });

    return res.status(200).json(product);
  } catch (err) {
    if (err.code === 'P2002') {
      return next(new CustomError({
        statusCode: 409,
        message: `${err.meta.target[0]} already taken`
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

async function deleteProduct(req, res, next) {
  const { organizationId } = req;
  const { productId } = matchedData(req);

  try {
    const product = await prisma.product.delete({
      where: {
        organizationId,
        id: productId,
      },
      select: {
        id: true,
        name: true,
        price: true,
        quantity: true,
        profitPercent: true,
        indirectCostPercent: true,
        notes: true,
        createdAt: true,
        categoryId: true,
      },
    });

    return res.status(200).json(product);
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
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
}
