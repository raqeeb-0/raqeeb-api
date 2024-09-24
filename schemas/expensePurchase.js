import { validation } from '@lib/validationMessages.js';


const expensePurchaseId = {
  expensePurchaseId: {
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isUUID: {
      errorMessage: validation.isUUIDMsg,
    },
  },
}

const expensePurchaseCreate = {
  expenseId: {
    notEmpty: {
      errorMessage: validation.notEmptyMsg,
    },
    isUUID: {
      errorMessage: validation.isUUIDMsg,
    },
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

const expensePurchaseUpdate = structuredClone(expensePurchaseCreate);
Object.keys(expensePurchaseUpdate).forEach(key => {
  expensePurchaseUpdate[key].optional = true;
});


export {
  expensePurchaseId,
  expensePurchaseCreate,
  expensePurchaseUpdate,
}
