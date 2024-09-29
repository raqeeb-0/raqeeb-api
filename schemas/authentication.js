import {
  NAME_MIN_LEN,
  NAME_MAX_LEN,
  EMAIL_MIN_LEN,
  EMAIL_MAX_LEN,
  PASSWORD_MIN_LEN,
  PASSWORD_MAX_LEN
} from '@lib/constants.js';
import { validation } from '@lib/validationMessages.js';


const token = {
  refreshToken: {
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isJWT: {
      errorMessage: 'Invalid token',
    },
  },
}

const userSignup = {
  email: {
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
  password: {
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isString: {
      errorMessage: validation.isStringMsg,
    },
    isLength: {
      options: { min: PASSWORD_MIN_LEN, max: PASSWORD_MAX_LEN },
      errorMessage: validation.passwordLenMsg,
    },
  },
}

const userLogin = {
  email: {
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
  password: {
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isString: {
      errorMessage: validation.isStringMsg,
    },
    isLength: {
      options: { min: PASSWORD_MIN_LEN, max: PASSWORD_MAX_LEN },
      errorMessage: validation.passwordLenMsg,
    },
  },
}

const passwordForget = {
  email: {
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
}

const passwordReset = {
  password: {
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isString: {
      errorMessage: validation.isStringMsg,
    },
    isLength: {
      options: { min: PASSWORD_MIN_LEN, max: PASSWORD_MAX_LEN },
      errorMessage: validation.passwordLenMsg,
    },
  },
  token: {
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isJWT: {
      errorMessage: validation.isJWTMsg,
    }
  },
}


export {
  token,
  userSignup,
  userLogin,
  passwordForget,
  passwordReset,
}
