import { PrismaClient } from '@prisma/client';
import { matchedData } from 'express-validator';
import { CustomError } from '@lib/CustomError.js';


const prisma = new PrismaClient();

async function getAllUsers(req, res, next) {
  try {
    const users = await prisma.user.findMany();

    return res.status(200).json(users);
  } catch (err) {
    return next(err);
  }
}

async function getAllPurchaseItems(req, res, next) {
  try {
    const items = await prisma.purchaseItem.findMany();

    return res.status(200).json(items);
  } catch (err) {
    return next(err);
  }
}

async function getInventory(req, res, next) {
  try {
    const inventory = await prisma.inventory.findMany();

    return res.status(200).json(inventory);
  } catch (err) {
    return next(err);
  }
}

async function deleteAllUsers(req, res, next) {
  try {
    const users = await prisma.user.deleteMany();

    return res.status(200).json(users);
  } catch (err) {
    return next(err);
  }
}

async function deleteAllOrganizations(req, res, next) {
  try {
    const organizations = await prisma.organization.deleteMany();

    return res.status(200).json(organizations);
  } catch (err) {
    return next(err);
  }
}

async function deleteAllPurchaseItems(req, res, next) {
  try {
    const inventory = await prisma.inventory.findMany();
    const purchaseItems = await prisma.purchaseItem.findMany();

    const deleteRelatedProducts = inventory.map((item) => {
      return prisma.inventory.update({
        where: { id: item.id },
        data: {
          products: { deleteMany: {} },
        },
      });
    });

    const deleteInventory = prisma.inventory.deleteMany();

    const deleteRelatedPurchases = purchaseItems.map((item) => {
      return prisma.purchaseItem.update({
        where: { id: item.id },
        data: {
          purchases: { deleteMany: {} },
        }
      });
    });

    const deletePurchaseItems = prisma.purchaseItem.deleteMany();

    const result = await prisma.$transaction([
      ...deleteRelatedProducts,
      deleteInventory,
      ...deleteRelatedPurchases,
      deletePurchaseItems
    ]);

    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
}


export {
  getAllUsers,
  getAllPurchaseItems,
  getInventory,
  deleteAllUsers,
  deleteAllOrganizations,
  deleteAllPurchaseItems,
}
