import { create, findAll } from '../models/customer';
import { prismaMock } from '../singleton';

const mockCustomer = {
  id: 'id',
  name: 'nombre',
  surname: 'surname',
  photoUrl: null,
  userId: 'id',
};

test('should show every customer', async () => {

  prismaMock.customer.findMany.mockResolvedValue([mockCustomer])

  await expect(findAll()).resolves.toEqual([
    mockCustomer,
  ]);
});

test('should create a customer', async () =>{
  prismaMock.customer.create.mockResolvedValue(mockCustomer)
  await expect(create({name: 'nombre', surname: 'surname', userId: 'id'})).resolves.toEqual(mockCustomer)
})

test.skip('should not create a customer if a required field is missing', async () =>{
  prismaMock.customer.create.mockRejectedValue(new Error('message'))
  await expect(create({name: 'nombre', surname: 'surname', userId: 'id'})).resolves.toEqual(new Error('mesagge'))
})