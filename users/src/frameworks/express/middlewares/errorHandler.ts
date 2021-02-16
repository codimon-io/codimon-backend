import { Request, Response, NextFunction } from 'express';
import { AbstractError } from '../../../modules/shared/errors/AbstractError';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AbstractError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  // tslint:disable-next-line:no-console
  console.error(err);
  res.status(400).send({
    errors: [{ message: 'Something went wrong' }],
  });
};
