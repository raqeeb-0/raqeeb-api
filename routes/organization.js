import express from 'express';
import { checkSchema } from 'express-validator';
import { authorizeUser } from '../middlewares/authorization.js';
import {
  userId,
  organizationId
} from '../schemas/common.js';
import {
  organizationUpdate,
  organizationCreate
} from '../schemas/organization.js';
import {
  checkValidationResult
} from '../middlewares/validation.js';
import {
  deleteOrganization,
  updateOrganization,
  createOrganization,
  getOrganization,
  getAllOrganizations
} from '../services/organization.js';


const router = express.Router();

router.get(
  '/',
  authorizeUser,
  checkSchema(userId, ['params']),
  checkValidationResult,
  getAllOrganizations
);

router.get(
  '/:organizationId',
  authorizeUser,
  checkSchema(userId, ['params']),
  checkSchema(organizationId, ['params']),
  checkValidationResult,
  getOrganization
);

router.post(
  '/',
  authorizeUser,
  checkSchema(userId, ['params']),
  checkSchema(organizationCreate, ['body']),
  checkValidationResult,
  createOrganization
);

router.patch(
  '/:organizationId',
  authorizeUser,
  checkSchema(userId, ['params']),
  checkSchema(organizationId, ['params']),
  checkSchema(organizationUpdate, ['body']),
  checkValidationResult,
  updateOrganization
);

router.delete(
  '/:organizationId',
  authorizeUser,
  checkSchema(userId, ['params']),
  checkSchema(organizationId, ['params']),
  checkValidationResult,
  deleteOrganization
);


export default router;
