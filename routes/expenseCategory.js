import express from 'express';
import { checkSchema } from 'express-validator';
import { authorizeUser } from '@middlewares/authorization.js';
import { getOrgContext } from '@middlewares/orgContextProvider.js';
import { organizationId } from '@schemas/common.js';
import {
  categoryUpdate,
  categoryCreate,
  categoryId
} from '@schemas/expenseCategory.js';
import { validate } from '@middlewares/validation.js';
import {
  deleteExpenseCategory,
  updateExpenseCategory,
  createExpenseCategory,
  getExpenseCategory,
  getAllExpenseCategories
} from '@services/expenseCategory.js';


const router = express.Router();

router.get(
  '/',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  validate,
  getAllExpenseCategories
);

router.get(
  '/:categoryId',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(categoryId, ['params']),
  validate,
  getExpenseCategory
);

router.post(
  '/',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(categoryCreate, ['body']),
  validate,
  createExpenseCategory
);

router.patch(
  '/:categoryId',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(categoryId, ['params']),
  checkSchema(categoryUpdate, ['body']),
  validate,
  updateExpenseCategory
);

router.delete(
  '/:categoryId',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(categoryId, ['params']),
  validate,
  deleteExpenseCategory
);


export default router;
