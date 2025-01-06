import { BaseError } from "./base.error";

// This class represents a Not Found error, extending from BaseError.
export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message, 404);
  }
}
