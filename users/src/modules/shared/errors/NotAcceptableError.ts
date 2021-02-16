// import { ValidationError } from 'express-validator';
import { AbstractError } from "./AbstractError";

export class NotAcceptableError extends AbstractError {
  statusCode = 406;

  constructor(public errors: any[]) {
    super("Invalid request parameters");

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, NotAcceptableError.prototype);
  }

  serializeErrors() {
    return this.errors.map(err => {
      return { message: err.message, };
    });
  }
}
