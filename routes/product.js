import express from 'express';
import { checkSchema } from 'express-validator';
import { authorizeUser } from '../middlewares/authorization.js';
import {
  productUpdate,
  productCreate,
  productId
} from '../schemas/product.js';
import {
  checkValidationResult
} from '../middlewares/validation.js';
import {
  deleteProduct,
  updateProduct,
  createProduct,
  getProduct,
  getAllProducts
} from '../services/product.js';


const router = express.Router();

router.get(
  '/',
  authorizeUser,
  getAllProducts
);

router.get(
  '/:productId',
  authorizeUser,
  checkSchema(productId, ['params']),
  checkValidationResult,
  getProduct
);

router.post(
  '/',
  authorizeUser,
  checkSchema(productCreate, ['body']),
  checkValidationResult,
  createProduct
);

router.patch(
  '/:productId',
  authorizeUser,
  checkSchema(productId, ['params']),
  checkSchema(productUpdate, ['body']),
  checkValidationResult,
  updateProduct
);

router.delete(
  '/:productId',
  authorizeUser,
  checkSchema(productId, ['params']),
  checkValidationResult,
  deleteProduct
);


export default router;
