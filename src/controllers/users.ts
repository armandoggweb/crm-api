import { NextFunction, Request, Response } from 'express';
import { generateToken } from '../auth';
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

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findByEmail(req.body.email);
    if (!user) return res.status(404).json('not found');
    if (user.password != req.body.password) return res.status(403).json('forbidden');
    res.status(200).json({ token: generateToken(user) });
  } catch (error) {
    return next(error);
  }
};
