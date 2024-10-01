import express from 'express';
import { checkSchema } from 'express-validator';
import { authorizeAdmin } from '@middlewares/authorization.js';
import {

} from '@schemas/admin.js';
import {
  checkValidationResult
} from '@middlewares/validation.js';
import {
  getAllUsers,
  getAllPurchaseItems,
  getInventory,
  deleteAllUsers,
  deleteAllOrganizations,
  deleteAllPurchaseItems
} from '@services/admin.js';


const router = express.Router();

router.post(
  '/get-users',
  authorizeAdmin,
  getAllUsers
);

router.post(
  '/get-purchase-items',
  authorizeAdmin,
  getAllPurchaseItems
);

router.post(
  '/get-inventory',
  authorizeAdmin,
  getInventory
);

router.post(
  '/delete-users',
  authorizeAdmin,
  deleteAllUsers
);

router.post(
  '/delete-organizations',
  authorizeAdmin,
  deleteAllOrganizations
);

router.post(
  '/delete-purchase-items',
  authorizeAdmin,
  deleteAllPurchaseItems
);


export default router;
