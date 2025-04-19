import express from 'express';
import { checkSchema } from 'express-validator';
import { authorizeUser } from '../middlewares/authorization.js';
import {
  saleUpdate,
  saleCreate,
  saleId
} from '../schemas/sale.js';
import {
  checkValidationResult
} from '../middlewares/validation.js';
import {
  deleteSale,
  updateSale,
  createSale,
  getSale,
  getAllSales
} from '../services/sale.js';


const router = express.Router();

router.get(
  '/',
  authorizeUser,
  getAllSales
);

router.get(
  '/:saleId',
  authorizeUser,
  checkSchema(saleId, ['params']),
  checkValidationResult,
  getSale
);

router.post(
  '/',
  authorizeUser,
  checkSchema(saleCreate, ['body']),
  checkValidationResult,
  createSale
);

router.patch(
  '/:saleId',
  authorizeUser,
  checkSchema(saleId, ['params']),
  checkSchema(saleUpdate, ['body']),
  checkValidationResult,
  updateSale
);

router.delete(
  '/:saleId',
  authorizeUser,
  checkSchema(saleId, ['params']),
  checkValidationResult,
  deleteSale
);


export default router;
