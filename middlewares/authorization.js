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
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    req.params.userId = decoded.id;

    return next();
  } catch (err) {
    return next(new CustomError({
      statusCode: 403,
      message: 'Invalid or expired token.'
    }));
  }
}

function authorizeAdmin(req, res, next) {
  const { email, password } = req.body;

  if (!email && !password) {
    return next(
      new CustomError({
        status: 400,
        message: 'Crendentials not provided'
      })
    );
  }

  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    return next();
  }

  return next(
    new CustomError({
      status: 401,
      message: 'Access denied'
    })
  );
}


export {
  authorizeUser,
  authorizeAdmin,
}
