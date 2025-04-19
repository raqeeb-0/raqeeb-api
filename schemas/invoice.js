import {
  NOTE_MIN_LEN,
  NOTE_MAX_LEN,
  INVOICE_REF_MIN_LEN,
  INVOICE_REF_MAX_LEN
} from '../lib/constants.js';
import { validation } from '../lib/validationMessages.js';


const invoiceId = {
  invoiceId: {
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isUUID: {
      errorMessage: validation.isUUIDMsg,
    },
  },
}

const invoiceCreate = {
  effectiveDate: {
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isDate: {
      errorMessage: validation.isDate,
    },
  },
  invoiceNumber: {
    optional: true,
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isString: {
      errorMessage: validation.isStringMsg,
    },
    isLength: {
      options: { min: INVOICE_REF_MIN_LEN, max: INVOICE_REF_MAX_LEN },
      errorMessage: validation.invoiceRefLenMsg,
    },
  },
  supplierId: {
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isUUID: {
      errorMessage: validation.isUUIDMsg,
    },
  },
  totalAmount: {
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isFloat: {
      errorMessage: validation.isFloatMsg,
    },
    toFloat: true,
  },
  purchaseItems: {
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    }
  },
  'purchaseItems.*.id': {
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isUUID: {
      errorMessage: validation.isUUIDMsg,
    },
  },
  'purchaseItems.*.description': {
    optional: true,
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isString: {
      errorMessage: validation.isStringMsg,
    },
    isLength: {
      options: { min: NOTE_MIN_LEN, max: NOTE_MAX_LEN },
      errorMessage: validation.noteLenMsg,
    },
  },
  'purchaseItems.*.quantity': {
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isFloat: {
      errorMessage: validation.isFloatMsg,
    },
    toFloat: true,
  },
  'purchaseItems.*.price': {
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isFloat: {
      errorMessage: validation.isFloatMsg,
    },
    toFloat: true,
  },
  'purchaseItems.*.amount': {
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isFloat: {
      errorMessage: validation.isFloatMsg,
    },
    toFloat: true,
  },
}


export {
  invoiceId,
  invoiceCreate,
}
