import {
  NAME_MIN_LEN,
  NAME_MAX_LEN,
  EMAIL_MIN_LEN,
  EMAIL_MAX_LEN
} from '../lib/constants.js';
import { validation } from '../lib/validationMessages.js';


const userUpdate = {
  email: {
    optional: true,
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isString: {
      errorMessage: validation.isStringMsg,
    },
    isEmail: {
      errorMessage: validation.isEmailMsg,
    },
    isLength: {
      options: { min: EMAIL_MIN_LEN, max: EMAIL_MAX_LEN },
      errorMessage: validation.emailLenMsg,
    },
  },
  username: {
    optional: true,
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isString: {
      errorMessage: validation.isStringMsg,
    },
    isLength: {
      options: { min: NAME_MIN_LEN, max: NAME_MAX_LEN },
      errorMessage: validation.nameLenMsg,
    },
  },
  phone: {
    optional: true,
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isString: {
      errorMessage: validation.isStringMsg,
    },
    isMobilePhone: {
      errorMessage: validation.isMobilePhoneMsg,
    },
  },
}


export { userUpdate }
