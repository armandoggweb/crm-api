import { NextFunction, Request, Response } from 'express';
import formidable from 'formidable';

import prisma from '../client';
import models from '../models';

const { Customer } = models;

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customer = await Customer.findAll();
    return res.json(customer);
  } catch (error) {
    return next(error);
  }
};

export const customerInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const customer = await prisma.customer.findUnique({
      where: {
        id,
      },
    });

    if (customer) return res.json(customer);
    return res.status(404).json('Customer not found');
  } catch (error) {
    return next(error);
  }
};

export const create = (req: Request, res: Response, next: NextFunction) => {
  const form = formidable({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }

    const userId = '942b8466-6f3b-45c6-aa16-b1006db28c7';
    const photo: any = { ...files.photo };
    const url: string = photo.path;
    try {
      const customer = await Customer.create({
        name: fields.name?.toString(),
        surname: fields.surname?.toString(),
        photoUrl: url,
        userId,
      });

      res.json(customer);
    } catch (error) {
      return next(error);
    }
  });
};

export const update = (req: Request, res: Response, next: NextFunction) => {
  const form = formidable({ multiples: true });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    const photo: any = { ...files.photo };
    const id: string = req.params.id;
    const data = {
      userId: '942b8466-6f3b-45c6-aa16-b1006db28c70',
      name: fields.name?.toString(),
      surname: fields.surname?.toString(),
      photoUrl: photo.path,
    };

    try {
      const customer = await Customer.update(data, id);
      res.json(customer);
    } catch (e) {
      return next(e);
    }
  });
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customer = await Customer.remove(req.params.id);
    res.json(customer);
  } catch (e) {
    next(e);
  }
};
