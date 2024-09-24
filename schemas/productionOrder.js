import {
  NAME_MIN_LEN,
  NAME_MAX_LEN,
  PRODUCTION_ORDER_STATUS_OPTIONS
} from '@lib/constants.js';
import { validation } from '@lib/validationMessages.js';


const productionOrderId = {
  productionOrderId: {
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isUUID: {
      errorMessage: validation.isUUIDMsg,
    },
  },
}

const productionOrderCreate = {
  productId: {
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isUUID: {
      errorMessage: validation.isUUIDMsg,
    },
  },
  count: {
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isInt: {
      errorMessage: validation.isIntMsg,
    },
    toInt: true,
  }
}

const productionOrderUpdate = {
  status: {
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isIn: {
      options: [PRODUCTION_ORDER_STATUS_OPTIONS],
      errorMessage: validation.isInMsg + PRODUCTION_ORDER_STATUS_OPTIONS.join(', '),
    }
  }
}


export {
  productionOrderId,
  productionOrderCreate,
  productionOrderUpdate,
}
