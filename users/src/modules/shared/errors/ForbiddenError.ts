import { AbstractError } from "./AbstractError";

export class ForbiddenError extends AbstractError {
  statusCode = 403;

  constructor(public message: string = "Forbidden") {
    super(message);

    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
