import { BaseError } from "./base.error";

export class BadRequestError extends BaseError {
  constructor(message: string, errors?: any[]) {
    super(message, 400, errors);
  }
}
