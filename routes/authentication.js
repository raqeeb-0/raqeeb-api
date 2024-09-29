import express from 'express';
import { checkSchema } from 'express-validator';
import {
  passwordReset,
  passwordForget,
  userLogin,
  userSignup,
  token
} from '@schemas/authentication.js';
import { validate } from '@middlewares/validation.js';
import {
  resetPassword,
  forgotPassword,
  refreshToken,
  login,
  signup
} from '@services/authentication.js';


const router = express.Router();

router.post(
  '/signup',
  checkSchema(userSignup, ['body']),
  validate,
  signup
);

router.post(
  '/login',
  checkSchema(userLogin, ['body']),
  validate,
  login
);

router.post(
  '/refresh-token',
  checkSchema(token, ['body']),
  validate,
  refreshToken
);

router.post(
  '/forgot-password',
  checkSchema(passwordForget, ['body']),
  validate,
  forgotPassword
);

router.post(
  '/reset-password/:token',
  checkSchema(passwordReset, ['params', 'body']),
  validate,
  resetPassword
)


export default router;
