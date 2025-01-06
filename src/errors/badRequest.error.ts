import { BaseError } from "./base.error";

// This class represents a Bad Request error, extending from BaseError.
export class BadRequestError extends BaseError {
  constructor(message: string, errors?: any[]) {
    super(message, 400, errors);
  }
}
