import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { matchedData } from 'express-validator';
import { CustomError } from '@lib/CustomError.js';


const prisma = new PrismaClient();

async function getAllOrganizations(req, res, next) {
  const { userId } = matchedData(req);

  try {
    const organizations = await prisma.organization.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        phone: true,
        createdAt: true,
      },
    });

    return res.status(200).json(organizations);
  } catch (err) {
    return next(err);
  }
}

async function getOrganization(req, res, next) {
  const { userId, organizationId } = matchedData(req);

  try {
    const organization = await prisma.organization.findUnique({
      where: {
        userId,
        id: organizationId,
      },
      select: {
        id: true,
        name: true,
        phone: true,
        createdAt: true,
      },
    });
    if (!organization) {
      throw new CustomError({
        statusCode: 404
      });
    }

    return res.status(200).json(organization);
  } catch (err) {
    return next(err);
  }
}

async function createOrganization(req, res, next) {
  const { userId, name, phone } = matchedData(req);

  try {
    const organization = await prisma.organization.create({
      data: {
        name,
        phone,
        user: {
          connect: {
            id: userId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        phone: true,
        createdAt: true,
      },
    });

    return res.status(201).json(organization);
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

async function updateOrganization(req, res, next) {
  const {
    userId,
    organizationId,
    name,
    phone
  } = matchedData(req);

  try {
    const organization = await prisma.organization.update({
      where: {
        userId,
        id: organizationId,
      },
      data: {
        name,
        phone,
      },
      select: {
        id: true,
        name: true,
        phone: true,
        createdAt: true,
      },
    });

    return res.status(200).json(organization);
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

async function deleteOrganization(req, res, next) {
  const { userId, organizationId } = matchedData(req);

  try {
    const organizationData = prisma.organization.update({
      where: { id: organizationId },
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

    const organization = prisma.organization.delete({
      where: {
        userId,
        id: organizationId,
      },
      select: {
        id: true,
        name: true,
        phone: true,
        createdAt: true,
      },
    });

    await prisma.$transaction([
      organizationData,
      organization
    ]);

    res.clearCookie('context');

    return res.status(200).json(organization);
  } catch (err) {
    // console.log(err.meta.target[0]);
    if (err.code === 'P2025') {
      return next(new CustomError({
        statusCode: 404,
      }));
    }
    return next(err);
  }
}

async function selectOrganization(req, res, next) {
  const { userId, organizationId } = matchedData(req);

  try {
    const organization = await prisma.organization.findUnique({
      where: {
        userId,
        id: organizationId,
      },
      select: {
        name: true,
      },
    });
    if (!organization) {
      throw new CustomError({
        statusCode: 404
      });
    }

    const expiryPeriodInDays = 10;
    const milliSecondsPerDay = 24 * 60 * 60 * 1000;
    const expiryPeriodInMilliSeconds = expiryPeriodInDays * milliSecondsPerDay;

    const token = jwt.sign(
      { organizationId },
      process.env.JWT_SECRET,
      { expiresIn: expiryPeriodInMilliSeconds }
    );

    res.cookie(
      'context',
      token,
      {
        maxAge: expiryPeriodInMilliSeconds,
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      }
    )

    return res.status(200).json({
      status: 'success',
      message: 'Organization selected successfully',
    });
  } catch (err) {
    return next(err);
  }
}


export {
  getAllOrganizations,
  getOrganization,
  createOrganization,
  updateOrganization,
  deleteOrganization,
  selectOrganization
}
