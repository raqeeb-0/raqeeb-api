import { PrismaClient } from '@prisma/client';
import { matchedData } from 'express-validator';
import { CustomError } from '@lib/CustomError.js';


const prisma = new PrismaClient();

async function getAllCustomers(req, res, next) {
  const { organizationId } = req;

  try {
    const customer = await prisma.customer.findMany({
      where: { organizationId },
      select: {
        id: true,
        name: true,
        accountReceivable: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.status(200).json(customer);
  } catch (err) {
    return next(err);
  }
}

async function getCustomer(req, res, next) {
  const { organizationId } = req;
  const { customerId } = matchedData(req);

  try {
    const customer = await prisma.customer.findUnique({
      where: {
        organizationId,
        id: customerId,
      },
      select: {
        id: true,
        name: true,
        address: true,
        phone: true,
        accountReceivable: true,
        createdAt: true,
      },
    });
    if (!customer) {
      throw new CustomError({
        statusCode: 404
      });
    }

    return res.status(200).json(customer);
  } catch (err) {
    return next(err);
  }
}

async function createCustomer(req, res, next) {
  const { organizationId } = req;
  const {
    name,
    address,
    phone
  } = matchedData(req);

  try {
    const customer = await prisma.customer.create({
      data: {
        name,
        address,
        phone,
        organization: {
          connect: {
            id: organizationId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        address: true,
        phone: true,
        accountReceivable: true,
        createdAt: true,
      },
    });

    return res.status(201).json(customer);
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

async function updateCustomer(req, res, next) {
  const { organizationId } = req;
  const {
    customerId,
    name,
    address,
    phone
  } = matchedData(req);

  try {
    const customer = await prisma.customer.update({
      where: {
        organizationId,
        id: customerId,
      },
      data: {
        name,
        address,
        phone,
      },
      select: {
        id: true,
        name: true,
        address: true,
        phone: true,
        accountReceivable: true,
        createdAt: true,
      },
    });

    return res.status(200).json(customer);
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

async function deleteCustomer(req, res, next) {
  const { organizationId } = req;
  const { customerId } = matchedData(req);

  try {
    const customer = await prisma.customer.delete({
      where: {
        organizationId,
        id: customerId,
      },
      select: {
        id: true,
        name: true,
        address: true,
        phone: true,
        accountReceivable: true,
        createdAt: true,
      },
    });

    return res.status(200).json(customer);
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
  getAllCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
}
