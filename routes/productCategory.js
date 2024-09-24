import express from 'express';
import { checkSchema } from 'express-validator';
import { authorizeUser } from '@middlewares/authorization.js';
import { getOrgContext } from '@middlewares/orgContextProvider.js';
import { organizationId } from '@schemas/common.js';
import {
  categoryUpdate,
  categoryCreate,
  categoryId
} from '@schemas/productCategory.js';
import { validate } from '@middlewares/validation.js';
import {
  deleteProductCategory,
  updateProductCategory,
  createProductCategory,
  getProductCategory,
  getAllProductCategories
} from '@services/productCategory.js';


const router = express.Router();

router.get(
  '/',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  validate,
  getAllProductCategories
);

router.get(
  '/:categoryId',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(categoryId, ['params']),
  validate,
  getProductCategory
);

router.post(
  '/',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(categoryCreate, ['body']),
  validate,
  createProductCategory
);

router.patch(
  '/:categoryId',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(categoryId, ['params']),
  checkSchema(categoryUpdate, ['body']),
  validate,
  updateProductCategory
);

router.delete(
  '/:categoryId',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(categoryId, ['params']),
  validate,
  deleteProductCategory
);


export default router;
