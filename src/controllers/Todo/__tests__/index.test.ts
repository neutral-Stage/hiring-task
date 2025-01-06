import { createTodo, getTodos, updateTodo, deleteTodo } from "../index";
import { todoService } from "../../../services";
import { validationResult } from "express-validator";
import { BadRequestError } from "../../../errors/badRequest.error";
import { NotFoundError } from "../../../errors/notFound.error";

jest.mock("../../../services");
jest.mock("express-validator");

describe("Todo Controller", () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {}, params: {}, user: { uuid: "user-uuid" } };
    res = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
    (validationResult as unknown as jest.Mock).mockReturnValue({
      isEmpty: jest.fn().mockReturnValue(true),
    });
  });

  describe("createTodo", () => {
    it("should create a new todo", async () => {
      (todoService.createTodo as jest.Mock).mockResolvedValue({
        id: "todo-id",
        title: "Test Todo",
      });

      await createTodo(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: { id: "todo-id", title: "Test Todo" },
      });
    });

    it("should handle validation errors", async () => {
      (validationResult as unknown as jest.Mock).mockReturnValue({
        isEmpty: jest.fn().mockReturnValue(false),
        array: jest.fn().mockReturnValue([]),
      });

      await createTodo(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(BadRequestError));
    });
  });

  describe("getTodos", () => {
    it("should return a list of todos", async () => {
      (todoService.getTodos as jest.Mock).mockResolvedValue([
        { id: "todo-id", title: "Test Todo" },
      ]);

      await getTodos(req, res, next);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: [{ id: "todo-id", title: "Test Todo" }],
      });
    });
  });

  describe("updateTodo", () => {
    it("should update an existing todo", async () => {
      (todoService.updateTodo as jest.Mock).mockResolvedValue({
        id: "todo-id",
        title: "Updated Todo",
      });

      await updateTodo(req, res, next);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: { id: "todo-id", title: "Updated Todo" },
      });
    });

    it("should handle validation errors", async () => {
      (validationResult as unknown as jest.Mock).mockReturnValue({
        isEmpty: jest.fn().mockReturnValue(false),
        array: jest.fn().mockReturnValue([]),
      });

      await updateTodo(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(BadRequestError));
    });

    it("should handle not found errors", async () => {
      (todoService.updateTodo as jest.Mock).mockResolvedValue(null);

      await updateTodo(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(NotFoundError));
    });
  });

  describe("deleteTodo", () => {
    it("should delete an existing todo", async () => {
      await deleteTodo(req, res, next);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Todo deleted successfully",
      });
    });
  });
});
