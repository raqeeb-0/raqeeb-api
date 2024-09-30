import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { transporter } from '@lib/mailer.js';
import { PrismaClient } from '@prisma/client';
import { matchedData } from 'express-validator';
import { CustomError } from '@lib/CustomError.js';
import { capitalizeFirstLetter } from '@lib/utils.js';
import { resetPasswordTemplate } from '@lib/templates.js';


const prisma = new PrismaClient();
const tokenExpiresIn = process.env.TOKEN_EXPIRES_IN;
const refreshTokenExpiresIn = process.env.REFRESH_TOKEN_EXPIRES_IN;

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
        email: true,
      }
    });
  
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: tokenExpiresIn * 60,
      }
    );

    const refreshToken = jwt.sign(
      {
        id: user.id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: refreshTokenExpiresIn * 60,
      }
    );

    return res.status(201).json({
      token,
      refreshToken,
      username: user.username,
      expiresIn: `${tokenExpiresIn}m`,
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
        email: true,
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
  
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: tokenExpiresIn * 60,
      }
    );

    const refreshToken = jwt.sign(
      {
        id: user.id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: refreshTokenExpiresIn * 60,
      }
    );

    return res.status(200).json({
      token,
      refreshToken,
      username: user.username,
      expiresIn: `${tokenExpiresIn}m`,
    });
  } catch (err) {
    return next(err);
  }
}

function refreshToken(req, res, next) {
  const { refreshToken } = matchedData(req);

  try {
    const user = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const newAccessToken = jwt.sign(
      {
        id: user.id,
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: tokenExpiresIn * 60,
      }
    );

    const newRefreshToken = jwt.sign(
      {
        id: user.id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: refreshTokenExpiresIn * 60,
      }
    );

    return res.status(200).json({
      token: newAccessToken,
      refreshToken: newRefreshToken,
      expiresIn: `${tokenExpiresIn}m`,
    });
  } catch (err) {
    return next(new CustomError({
      statusCode: 401,
      message: 'Invalid or expired token.'
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

    const token = jwt.sign(
      { id: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: 10 * 60 }
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
      message: 'Password reset link sent to your email'
    });
  } catch (err) {
    return next(err);
  }
}

async function resetPassword (req, res, next) {
  const { token, password } = matchedData(req);

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

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
      message: 'Password reset succeeded'
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
  refreshToken,
  forgotPassword,
  resetPassword,
}
