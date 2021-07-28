import { Role } from '@prisma/client';
import request from 'supertest';
import app from '../../app';
import { prismaMock } from '../../singleton';

jest.mock('../../auth');

const mockNewUser = {
  email: 'email@email.com',
  password: 'password',
  role: 'USER',
};
const mockExistingUser = {
  id: 'random_id',
  email: 'email@email.com',
  password: 'password',
  role: Role.USER,
};

beforeEach(() => {
  jest.resetAllMocks();
});

describe('GET /users', () => {
  test('should not list the users if admin is not log in', async () => {
    const response = await request(app).get('/users');
    expect(response.statusCode).not.toBe(200);
    expect(prismaMock.user.findMany).not.toHaveBeenCalled();
  });
  test('should not list the users if a non admin user is log in', async () => {
    const response = await request(app).get('/users').set('Authorization', 'Bearer USER.token');
    expect(response.statusCode).toBe(401);
    expect(prismaMock.user.findMany).not.toHaveBeenCalled();
  });
  test('should list the users if admin is log in', async () => {
    const response = await request(app).get('/users').set('Authorization', 'Bearer ADMIN.token');
    expect(response.statusCode).toBe(200);
    expect(prismaMock.user.findMany).toHaveBeenCalled();
  });
});

describe('POST /users', () => {
  test('should not create an user if admin is not log in', async () => {
    const response = await request(app).post('/users').send(mockNewUser);
    expect(response.statusCode).not.toBe(200);
    expect(prismaMock.user.create).not.toHaveBeenCalled();
  });
  test('should not create an user if a non admin user is log in', async () => {
    const response = await request(app).post('/users').set('Authorization', 'Bearer USER.token').send(mockNewUser);
    expect(response.statusCode).toBe(401);
    expect(prismaMock.user.create).not.toHaveBeenCalled();
  });
  test('should create an user if admin is log in', async () => {
    const response = await request(app).post('/users').set('Authorization', 'Bearer ADMIN.token').send(mockNewUser);
    expect(response.statusCode).toBe(200);
    expect(prismaMock.user.create).toHaveBeenCalled();
  });
});

describe ('PUT /users/:id', () => {
  test('should not update an user if admin is not log in', async () => {
    const response = await request(app).put('/users/random_id').send(mockNewUser);
    expect(response.statusCode).toBe(500);
    expect(prismaMock.user.update).not.toHaveBeenCalled();
  });
  test('should not update an user if a non admin user is log in', async () => {
    const response = await request(app).put('/users/random_id').set('Authorization', 'Bearer USER.token').send(mockExistingUser);
    expect(response.statusCode).toBe(401);
    expect(prismaMock.user.update).not.toHaveBeenCalled();
  });
  test('should update an user if admin is log in', async () => {
    const response = await request(app).put('/users/random_id').set('Authorization', 'Bearer ADMIN.token').send(mockExistingUser);
    expect(response.statusCode).toBe(200);
    expect(prismaMock.user.update).toHaveBeenCalled();
  });
});

describe ('PUT /users/:id', () => {
  test('should not remove an user if admin is not log in', async () => {
    const response = await request(app).put('/users/random_id').send(mockNewUser);
    expect(response.statusCode).toBe(500);
    expect(prismaMock.user.delete).not.toHaveBeenCalled();
  });
  test('should not remove an user if a non admin user is log in', async () => {
    const response = await request(app).put('/users/random_id').set('Authorization', 'Bearer USER.token').send(mockExistingUser);
    expect(response.statusCode).toBe(401);
    expect(prismaMock.user.delete).not.toHaveBeenCalled();
  });
  test('should remove an user if admin is log in', async () => {
    const response = await request(app).delete('/users/random_id').set('Authorization', 'Bearer ADMIN.token').send(mockExistingUser);
    expect(response.statusCode).toBe(200);
    expect(prismaMock.user.delete).toHaveBeenCalled();
  });
});
