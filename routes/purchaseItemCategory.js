import express from 'express';
import { checkSchema } from 'express-validator';
import { authorizeUser } from '@middlewares/authorization.js';
import { getOrgContext } from '@middlewares/orgContextProvider.js';
import { organizationId } from '@schemas/common.js';
import {
  categoryUpdate,
  categoryCreate,
  categoryId
} from '@schemas/purchaseItemCategory.js';
import { validate } from '@middlewares/validation.js';
import {
  deleteCategory,
  updateCategory,
  createCategory,
  getCategory,
  getAllCategories
} from '@services/purchaseItemCategory.js';


const router = express.Router();

router.get(
  '/',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  validate,
  getAllCategories
);

router.get(
  '/:categoryId',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(categoryId, ['params']),
  validate,
  getCategory
);

router.post(
  '/',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(categoryCreate, ['body']),
  validate,
  createCategory
);

router.patch(
  '/:categoryId',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(categoryId, ['params']),
  checkSchema(categoryUpdate, ['body']),
  validate,
  updateCategory
);

router.delete(
  '/:categoryId',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(categoryId, ['params']),
  validate,
  deleteCategory
);


export default router;
