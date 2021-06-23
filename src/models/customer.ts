import { Prisma } from '@prisma/client';
import prisma from '../client';

export const findAll = async (): Promise<object> => {
  return await prisma.customer.findMany();
};

export const create = async (customer: Prisma.CustomerUncheckedCreateInput) => {
  return await prisma.customer.create({ data: customer });
};

export const update = async (customer: Prisma.CustomerUncheckedUpdateInput, id: string) => {
  const { name, surname, photoUrl, userId } = customer;
  return await prisma.customer.update({
    where: {
      id,
    },
    data: {
      name,
      surname,
      photoUrl,
      userId,
    },
  });
};

export const remove = async (id: string) => {
  return await prisma.customer.delete({
    where: {
      id,
    },
  });
};
