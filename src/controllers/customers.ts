import { Request, Response } from 'express';
import { prisma } from './index';

export default {
  list: async (req: Request, res: Response) => {
    const customer = await prisma.customer.findMany();
    res.json(customer);
  },
  // create: async (req: Request, res: Response) => {
  //   const customer = await prisma.customer.create({data:{}}) 
  // },
};
