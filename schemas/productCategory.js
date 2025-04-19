import {
  NAME_MIN_LEN,
  NAME_MAX_LEN
} from '../lib/constants.js';
import { validation } from '../lib/validationMessages.js';


const categoryId = {
  categoryId: {
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isUUID: {
      errorMessage: validation.isUUIDMsg,
    },
  },
}

const categoryCreate = {
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
}

const categoryUpdate = structuredClone(categoryCreate);
Object.keys(categoryUpdate).forEach(key => {
  categoryUpdate[key].optional = true;
});


export {
  categoryId,
  categoryCreate,
  categoryUpdate,
}
