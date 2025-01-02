import { body } from "express-validator";
import { validate } from "../index";

export const loginValidator = validate([
  body("email").isEmail().withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("Password is required"),
]);
