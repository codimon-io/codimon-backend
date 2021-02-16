import { AbstractError } from "./AbstractError";

export class BadRequestError extends AbstractError {
  statusCode = 400;

  constructor(public message: string = "Bad Request") {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
