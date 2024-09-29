import express from 'express';
import { checkSchema } from 'express-validator';
import { authorizeUser } from '@middlewares/authorization.js';
import {
  categoryUpdate,
  categoryCreate,
  categoryId
} from '@schemas/purchaseItemCategory.js';
import {
  checkValidationResult
} from '@middlewares/validation.js';
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
  getAllCategories
);

router.get(
  '/:categoryId',
  authorizeUser,
  checkSchema(categoryId, ['params']),
  checkValidationResult,
  getCategory
);

router.post(
  '/',
  authorizeUser,
  checkSchema(categoryCreate, ['body']),
  checkValidationResult,
  createCategory
);

router.patch(
  '/:categoryId',
  authorizeUser,
  checkSchema(categoryId, ['params']),
  checkSchema(categoryUpdate, ['body']),
  checkValidationResult,
  updateCategory
);

router.delete(
  '/:categoryId',
  authorizeUser,
  checkSchema(categoryId, ['params']),
  checkValidationResult,
  deleteCategory
);


export default router;
