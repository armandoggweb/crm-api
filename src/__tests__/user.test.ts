import { Role } from '@prisma/client';
import { findByEmail } from '../models/user';
import { prismaMock } from '../singleton';

const mockUser = {
  id: 'id',
  email: 'mail@mail.com',
  password: 'password',
  role: Role.USER,
};

test('should find an user by email if exists', async () => {
  prismaMock.user.findUnique.mockResolvedValue(mockUser);

  await expect(findByEmail('mail@mail.com')).resolves.toEqual(mockUser);
});

test('should not find an user by email if not exists', async () => {
  prismaMock.user.findUnique.mockResolvedValue(null);

  await expect(findByEmail('not@mail.com')).resolves.toEqual(null);
});
