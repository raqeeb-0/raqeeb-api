import {
  NAME_MIN_LEN,
  NAME_MAX_LEN,
  NOTE_MIN_LEN,
  NOTE_MAX_LEN
} from '@lib/constants.js';
import { validation } from '@lib/validationMessages.js';


const materialId = {
  materialId: {
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isUUID: {
      errorMessage: validation.isUUIDMsg,
    },
  },
}

const materialCreate = {
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

const materialUpdate = structuredClone(materialCreate);
Object.keys(materialUpdate).forEach(key => {
  materialUpdate[key].optional = true;
});


export {
  materialId,
  materialCreate,
  materialUpdate,
}
