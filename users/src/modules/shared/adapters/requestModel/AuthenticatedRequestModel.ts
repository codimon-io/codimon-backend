import { Request } from "express";
import { IDType } from "../../entities/types";

export interface IAuthenticatedRequest extends Request {
  user: {
    userId: IDType;
  };
}