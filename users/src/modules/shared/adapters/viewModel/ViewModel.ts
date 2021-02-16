import { Response } from "express";
import { BadRequestError } from "../../errors/BadRequestError";
import { UnauthorizedError } from "../../errors/UnauthorizedError";
import { ForbiddenError } from "../../errors/ForbiddenError";
import { NotFoundError } from "../../errors/NotFoundError";
import { NotAcceptableError } from "../../errors/NotAcceptableError";
import { ConflictError } from "../../errors/ConflictError";

export class ViewModel {
  constructor(private response: Response) {}

  resolve(statusCode: number, payload: any) {
    this.response.status(statusCode);
    this.response.json(payload);
  }

  resolveOk200(payload: any) {
    this.resolve(200, payload);
  }

  resolveCreated201(payload: any) {
    this.resolve(201, payload);
  }

  resolveAccepted202(payload: any) {
    this.resolve(202, payload);
  }

  resolveNoContent204(payload: any) {
    this.resolve(204, payload);
  }

  resolveAlreadyReported208(payload: any) {
    this.resolve(208, payload);
  }

  rejectBadRequest400(message: string = "Bad Request") {
    throw new BadRequestError(message);
  }

  rejectUnauthorized401(message: string = "Unauthorized") {
    throw new UnauthorizedError(message);
  }

  rejectForbidden403(message: string = "Forbidden") {
    throw new ForbiddenError(message);
  }

  rejectNotFound404(message: string = "Not Found") {
    throw new NotFoundError(message);
  }

  rejectNotAcceptable406(error: any[]) {
    throw new NotAcceptableError(error);
  }

  rejectConflict409(message: string = "Conflict") {
    throw new ConflictError(message);
  }
}