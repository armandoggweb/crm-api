import { Prisma, Role } from '@prisma/client';
import prisma from '../client';


export const findAll = async (): Promise<object> => {
  return await prisma.user.findMany();
};

export const create = async (user: Prisma.UserCreateInput) => {
  return await prisma.user.create({ data: user });
};

export const update = async (user: Prisma.UserUpdateInput, id: string) => {
  const { email } = user;
  return await prisma.user.update({
    where: {
      id,
    },
    data: {
      email,
    },
  });
};

export const changeRole = async (role: Role, id: string) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data: {
      role,
    },
  });
};

export const remove = async (id: string) =>{
  return await prisma.user.delete({
    where: {
      id,
    },
  });
}