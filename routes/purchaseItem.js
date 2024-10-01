import express from 'express';
import { checkSchema } from 'express-validator';
import { authorizeUser } from '@middlewares/authorization.js';
import {
  purchaseItemUpdate,
  purchaseItemCreate,
  purchaseItemQuery,
  purchaseItemId
} from '@schemas/purchaseItem.js';
import {
  checkValidationResult
} from '@middlewares/validation.js';
import {
  deletePurchaseItem,
  updatePurchaseItem,
  createPurchaseItem,
  getPurchaseItem,
  getAllPurchaseItems
} from '@services/purchaseItem.js';


const router = express.Router();

router.get(
  '/',
  authorizeUser,
  checkSchema(purchaseItemQuery, ['query']),
  checkValidationResult,
  getAllPurchaseItems
);

router.get(
  '/:purchaseItemId',
  authorizeUser,
  checkSchema(purchaseItemId, ['params']),
  checkValidationResult,
  getPurchaseItem
);

router.post(
  '/',
  authorizeUser,
  checkSchema(purchaseItemCreate, ['body']),
  checkValidationResult,
  createPurchaseItem
);

router.patch(
  '/:purchaseItemId',
  authorizeUser,
  checkSchema(purchaseItemId, ['params']),
  checkSchema(purchaseItemUpdate, ['body']),
  checkValidationResult,
  updatePurchaseItem
);

router.delete(
  '/:purchaseItemId',
  authorizeUser,
  checkSchema(purchaseItemId, ['params']),
  checkValidationResult,
  deletePurchaseItem
);


export default router;
