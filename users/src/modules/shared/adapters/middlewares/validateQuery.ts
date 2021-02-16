import { Request, Response } from "express";
import Joi from "joi";
import { NotAcceptableError } from "../../errors/NotAcceptableError";

export function validateQuery(schema: Joi.ObjectSchema) {
  return (request: Request, response: Response, next: () => void) => {
    const { error, value } = schema.validate(request.query);
    if (error) {
      throw new NotAcceptableError([
        {
          message: error.message,
        }
      ]);
    } else {
      request.query = value;
      next();
    }
  }
}