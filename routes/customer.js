import express from 'express';
import { checkSchema } from 'express-validator';
import { authorizeUser } from '@middlewares/authorization.js';
import { getOrgContext } from '@middlewares/orgContextProvider.js';
import { organizationId } from '@schemas/common.js';
import {
  customerUpdate,
  customerCreate,
  customerId
} from '@schemas/customer.js';
import { validate } from '@middlewares/validation.js';
import {
  deleteCustomer,
  updateCustomer,
  createCustomer,
  getCustomer,
  getAllCustomers
} from '@services/customer.js';


const router = express.Router();

router.get(
  '/',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  validate,
  getAllCustomers
);

router.get(
  '/:customerId',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(customerId, ['params']),
  validate,
  getCustomer
);

router.post(
  '/',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(customerCreate, ['body']),
  validate,
  createCustomer
);

router.patch(
  '/:customerId',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(customerId, ['params']),
  checkSchema(customerUpdate, ['body']),
  validate,
  updateCustomer
);

router.delete(
  '/:customerId',
  authorizeUser,
  getOrgContext,
  checkSchema(organizationId, ['params']),
  checkSchema(customerId, ['params']),
  validate,
  deleteCustomer
);


export default router;
