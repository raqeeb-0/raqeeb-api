import express from 'express';
import { checkSchema } from 'express-validator';
import { authorizeUser } from '@middlewares/authorization.js';
import { getOrgContext } from '@middlewares/orgContextProvider.js';
import { organizationId } from '@schemas/common.js';
import {
  saleUpdate,
  saleCreate,
  saleId
} from '@schemas/sale.js';
import { validate } from '@middlewares/validation.js';
import {
  deleteSale,
  updateSale,
  createSale,
  getSale,
  getAllSales
} from '@services/sale.js';


const router = express.Router();

router.get(
  '/',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  validate,
  getAllSales
);

router.get(
  '/:saleId',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(saleId, ['params']),
  validate,
  getSale
);

router.post(
  '/',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(saleCreate, ['body']),
  validate,
  createSale
);

router.patch(
  '/:saleId',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(saleId, ['params']),
  checkSchema(saleUpdate, ['body']),
  validate,
  updateSale
);

router.delete(
  '/:saleId',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(saleId, ['params']),
  validate,
  deleteSale
);


export default router;
