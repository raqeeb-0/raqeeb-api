import express from 'express';
import { checkSchema } from 'express-validator';
import { authorizeUser } from '@middlewares/authorization.js';
import {
  invoiceCreate
} from '@schemas/invoice.js';
import {
  checkValidationResult
} from '@middlewares/validation.js';
import {
  createInvoice,
  getAllInvoices
} from '@services/invoice.js';


const router = express.Router();

router.get(
  '/',
  authorizeUser,
  getAllInvoices
);

router.post(
  '/',
  authorizeUser,
  checkSchema(invoiceCreate, ['body']),
  checkValidationResult,
  createInvoice
);


export default router;
