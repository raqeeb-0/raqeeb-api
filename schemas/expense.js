import {
  NAME_MIN_LEN,
  NAME_MAX_LEN,
  NOTE_MIN_LEN,
  NOTE_MAX_LEN
} from '@lib/constants.js';
import { validation } from '@lib/validationMessages.js';


const expenseId = {
  expenseId: {
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isUUID: {
      errorMessage: validation.isUUIDMsg,
    },
  },
}

const expenseCreate = {
  name: {
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
  price: {
    optional: true,
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isFloat: {
      errorMessage: validation.isFloatMsg,
    },
    toFloat: true,
  },
  notes: {
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
  categoryId: {
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isUUID: {
      errorMessage: validation.isUUIDMsg,
    },
  }
}

const expenseUpdate = structuredClone(expenseCreate);
Object.keys(expenseUpdate).forEach(key => {
  expenseUpdate[key].optional = true;
});


export {
  expenseId,
  expenseCreate,
  expenseUpdate,
}
