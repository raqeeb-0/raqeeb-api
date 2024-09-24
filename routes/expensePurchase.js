import express from 'express';
import { checkSchema } from 'express-validator';
import { authorizeUser } from '@middlewares/authorization.js';
import { getOrgContext } from '@middlewares/orgContextProvider.js';
import { organizationId } from '@schemas/common.js';
import {
  expensePurchaseUpdate,
  expensePurchaseCreate,
  expensePurchaseId
} from '@schemas/expensePurchase.js';
import { validate } from '@middlewares/validation.js';
import {
  deleteExpensePurchase,
  updateExpensePurchase,
  createExpensePurchase,
  getExpensePurchase,
  getAllExpensePurchases
} from '@services/expensePurchase.js';


const router = express.Router();

router.get(
  '/',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  validate,
  getAllExpensePurchases
);

router.get(
  '/:expensePurchaseId',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(expensePurchaseId, ['params']),
  validate,
  getExpensePurchase
);

router.post(
  '/',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(expensePurchaseCreate, ['body']),
  validate,
  createExpensePurchase
);

router.patch(
  '/:expensePurchaseId',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(expensePurchaseId, ['params']),
  checkSchema(expensePurchaseUpdate, ['body']),
  validate,
  updateExpensePurchase
);

router.delete(
  '/:expensePurchaseId',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(expensePurchaseId, ['params']),
  validate,
  deleteExpensePurchase
);


export default router;
