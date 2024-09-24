import express from 'express';
import { checkSchema } from 'express-validator';
import { authorizeUser } from '@middlewares/authorization.js';
import { getOrgContext } from '@middlewares/orgContextProvider.js';
import { organizationId } from '@schemas/common.js';
import {
  categoryUpdate,
  categoryCreate,
  categoryId
} from '@schemas/materialCategory.js';
import { validate } from '@middlewares/validation.js';
import {
  deleteMaterialCategory,
  updateMaterialCategory,
  createMaterialCategory,
  getMaterialCategory,
  getAllMaterialCategories
} from '@services/materialCategory.js';


const router = express.Router();

router.get(
  '/',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  validate,
  getAllMaterialCategories
);

router.get(
  '/:categoryId',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(categoryId, ['params']),
  validate,
  getMaterialCategory
);

router.post(
  '/',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(categoryCreate, ['body']),
  validate,
  createMaterialCategory
);

router.patch(
  '/:categoryId',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(categoryId, ['params']),
  checkSchema(categoryUpdate, ['body']),
  validate,
  updateMaterialCategory
);

router.delete(
  '/:categoryId',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(categoryId, ['params']),
  validate,
  deleteMaterialCategory
);


export default router;
