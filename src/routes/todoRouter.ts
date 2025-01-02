import { Router } from "express";
import { TodoValidator } from "../validators/todo";
import { checkAuth } from "../utils/checkAuth";
import * as TodoController from "../controllers/Todo";

export const todoRouter = Router();

// Protect all todo routes
todoRouter.use(checkAuth);

// Routes
todoRouter.get("/", TodoController.getTodos);
todoRouter.post(
  "/",
  TodoValidator.createTodoValidator(),
  TodoController.createTodo
);
todoRouter.patch(
  "/:id",
  TodoValidator.updateTodoValidator(),
  TodoController.updateTodo
);
todoRouter.delete("/:id", TodoController.deleteTodo);
