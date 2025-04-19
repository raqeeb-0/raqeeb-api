import { errorLogger } from '../lib/logger.js';


function errorHandler(err, req, res, next) {
  errorLogger.error({
    client_ip: req.ip,
    endpoint: req.originalUrl,
    message: err.message,
    method: req.method,
    stack: err.stack,
  });

  const isDevelopment = process.env.APP_ENV === 'development';

  if (!err.statusCode) {
    const errorMsg = isDevelopment ? err.message : 'Something went wrong.';

    if (isDevelopment) {
      console.error(err.stack);
    }

    return res.status(500).json({
      error: {
        message: errorMsg,
      }
    });
  }

  let errorMsg;
  if (err.statusCode === 400) {
    errorMsg = 'Bad request.';
  }
  if (err.statusCode === 401) {
    errorMsg = 'Unauthorized.';
  }
  if (err.statusCode === 403) {
    errorMsg = 'Forbidden.';
  }
  if (err.statusCode === 404) {
    errorMsg = 'Resource not found.';
  }
  if (err.statusCode === 409) {
    errorMsg = 'Conflict.';
  }

  if (isDevelopment) {
    console.error(err.stack);
  }

  return res.status(err.statusCode).json({
    error: {
      message: err.message || errorMsg,
    }
  });
}

function notFoundHandler(req, res) {
  res.status(404).json({
    error: {
      message: `Route \`${req.originalUrl}\` not found.`,
    }
  });
}


export {
  errorHandler,
  notFoundHandler,
}
