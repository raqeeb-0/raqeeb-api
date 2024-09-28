import express from 'express';
import { checkSchema } from 'express-validator';
import { authorizeUser } from '@middlewares/authorization.js';
import { getOrgContext } from '@middlewares/orgContextProvider.js';
import { organizationId } from '@schemas/common.js';
import {
  invoiceCreate
} from '@schemas/invoice.js';
import { validate } from '@middlewares/validation.js';
import {
  createInvoice,
  getAllInvoices
} from '@services/invoice.js';


const router = express.Router();

router.get(
  '/',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  validate,
  getAllInvoices
);

// router.get(
//   '/:materialPurchaseId',
//   authorizeUser,
//   getOrgContext,
//   checkSchema(organizationId, ['params']),
//   checkSchema(materialPurchaseId, ['params']),
//   validate,
//   getMaterialPurchase
// );

router.post(
  '/',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(invoiceCreate, ['body']),
  validate,
  createInvoice
);

// router.patch(
//   '/:materialPurchaseId',
//   authorizeUser,
//   getOrgContext,
//   checkSchema(organizationId, ['params']),
//   checkSchema(materialPurchaseId, ['params']),
//   checkSchema(materialPurchaseUpdate, ['body']),
//   validate,
//   updateMaterialPurchase
// );

// router.delete(
//   '/:materialPurchaseId',
//   authorizeUser,
//   getOrgContext,
//   checkSchema(organizationId, ['params']),
//   checkSchema(materialPurchaseId, ['params']),
//   validate,
//   deleteMaterialPurchase
// );


export default router;
