import express from 'express';
import { checkSchema } from 'express-validator';
import { authorizeUser } from '@middlewares/authorization.js';
import { getOrgContext } from '@middlewares/orgContextProvider.js';
import { organizationId } from '@schemas/common.js';
import {
  supplierUpdate,
  supplierCreate,
  supplierId
} from '@schemas/supplier.js';
import { validate } from '@middlewares/validation.js';
import {
  deleteSupplier,
  updateSupplier,
  createSupplier,
  getSupplier,
  getAllSuppliers
} from '@services/supplier.js';


const router = express.Router();

router.get(
  '/',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  validate,
  getAllSuppliers
);

router.get(
  '/:supplierId',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(supplierId, ['params']),
  validate,
  getSupplier
);

router.post(
  '/',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(supplierCreate, ['body']),
  validate,
  createSupplier
);

router.patch(
  '/:supplierId',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(supplierId, ['params']),
  checkSchema(supplierUpdate, ['body']),
  validate,
  updateSupplier
);

router.delete(
  '/:supplierId',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(supplierId, ['params']),
  validate,
  deleteSupplier
);


export default router;
