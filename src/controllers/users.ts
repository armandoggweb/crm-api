import { NextFunction, Request, Response } from 'express';

import models from '../models';

const { User } = models;

export const list = async (req: Request, res: Response) => {
  const users = await User.findAll();
  return res.json(users);
};

export const create = async (req: Request, res: Response) => {
  const user = await User.create(req.body);
  return res.json(user);
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.update(req.body, id);
  return res.json(user);
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const user = await User.remove(id);
    return res.json(user);
  } catch (e) {
    next(e);
  }
};

export const changeRole = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const user = await User.changeRole(req.body.role, id);
    return res.json(user);
  } catch (e) {
    next(e);
  }
};
