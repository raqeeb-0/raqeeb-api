import {
  NAME_MIN_LEN,
  NAME_MAX_LEN,
  NOTE_MIN_LEN,
  NOTE_MAX_LEN,
  PURCHASE_ITEM_TYPES
} from '@lib/constants.js';
import { validation } from '@lib/validationMessages.js';


const purchaseItemId = {
  purchaseItemId: {
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isUUID: {
      errorMessage: validation.isUUIDMsg,
    },
  },
}

const purchaseItemCreate = {
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
  type: {
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isIn: {
      options: [PURCHASE_ITEM_TYPES],
      errorMessage: validation.isInMsg + PURCHASE_ITEM_TYPES.join(', '),
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

const purchaseItemUpdate = structuredClone(purchaseItemCreate);
Object.keys(purchaseItemUpdate).forEach(key => {
  purchaseItemUpdate[key].optional = true;
});


export {
  purchaseItemId,
  purchaseItemCreate,
  purchaseItemUpdate,
}
