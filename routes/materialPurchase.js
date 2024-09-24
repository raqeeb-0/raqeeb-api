import express from 'express';
import { checkSchema } from 'express-validator';
import { authorizeUser } from '@middlewares/authorization.js';
import { getOrgContext } from '@middlewares/orgContextProvider.js';
import { organizationId } from '@schemas/common.js';
import {
  materialPurchaseUpdate,
  materialPurchaseCreate,
  materialPurchaseId
} from '@schemas/materialPurchase.js';
import { validate } from '@middlewares/validation.js';
import {
  deleteMaterialPurchase,
  updateMaterialPurchase,
  createMaterialPurchase,
  getMaterialPurchase,
  getAllMaterialPurchases
} from '@services/materialPurchase.js';


const router = express.Router();

router.get(
  '/',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  validate,
  getAllMaterialPurchases
);

router.get(
  '/:materialPurchaseId',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(materialPurchaseId, ['params']),
  validate,
  getMaterialPurchase
);

router.post(
  '/',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(materialPurchaseCreate, ['body']),
  validate,
  createMaterialPurchase
);

router.patch(
  '/:materialPurchaseId',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(materialPurchaseId, ['params']),
  checkSchema(materialPurchaseUpdate, ['body']),
  validate,
  updateMaterialPurchase
);

router.delete(
  '/:materialPurchaseId',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(materialPurchaseId, ['params']),
  validate,
  deleteMaterialPurchase
);


export default router;
