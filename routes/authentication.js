import express from 'express';
import { checkSchema } from 'express-validator';
import {
  passwordReset,
  passwordForget,
  userLogin,
  userSignup,
  token
} from '../schemas/authentication.js';
import {
  checkValidationResult
} from '../middlewares/validation.js';
import {
  resetPassword,
  forgotPassword,
  refreshToken,
  login,
  signup
} from '../services/authentication.js';


const router = express.Router();

router.post(
  '/signup',
  checkSchema(userSignup, ['body']),
  checkValidationResult,
  signup
);

router.post(
  '/login',
  checkSchema(userLogin, ['body']),
  checkValidationResult,
  login
);

router.post(
  '/refresh-token',
  checkSchema(token, ['body']),
  checkValidationResult,
  refreshToken
);

router.post(
  '/forgot-password',
  checkSchema(passwordForget, ['body']),
  checkValidationResult,
  forgotPassword
);

router.post(
  '/reset-password/:token',
  checkSchema(passwordReset, ['params', 'body']),
  checkValidationResult,
  resetPassword
)


export default router;
