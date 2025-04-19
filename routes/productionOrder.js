import express from 'express';
import { checkSchema } from 'express-validator';
import { authorizeUser } from '../middlewares/authorization.js';
import {
  productionOrderUpdate,
  productionOrderCreate,
  productionOrderId
} from '../schemas/productionOrder.js';
import {
  checkValidationResult
} from '../middlewares/validation.js';
import {
  deleteProductionOrder,
  updateProductionOrder,
  createProductionOrder,
  getProductionOrder,
  getAllProductionOrders
} from '../services/productionOrder.js';


const router = express.Router();

router.get(
  '/',
  authorizeUser,
  getAllProductionOrders
);

router.get(
  '/:productionOrderId',
  authorizeUser,
  checkSchema(productionOrderId, ['params']),
  checkValidationResult,
  getProductionOrder
);

router.post(
  '/',
  authorizeUser,
  checkSchema(productionOrderCreate, ['body']),
  checkValidationResult,
  createProductionOrder
);

router.patch(
  '/:productionOrderId',
  authorizeUser,
  checkSchema(productionOrderId, ['params']),
  checkSchema(productionOrderUpdate, ['body']),
  checkValidationResult,
  updateProductionOrder
);

router.delete(
  '/:productionOrderId',
  authorizeUser,
  checkSchema(productionOrderId, ['params']),
  checkValidationResult,
  deleteProductionOrder
);


export default router;
