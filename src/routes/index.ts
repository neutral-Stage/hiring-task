import { Router } from "express";
import { authRouter } from "./authRouter";
import { todoRouter } from "./todoRouter";

export const router = Router();

router.use("/auth", authRouter);
router.use("/todos", todoRouter);
