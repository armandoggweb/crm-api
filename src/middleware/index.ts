import { Role } from "@prisma/client";
import { NextFunction, Response } from "express";
import { customRequest } from "../types";

export const isAdmin = (req: customRequest, res: Response, next: NextFunction) =>{
  if(req.user.role === Role.ADMIN){
    next()
    return
  }

  return res.status(401).json('Insufficient privileges')
}