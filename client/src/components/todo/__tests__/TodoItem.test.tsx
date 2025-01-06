import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TodoItem } from "../TodoItem";

describe("TodoItem", () => {
  it("renders the todo item", () => {
    const mockTodo = {
      title: "Test Todo",
      description: "Test Description",
      due_date: "2023-12-31",
      id: "1",
      completed: false,
      userId: "1",
      createdAt: "2023-01-01",
      updatedAt: "2023-01-01",
    };

    render(
      <TodoItem
        todo={mockTodo}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
        onToggleComplete={jest.fn()}
      />
    );

    expect(screen.getByText("Test Todo")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(
      screen.getByText(
        (content, element) =>
          content.includes("Due:") && content.includes("December 31st, 2023")
      )
    ).toBeInTheDocument();
  });

  it("calls onEdit when edit button is clicked", () => {
    const mockTodo = {
      title: "Test Todo",
      description: "Test Description",
      due_date: "2023-12-31",
      id: "1",
      completed: false,
      userId: "1",
      createdAt: "2023-01-01",
      updatedAt: "2023-01-01",
    };
    const onEdit = jest.fn();

    render(
      <TodoItem
        todo={mockTodo}
        onEdit={onEdit}
        onDelete={jest.fn()}
        onToggleComplete={jest.fn()}
      />
    );

    fireEvent.click(screen.getByLabelText("edit"));
    expect(onEdit).toHaveBeenCalledWith(mockTodo);
  });

  // Add more tests as needed
});
