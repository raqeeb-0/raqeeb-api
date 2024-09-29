import express from 'express';
import { checkSchema } from 'express-validator';
import { authorizeUser } from '@middlewares/authorization.js';
import {
  customerUpdate,
  customerCreate,
  customerId
} from '@schemas/customer.js';
import {
  checkValidationResult
} from '@middlewares/validation.js';
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
  getAllCustomers
);

router.get(
  '/:customerId',
  authorizeUser,
  checkSchema(customerId, ['params']),
  checkValidationResult,
  getCustomer
);

router.post(
  '/',
  authorizeUser,
  checkSchema(customerCreate, ['body']),
  checkValidationResult,
  createCustomer
);

router.patch(
  '/:customerId',
  authorizeUser,
  checkSchema(customerId, ['params']),
  checkSchema(customerUpdate, ['body']),
  checkValidationResult,
  updateCustomer
);

router.delete(
  '/:customerId',
  authorizeUser,
  checkSchema(customerId, ['params']),
  checkValidationResult,
  deleteCustomer
);


export default router;
