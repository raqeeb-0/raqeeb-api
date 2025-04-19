import { PrismaClient } from '@prisma/client';
import { matchedData } from 'express-validator';
import { CustomError } from '../lib/CustomError.js';


const prisma = new PrismaClient();

async function getAllSuppliers(req, res, next) {
  const { organizationId } = matchedData(req);

  try {
    const supplier = await prisma.supplier.findMany({
      where: { organizationId },
      select: {
        id: true,
        name: true,
        accountPayable: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.status(200).json(supplier);
  } catch (err) {
    return next(err);
  }
}

async function getSupplier(req, res, next) {
  const { organizationId, supplierId } = matchedData(req);

  try {
    const supplier = await prisma.supplier.findUnique({
      where: {
        organizationId,
        id: supplierId,
      },
      select: {
        id: true,
        name: true,
        address: true,
        phone: true,
        accountPayable: true,
        createdAt: true,
      },
    });
    if (!supplier) {
      throw new CustomError({
        statusCode: 404
      });
    }

    return res.status(200).json(supplier);
  } catch (err) {
    return next(err);
  }
}

async function createSupplier(req, res, next) {
  const {
    name,
    address,
    phone,
    organizationId
  } = matchedData(req);

  try {
    const supplier = await prisma.supplier.create({
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
        accountPayable: true,
        createdAt: true,
      },
    });

    return res.status(201).json(supplier);
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

async function updateSupplier(req, res, next) {
  const {
    supplierId,
    name,
    address,
    phone,
    organizationId
  } = matchedData(req);

  try {
    const supplier = await prisma.supplier.update({
      where: {
        organizationId,
        id: supplierId,
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
        accountPayable: true,
        createdAt: true,
      },
    });

    return res.status(200).json(supplier);
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

async function deleteSupplier(req, res, next) {
  const { organizationId, supplierId } = matchedData(req);

  try {
    const supplier = await prisma.supplier.delete({
      where: {
        organizationId,
        id: supplierId,
      },
      select: {
        id: true,
        name: true,
        address: true,
        phone: true,
        accountPayable: true,
        createdAt: true,
      },
    });

    return res.status(200).json(supplier);
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
  getAllSuppliers,
  getSupplier,
  createSupplier,
  updateSupplier,
  deleteSupplier,
}
