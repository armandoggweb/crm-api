import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

export const errorHandler = (err: any, req: Request, res: Response) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2025') {
      res
        .status(400)
        .json({
          status: 400,
          message: 'Bad Request',
        });
      return;
    }
    if (err.code === 'P2003') {
      res
        .status(403)
        .json({
          status: 403,
          message: 'Forbbiden',
        });
      return;
    }
    res.status(404).json(err);
    return;
  }
  if (err instanceof Prisma.PrismaClientValidationError) {
    res.status(400).json({ status: 400, message: 'Invalid input data' });
    return;
  }
  res.status(500).json({ status: 500, message: 'Internal Server Error' });
};
