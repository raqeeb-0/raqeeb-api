import express from 'express';
import { checkSchema } from 'express-validator';
import { authorizeUser } from '../middlewares/authorization.js';
import {
  categoryUpdate,
  categoryCreate,
  categoryId
} from '../schemas/productCategory.js';
import {
  checkValidationResult
} from '../middlewares/validation.js';
import {
  deleteProductCategory,
  updateProductCategory,
  createProductCategory,
  getProductCategory,
  getAllProductCategories
} from '../services/productCategory.js';


const router = express.Router();

router.get(
  '/',
  authorizeUser,
  getAllProductCategories
);

router.get(
  '/:categoryId',
  authorizeUser,
  checkSchema(categoryId, ['params']),
  checkValidationResult,
  getProductCategory
);

router.post(
  '/',
  authorizeUser,
  checkSchema(categoryCreate, ['body']),
  checkValidationResult,
  createProductCategory
);

router.patch(
  '/:categoryId',
  authorizeUser,
  checkSchema(categoryId, ['params']),
  checkSchema(categoryUpdate, ['body']),
  checkValidationResult,
  updateProductCategory
);

router.delete(
  '/:categoryId',
  authorizeUser,
  checkSchema(categoryId, ['params']),
  checkValidationResult,
  deleteProductCategory
);


export default router;
