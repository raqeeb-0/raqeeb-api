import jwt from 'jsonwebtoken';


function setAuthCookie(req, res, next) {
  const user = req.user;

  const milliSecondsPerDay = 24 * 60 * 60 * 1000;
  const expiryPeriodInDays = process.env.JWT_EXPIRY_PERIOD_IN_DAYS;
  const expiryPeriodInMilliSeconds = expiryPeriodInDays * milliSecondsPerDay;

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: expiryPeriodInMilliSeconds,
    }
  );

  return res.cookie(
    'authorization',
    token,
    {
      maxAge: expiryPeriodInMilliSeconds,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    }
  );
}


export { setAuthCookie }
