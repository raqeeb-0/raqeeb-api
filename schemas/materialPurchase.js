import { validation } from '@lib/validationMessages.js';


const materialPurchaseId = {
  materialPurchaseId: {
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isUUID: {
      errorMessage: validation.isUUIDMsg,
    },
  },
}

const materialPurchaseCreate = {
  materialId: {
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isUUID: {
      errorMessage: validation.isUUIDMsg,
    },
  },
  quantity: {
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isFloat: {
      errorMessage: validation.isFloatMsg,
    },
    toFloat: true,
  },
  price: {
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isFloat: {
      errorMessage: validation.isFloatMsg,
    },
    toFloat: true,
  },
  supplierId: {
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isUUID: {
      errorMessage: validation.isUUIDMsg,
    },
  }
}

const materialPurchaseUpdate = structuredClone(materialPurchaseCreate);
Object.keys(materialPurchaseUpdate).forEach(key => {
  materialPurchaseUpdate[key].optional = true;
});


export {
  materialPurchaseId,
  materialPurchaseCreate,
  materialPurchaseUpdate,
}
