import { validation } from '@lib/validationMessages.js';


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
      options: { min: 1, max: 30 },
      errorMessage: validation.nameLenMsg,
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
  }
}


export {
  invoiceCreate,
}
