import express from 'express';
import { checkSchema } from 'express-validator';
import { authorizeUser } from '@middlewares/authorization.js';
import {
  userId,
  organizationId
} from '@schemas/common.js';
import {
  organizationUpdate,
  organizationCreate
} from '@schemas/organization.js';
import { validate } from '@middlewares/validation.js';
import {
  selectOrganization,
  deleteOrganization,
  updateOrganization,
  createOrganization,
  getOrganization,
  getAllOrganizations
} from '@services/organization.js';


const router = express.Router();

router.get(
  '/',
  authorizeUser,
  checkSchema(userId, ['params']),
  validate,
  getAllOrganizations
);

router.get(
  '/:organizationId',
  authorizeUser,
  checkSchema(userId, ['params']),
  checkSchema(organizationId, ['params']),
  validate,
  getOrganization
);

router.post(
  '/',
  authorizeUser,
  checkSchema(userId, ['params']),
  checkSchema(organizationCreate, ['body']),
  validate,
  createOrganization
);

router.patch(
  '/:organizationId',
  authorizeUser,
  checkSchema(userId, ['params']),
  checkSchema(organizationId, ['params']),
  checkSchema(organizationUpdate, ['body']),
  validate,
  updateOrganization
);

router.delete(
  '/:organizationId',
  authorizeUser,
  checkSchema(userId, ['params']),
  checkSchema(organizationId, ['params']),
  validate,
  deleteOrganization
);

router.post(
  '/select',
  authorizeUser,
  checkSchema(userId, ['params']),
  checkSchema(organizationId, ['body']),
  validate,
  selectOrganization
);


export default router;
