import {
  NAME_MIN_LEN,
  NAME_MAX_LEN,
  NOTE_MIN_LEN,
  NOTE_MAX_LEN,
  EMAIL_MIN_LEN,
  EMAIL_MAX_LEN,
  PASSWORD_MIN_LEN,
  PASSWORD_MAX_LEN
} from '@lib/constants.js';


const validation = {
  isJWTMsg: 'Not a valid token.',
  isUUIDMsg: 'Not a valid UUID.',
  isIntMsg: 'Not a valid number',
  isDate: 'Not a valid date format.',
  isStringMsg: 'Not a valid string.',
  notEmptyMsg: 'Should be not empty.',
  isEmailMsg: 'Not a valid email format.',
  isBase64: 'Not a valid image base64 string',
  isMobilePhoneMsg: 'Not a valid phone number.',
  isFloatMsg: 'Not a valid floating point number',
  isInMsg: 'Not available status option. Choose between: ',
  nameLenMsg: `Should be between ${NAME_MIN_LEN} and ${NAME_MAX_LEN} characters long.`,
  noteLenMsg: `Should be between ${NOTE_MIN_LEN} and ${NOTE_MAX_LEN} characters long.`,
  emailLenMsg: `Should be between ${EMAIL_MIN_LEN} and ${EMAIL_MAX_LEN} characters long.`,
  passwordLenMsg: `Should be between ${PASSWORD_MIN_LEN} and ${PASSWORD_MAX_LEN} characters long.`,
}


export { validation }
