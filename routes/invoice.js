import express from 'express';
import { checkSchema } from 'express-validator';
import { authorizeUser } from '@middlewares/authorization.js';
import {
  invoiceCreate,
  invoiceId
} from '@schemas/invoice.js';
import {
  checkValidationResult
} from '@middlewares/validation.js';
import {
  createInvoice,
  getInvoice,
  getAllInvoices
} from '@services/invoice.js';


const router = express.Router();

router.get(
  '/',
  authorizeUser,
  getAllInvoices
);

router.get(
  '/:invoiceId',
  authorizeUser,
  checkSchema(invoiceId, ['params']),
  checkValidationResult,
  getInvoice
)

router.post(
  '/',
  authorizeUser,
  checkSchema(invoiceCreate, ['body']),
  checkValidationResult,
  createInvoice
);


export default router;
