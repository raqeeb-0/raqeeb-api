import express from 'express';
import { checkSchema } from 'express-validator';
import { authorizeUser } from '@middlewares/authorization.js';
import { getOrgContext } from '@middlewares/orgContextProvider.js';
import { organizationId } from '@schemas/common.js';
import {
  productionOrderUpdate,
  productionOrderCreate,
  productionOrderId
} from '@schemas/productionOrder.js';
import { validate } from '@middlewares/validation.js';
import {
  deleteProductionOrder,
  updateProductionOrder,
  createProductionOrder,
  getProductionOrder,
  getAllProductionOrders
} from '@services/productionOrder.js';


const router = express.Router();

router.get(
  '/',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  validate,
  getAllProductionOrders
);

router.get(
  '/:productionOrderId',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(productionOrderId, ['params']),
  validate,
  getProductionOrder
);

router.post(
  '/',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(productionOrderCreate, ['body']),
  validate,
  createProductionOrder
);

router.patch(
  '/:productionOrderId',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(productionOrderId, ['params']),
  checkSchema(productionOrderUpdate, ['body']),
  validate,
  updateProductionOrder
);

router.delete(
  '/:productionOrderId',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(productionOrderId, ['params']),
  validate,
  deleteProductionOrder
);


export default router;
