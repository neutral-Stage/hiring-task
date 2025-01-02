import { Router } from "express";
import { registerValidator } from "../validators/auth/register.validator";
import { loginValidator } from "../validators/auth/login.validator";
import { AuthController } from "../controllers";

const router = Router();

router.post("/register", registerValidator, AuthController.registerController);
router.post("/login", loginValidator, AuthController.loginController);

export { router as authRouter };
