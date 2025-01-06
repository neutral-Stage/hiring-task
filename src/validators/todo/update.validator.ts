import { body } from "express-validator";

export const updateTodoValidator = () => {
  return [
    body("title").optional().isString().withMessage("Title must be a string"),
    body("description")
      .optional()
      .isString()
      .withMessage("Description must be a string"),
    body("completed")
      .optional()
      .isBoolean()
      .withMessage("Completed must be a boolean"),
    body("due_date").optional().isISO8601().withMessage("Invalid date format"),
  ];
};
