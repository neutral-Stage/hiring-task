import { Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { todoService } from "../../services";
import { BadRequestError } from "../../errors/badRequest.error";
import { NotFoundError } from "../../errors/notFound.error";
import { AuthRequest } from "../../types";

export const createTodo = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new BadRequestError("Invalid input", errors.array());
    }
    const todo = await todoService.createTodo(req.body, req.user.uuid);
    return res.status(201).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

export const getTodos = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const todos = await todoService.getTodos(req.user.uuid);
    return res.json({
      success: true,
      data: todos,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTodo = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new BadRequestError("Invalid input", errors.array());
    }

    const todo = await todoService.updateTodo(req.params.id, req.body);

    if (!todo) {
      throw new NotFoundError("Todo not found");
    }

    return res.json({
      success: true,
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await todoService.deleteTodo(req.params.id);

    return res.json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
