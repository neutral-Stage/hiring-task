import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom"; // Ensure this import is present
import { TodoForm } from "../TodoForm";

describe("TodoForm", () => {
  it("renders the form with initial data", () => {
    const initialData = {
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
      <TodoForm
        isOpen={true}
        onClose={jest.fn()}
        onSubmit={jest.fn()}
        initialData={initialData}
        aria-describedby="dialog-description"
      />
    );

    expect(screen.getByDisplayValue("Test Todo")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test Description")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2023-12-31")).toBeInTheDocument();
  });

  it("calls onSubmit with form data when submitted", async () => {
    const onSubmit = jest.fn();
    await act(async () => {
      render(
        <TodoForm
          isOpen={true}
          onClose={jest.fn()}
          onSubmit={onSubmit}
          initialData={null}
          aria-describedby="dialog-description"
        />
      );
    });

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "New Todo" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "New Description" },
    });
    fireEvent.change(screen.getByLabelText(/due date/i), {
      target: { value: "2023-12-31" },
    });

    await act(async () => {
      fireEvent.click(screen.getAllByText(/create/i)[1]);
    });

    expect(onSubmit).toHaveBeenCalledWith({
      title: "New Todo",
      description: "New Description",
      due_date: "2023-12-31",
    });
  });

  // Add more tests as needed
});
