import Redis from 'ioredis';
import { CustomError } from '../lib/CustomError.js';


let redis;

try {
  redis = new Redis(process.env.REDIS_URL, {
    retryStrategy: () => null,
  });

  redis.on('connect', () => {
    console.log('Successfully connected to Redis!');
  });

  redis.on('error', () => {
    console.error('Failed to connect to Redis.');
    redis.disconnect();
  });

} catch (err) {
  console.error('Failed to initialize Redis:', err.message);
}

async function rateLimiter(req, res, next)  {
  try {
    const ip =
      req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    const requests = await redis.incr(ip);

    if (requests === 1) {
      await redis.expire(ip, 60);
    }

    if (requests > process.env.MAX_REQUESTS_PER_MIN) {
      return next(
        new CustomError({
          statusCode: 429,
          message: 'Too many requests. Please wait and try again.',
        })
      );
    }

    return next();
  } catch (err) {
    return next(err);
  }
}


export { rateLimiter }
