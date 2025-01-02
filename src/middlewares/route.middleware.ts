import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import httpStatus from "http-status";

export const routeMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};
