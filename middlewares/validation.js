import { validationResult } from 'express-validator';


export function validate(req, res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    next()
  } else {
    res.status(400).json({
      error: {
        field: result.array()[0].path,
        value: result.array()[0].value,
        message: result.array()[0].msg,
      }
    });
  }
}
