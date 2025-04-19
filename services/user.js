import { PrismaClient } from '@prisma/client';
import { matchedData } from 'express-validator';
import { CustomError } from '../lib/CustomError.js';
import { capitalizeFirstLetter } from '../lib/utils.js';


const prisma = new PrismaClient();

async function getUser(req, res, next) {
  const { userId } = matchedData(req);

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        email: true,
        username: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) {
      throw new CustomError({
        statusCode: 404
      });
    }

    return res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
}

async function updateUser(req, res, next) {
  const {
    userId,
    email,
    username,
    phone
  } = matchedData(req);

  try {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        email,
        username,
        phone,
      },
      select: {
        email: true,
        username: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.status(200).json(user);
  } catch (err) {
    if (err.code === 'P2002') {
      const errorMsg = capitalizeFirstLetter(
        `${err.meta.target[0]} already taken.`
      );
      return next(new CustomError({
        statusCode: 409,
        message: errorMsg
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

async function deleteUser(req, res, next) {
  const { userId } = matchedData(req);

  try {
    const userOrganizations = await prisma.organization.findMany({
      where: { userId },
      select: { id: true},
    });

    const deleteOrganizationsData = userOrganizations.map(
      (organization) => {
        return prisma.organization.update({
          where: { id: organization.id },
          data: {
            materialPurchases: {
              deleteMany: {},
            },
            expensePurchases: {
              deleteMany: {},
            },
            sales: {
              deleteMany: {},
            },
            productionOrders: {
              deleteMany: {},
            },
            customers: {
              deleteMany: {},
            },
            suppliers: {
              deleteMany: {},
            },
            materials: {
              deleteMany: {},
            },
            expenses: {
              deleteMany: {},
            },
            products: {
              deleteMany: {},
            },
            staff: {
              deleteMany: {},
            },
            expenseCategories: {
              deleteMany: {},
            },
            materialCategories: {
              deleteMany: {},
            },
            productCategories: {
              deleteMany: {},
            },
            billOfMaterials: {
              deleteMany: {},
            },
          },
        });
      }
    );

    const deleteOrganizations = prisma.organization.deleteMany({
      where: { userId },
    });

    const deleteUser = prisma.user.delete({
      where: { id: userId },
    });

    await prisma.$transaction([
      ...deleteOrganizationsData,
      deleteOrganizations,
      deleteUser
    ]);

    res.clearCookie('authorization');

    res.status(200).json({
      status: 'success',
      message: 'Account deleted successfully'
    });
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
  getUser,
  updateUser,
  deleteUser,
}
