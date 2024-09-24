import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { transporter } from '@lib/mailer.js';
import { PrismaClient } from '@prisma/client';
import { matchedData } from 'express-validator';
import { CustomError } from '@lib/CustomError.js';
import { capitalizeFirstLetter } from '@lib/utils.js';
import { resetPasswordTemplate } from '@lib/templates.js';
import { setAuthCookie } from '@middlewares/authCookieSetter.js';


const prisma = new PrismaClient();

async function signup(req, res, next) {
  const {
    email,
    username,
    phone,
    password
  } = matchedData(req);

  try {
    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        phone,
        password: passwordHash,
      },
      select: {
        id: true,
        username: true,
      }
    });

    req.user = user;
    setAuthCookie(req, res, next);

    return res.status(201).json({
      status: 'success',
      message: 'Account created successfully',
      username: user.username,
    });
  } catch (err) {
    if (err.code === 'P2002') {
      const errorMsg = capitalizeFirstLetter(
        `${err.meta.target[0]} already taken.`
      );
      return next(new CustomError({
        statusCode: 409,
        message: errorMsg
      }));
    }
    return next(err);
  }
}

async function login(req, res, next) {
  const { email, password } = matchedData(req);

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        username: true,
        password: true,
      }
    });
    if (!user) {
      throw new CustomError({
        statusCode: 404,
        message: 'Couldn\'t find your account.'
      });
    }

    const isCorrectPassword = await bcrypt.compare(
      password,
      user.password
    );
    if (!isCorrectPassword) {
      throw new CustomError({
        statusCode: 401,
        message: 'Wrong password.'
      });
    }

    req.user = user;
    setAuthCookie(req, res, next);

    return res.status(200).json({
      status: 'success',
      message: 'Logged in successfully.',
      username: user.username,
    });
  } catch (err) {
    return next(err);
  }
}

function logout(req, res) {
  res.clearCookie('authorization');
  return res.status(200).json({
    status: 'success',
    message: 'Logged out successfully'
  });
}

function isLoggedin(req, res, next) {
  const token = req.cookies.authorization;

  if (!token) {
    return next(new CustomError({
      statusCode: 401
    }));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return res.status(200).json({
      status: 'success',
      username: decoded.username,
    })
  } catch (err) {
    return next(new CustomError({
      statusCode: 401,
      message: err.message
    }));
  }
}

async function forgotPassword(req, res, next) {
  const { email } = matchedData(req);

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new CustomError({
        statusCode: 404,
        message: 'Couldn\'t find your account.'
      });
    }

    const expiryPeriodInMinutes = 10;
    const milliSecondsPerMinute = 60 * 1000;

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: expiryPeriodInMinutes * milliSecondsPerMinute }
    );

    const htmlTemplate = resetPasswordTemplate({
      receiverName: user.username,
      senderName: process.env.SENDER_NAME,
      resetUrl: `${process.env.CLIENT_URL}/auth/reset-password/${token}`,
    })
    const mailOptions = {
      from: `"${process.env.SENDER_NAME}" <${process.env.SENDER_EMAIL}>`,
      to: user.email,
      subject: 'Password Reset Request',
      html: htmlTemplate,
    };
    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      status: 'success',
      message: 'Password reset link sent to email'
    });
  } catch (err) {
    return next(err);
  }
}

async function resetPassword (req, res, next) {
  const { token, password } = matchedData(req);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const passwordHash = await bcrypt.hash(password, 12);
    await prisma.user.update({
      where: {
        id: decoded.id
      },
      data: {
        password: passwordHash,
      }
    });

    return res.status(200).json({
      status: 'success',
      message: 'Password reset successful'
    });
  } catch (err) {
    if (err.message === 'jwt expired') {
      return next(new CustomError({
        statusCode: 400,
        message: 'Invalid token.'
      }));
    }
    return next(err);
  }
}


export {
  signup,
  login,
  logout,
  isLoggedin,
  forgotPassword,
  resetPassword,
}
