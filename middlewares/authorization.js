import jwt from 'jsonwebtoken';
import { CustomError } from '@lib/CustomError.js';


function authorizeUser(req, res, next) {
  const authHeader = req.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return next(new CustomError({
      statusCode: 401,
      message: 'Access denied. No token provided.'
    }));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.params.userId = decoded.id;

    return next();
  } catch (err) {
    return next(new CustomError({
      statusCode: 403,
      message: 'Invalid or expired token.'
    }));
  }
}


export {
  authorizeUser,
}
