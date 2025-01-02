import { registerValidator } from "./register.validator";
import { loginValidator } from "./login.validator";

export class AuthValidator {
  static registerValidator = registerValidator;
  static loginValidator = loginValidator;
}
