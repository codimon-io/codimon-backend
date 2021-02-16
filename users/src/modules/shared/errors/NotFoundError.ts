import { AbstractError } from "./AbstractError";

export class NotFoundError extends AbstractError {
  statusCode = 404;

  constructor(public message: string = "Not found") {
    super(message);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
