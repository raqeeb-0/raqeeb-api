import express from 'express';
import { checkSchema } from 'express-validator';
import { authorizeUser } from '@middlewares/authorization.js';
import {
  supplierUpdate,
  supplierCreate,
  supplierId
} from '@schemas/supplier.js';
import {
  checkValidationResult
} from '@middlewares/validation.js';
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
  getAllSuppliers
);

router.get(
  '/:supplierId',
  authorizeUser,
  checkSchema(supplierId, ['params']),
  checkValidationResult,
  getSupplier
);

router.post(
  '/',
  authorizeUser,
  checkSchema(supplierCreate, ['body']),
  checkValidationResult,
  createSupplier
);

router.patch(
  '/:supplierId',
  authorizeUser,
  checkSchema(supplierId, ['params']),
  checkSchema(supplierUpdate, ['body']),
  checkValidationResult,
  updateSupplier
);

router.delete(
  '/:supplierId',
  authorizeUser,
  checkSchema(supplierId, ['params']),
  checkValidationResult,
  deleteSupplier
);


export default router;
