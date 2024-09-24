import express from 'express';
import { checkSchema } from 'express-validator';
import { authorizeUser } from '@middlewares/authorization.js';
import { getOrgContext } from '@middlewares/orgContextProvider.js';
import { organizationId } from '@schemas/common.js';
import {
  productUpdate,
  productCreate,
  productId
} from '@schemas/product.js';
import { validate } from '@middlewares/validation.js';
import {
  deleteProduct,
  updateProduct,
  createProduct,
  getProduct,
  getAllProducts
} from '@services/product.js';


const router = express.Router();

router.get(
  '/',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  validate,
  getAllProducts
);

router.get(
  '/:productId',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(productId, ['params']),
  validate,
  getProduct
);

router.post(
  '/',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(productCreate, ['body']),
  validate,
  createProduct
);

router.patch(
  '/:productId',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(productId, ['params']),
  checkSchema(productUpdate, ['body']),
  validate,
  updateProduct
);

router.delete(
  '/:productId',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(productId, ['params']),
  validate,
  deleteProduct
);


export default router;
