import {
  NOTE_MIN_LEN,
  NOTE_MAX_LEN,
  NAME_MIN_LEN,
  NAME_MAX_LEN
} from '@lib/constants.js';
import { validation } from '@lib/validationMessages.js';


const supplierId = {
  supplierId: {
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isUUID: {
      errorMessage: validation.isUUIDMsg,
    },
  },
}

const supplierCreate = {
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
  address: {
    optional: true,
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isString: {
      errorMessage: validation.isStringMsg,
    },
    isLength: {
      options: { min: NOTE_MIN_LEN, max: NOTE_MAX_LEN },
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
}

const supplierUpdate = structuredClone(supplierCreate);
Object.keys(supplierUpdate).forEach(key => {
  supplierUpdate[key].optional = true;
});


export {
  supplierId,
  supplierCreate,
  supplierUpdate,
}
