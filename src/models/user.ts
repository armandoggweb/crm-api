import { Prisma, Role } from '@prisma/client';
import prisma from '../client';

interface UserCustomSelect {
  id: string;
  email: string;
  role: Role;
}

export const findAll = async (): Promise<Array<UserCustomSelect>> => {
  return await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      role: true,
    },
  });
};

export const findByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
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

export const remove = async (id: string) => {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
};
