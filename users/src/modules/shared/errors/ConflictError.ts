import { AbstractError } from "./AbstractError";

export class ConflictError extends AbstractError {
  statusCode = 409;

  constructor(public message: string = "Conflict") {
    super(message);

    Object.setPrototypeOf(this, ConflictError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
