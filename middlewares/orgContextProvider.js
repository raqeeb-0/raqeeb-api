import jwt from 'jsonwebtoken';
import { CustomError } from '@lib/CustomError.js';


function getOrgContext(req, res, next) {
  const token = req.cookies.context;

  if (!token) {
    return next(new CustomError({
      statusCode: 400,
      message: 'Organization context not found. Please select an organization.',
    }));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.params.organizationId = decoded.organizationId;

    return next();
  } catch (err) {
    return next(new CustomError({
      statusCode: 400,
      message: err.message
    }));
  }
}


export { getOrgContext }
