import { PrismaClient } from '@prisma/client';

import users from './users';
import customers from './customers';

const prisma = new PrismaClient();

export { prisma };

export default {
  users,
  customers,
};
