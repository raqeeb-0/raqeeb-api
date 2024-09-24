import jwt from 'jsonwebtoken';
import { CustomError } from '@lib/CustomError.js';


function authorizeUser(req, res, next) {
  const token = req.cookies.authorization;

  if (!token) {
    return next(new CustomError({
      statusCode: 401
    }));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.params.userId = decoded.id;

    return next();
  } catch (err) {
    return next(new CustomError({
      statusCode: 401,
      message: err.message
    }));
  }
}


export {
  authorizeUser,
}
