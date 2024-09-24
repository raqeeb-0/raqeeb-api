import express from 'express';
import { checkSchema } from 'express-validator';
import { authorizeUser } from '@middlewares/authorization.js';
import { getOrgContext } from '@middlewares/orgContextProvider.js';
import { organizationId } from '@schemas/common.js';
import {
  expenseUpdate,
  expenseCreate,
  expenseId
} from '@schemas/expense.js';
import { validate } from '@middlewares/validation.js';
import {
  deleteExpense,
  updateExpense,
  createExpense,
  getExpense,
  getAllExpenses
} from '@services/expense.js';


const router = express.Router();

router.get(
  '/',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  validate,
  getAllExpenses
);

router.get(
  '/:expenseId',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(expenseId, ['params']),
  validate,
  getExpense
);

router.post(
  '/',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(expenseCreate, ['body']),
  validate,
  createExpense
);

router.patch(
  '/:expenseId',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(expenseId, ['params']),
  checkSchema(expenseUpdate, ['body']),
  validate,
  updateExpense
);

router.delete(
  '/:expenseId',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(expenseId, ['params']),
  validate,
  deleteExpense
);


export default router;
