import express from 'express';
import { checkSchema } from 'express-validator';
import { authorizeUser } from '@middlewares/authorization.js';
import { getOrgContext } from '@middlewares/orgContextProvider.js';
import { organizationId } from '@schemas/common.js';
import {
  purchaseItemUpdate,
  purchaseItemCreate,
  purchaseItemId
} from '@schemas/purchaseItem.js';
import { validate } from '@middlewares/validation.js';
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
  getOrgContext,
  checkSchema(organizationId, ['params']),
  validate,
  getAllPurchaseItems
);

router.get(
  '/:purchaseItemId',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(purchaseItemId, ['params']),
  validate,
  getPurchaseItem
);

router.post(
  '/',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(purchaseItemCreate, ['body']),
  validate,
  createPurchaseItem
);

router.patch(
  '/:purchaseItemId',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(purchaseItemId, ['params']),
  checkSchema(purchaseItemUpdate, ['body']),
  validate,
  updatePurchaseItem
);

router.delete(
  '/:purchaseItemId',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(purchaseItemId, ['params']),
  validate,
  deletePurchaseItem
);


export default router;
