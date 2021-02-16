import { AbstractError } from "./AbstractError";

export class UnauthorizedError extends AbstractError {
  statusCode = 401;

  constructor(public message: string = "Not Authorized") {
    super(message);

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
