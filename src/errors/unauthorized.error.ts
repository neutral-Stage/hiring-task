import httpStatus from "http-status";
import { CustomError } from "./custom.error";

// This class represents an Unauthorized error, extending from CustomError.
export class UnauthorizedError extends CustomError {
  constructor(message: string, reasonCode?: string) {
    super(message, httpStatus.UNAUTHORIZED, reasonCode);
  }
}
