import {
  NAME_MIN_LEN,
  NAME_MAX_LEN,
  NOTE_MIN_LEN,
  NOTE_MAX_LEN
} from '@lib/constants.js';
import { validation } from '@lib/validationMessages.js';


const productId = {
  productId: {
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isUUID: {
      errorMessage: validation.isUUIDMsg,
    },
  },
}

// Keep in mind the update object below
const productCreate = {
  image: {
    optional: true,
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
  },
  'image.data': {
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isBase64: {
      errorMessage: validation.isBase64,
    },
  },
  'image.name': {
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isString: {
      errorMessage: validation.isStringMsg,
    },
  },
  'image.type': {
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isString: {
      errorMessage: validation.isStringMsg,
    },
  },
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
  profitPercent: {
    optional: true,
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isFloat: {
      errorMessage: validation.isFloatMsg,
    },
    toFloat: true,
  },
  indirectCostPercent: {
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
  materials: {
    optional: true,
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
  },
  'materials.*.id': {
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isUUID: {
      errorMessage: validation.isUUIDMsg,
    },
  },
  'materials.*.quantity': {
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isFloat: {
      errorMessage: validation.isFloatMsg,
    },
    toFloat: true,
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

const productUpdate = structuredClone(productCreate);
productUpdate.name.optional = true;
productUpdate.categoryId.optional = true;


export {
  productId,
  productCreate,
  productUpdate,
}
