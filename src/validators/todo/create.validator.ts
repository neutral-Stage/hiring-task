import { body } from "express-validator";

export const createTodoValidator = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("Title is required.")
      .isString()
      .withMessage("Title must be a string"),
    body("description")
      .notEmpty()
      .withMessage("Description is required.")
      .isString()
      .withMessage("Description must be a string"),
    body("due_date")
      .notEmpty()
      .withMessage("Due date is required.")
      .isISO8601()
      .withMessage("Invalid date format"),
  ];
};
