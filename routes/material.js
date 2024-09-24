import express from 'express';
import { checkSchema } from 'express-validator';
import { authorizeUser } from '@middlewares/authorization.js';
import { getOrgContext } from '@middlewares/orgContextProvider.js';
import { organizationId } from '@schemas/common.js';
import {
  materialUpdate,
  materialCreate,
  materialId
} from '@schemas/material.js';
import { validate } from '@middlewares/validation.js';
import {
  deleteMaterial,
  updateMaterial,
  createMaterial,
  getMaterial,
  getAllMaterials
} from '@services/material.js';


const router = express.Router();

router.get(
  '/',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  validate,
  getAllMaterials
);

router.get(
  '/:materialId',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(materialId, ['params']),
  validate,
  getMaterial
);

router.post(
  '/',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(materialCreate, ['body']),
  validate,
  createMaterial
);

router.patch(
  '/:materialId',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(materialId, ['params']),
  checkSchema(materialUpdate, ['body']),
  validate,
  updateMaterial
);

router.delete(
  '/:materialId',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(materialId, ['params']),
  validate,
  deleteMaterial
);


export default router;
