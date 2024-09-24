import {
  NAME_MIN_LEN,
  NAME_MAX_LEN
} from '@lib/constants.js';
import { validation } from '@lib/validationMessages.js';


const organizationCreate = {
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

const organizationUpdate = structuredClone(organizationCreate);
Object.keys(organizationUpdate).forEach(key => {
  organizationUpdate[key].optional = true;
});


export {
  organizationCreate,
  organizationUpdate,
}
