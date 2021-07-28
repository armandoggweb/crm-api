import { User } from '@prisma/client';
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { customRequest, Value } from '../types';

const tokenSecret: string = process.env.JWT_SECRET_KEY as string;

export const generateToken = (user: User) => {
  return jwt.sign({ data: user }, tokenSecret, { expiresIn: '5m' });
};

export const verifyToken = (req: customRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) return res.status(403).json({ error: 'Token is needed for authentication' });

  jwt.verify(token.split(' ')[1], tokenSecret, (err, value: Value) => {
    if (err) return res.status(500).json({ error: 'failed to authenticate token' });
    req.user = value.data;
    next();
    return;
  });
};
