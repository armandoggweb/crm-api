import { NextFunction } from 'express';

export const verifyToken = (req: any, res: any, next: NextFunction) => {
  const token = req.headers.authorization.split(' ')[1]
  if (!token) return res.status(403);
  const tokenRole = token.split('.')
  if (tokenRole[1] == 'token') {
    req.user = {role: tokenRole[0]};
    next();
    return;
  }
  return res.status(403);
};
