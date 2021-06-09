import { Request, Response } from 'express';
import { prisma } from './index';

export default {
  create: async (req: Request, res: Response) => {
    const user = await prisma.user.create({
      data: {
        email: 'mail@mail.com',
        password: ' password',
      },
    });
    res.json(user);
  },
};
