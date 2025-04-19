import {
  checkSchema,
  matchedData,
  validationResult
} from 'express-validator';
import { organizationId } from '../schemas/common.js';


function checkValidationResult(req, res, next) {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({
      error: {
        field: result.array()[0].path,
        value: result.array()[0].value,
        message: result.array()[0].msg,
      }
    });
  }

  return next();
}

async function validateOrgId(req, res, next) {
  await checkSchema(organizationId, ['params']).run(req);

  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({
      error: {
        field: result.array()[0].path,
        value: result.array()[0].value,
        message: result.array()[0].msg,
      }
    });
  }

  return next();
}


export {
  checkValidationResult,
  validateOrgId,
}
