import { User } from "@prisma/client";
import { Request } from "express";

export interface customRequest extends Request {
  user: User;
}

export interface Value {
  data: User;
}