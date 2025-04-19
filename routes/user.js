import express from 'express';
import { checkSchema } from 'express-validator';
import { authorizeUser } from '../middlewares/authorization.js';
import { userId } from '../schemas/common.js';
import {
  userUpdate
} from '../schemas/user.js';
import {
  checkValidationResult
} from '../middlewares/validation.js';
import {
  deleteUser,
  updateUser,
  getUser
} from '../services/user.js';


const router = express.Router();

router.get(
  '/',
  authorizeUser,
  checkSchema(userId, ['params']),
  checkValidationResult,
  getUser
);

router.patch(
  '/',
  authorizeUser,
  checkSchema(userId, ['params']),
  checkSchema(userUpdate, ['body']),
  checkValidationResult,
  updateUser
);

router.delete(
  '/',
  authorizeUser,
  checkSchema(userId, ['params']),
  checkValidationResult,
  deleteUser
);


export default router;
