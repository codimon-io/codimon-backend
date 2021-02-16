import { Request, Response } from "express";
import Joi from "joi";
import { NotAcceptableError } from "../../errors/NotAcceptableError";

export function validateBody(schema: Joi.ObjectSchema) {
  return (request: Request, response: Response, next: () => void) => {
    const { error, value } = schema.validate(request.body);
    if (error) {
      throw new NotAcceptableError([
        {
          message: error.message,
        }
      ]);
    } else {
      request.body = value;
      next();
    }
  }
}