import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { TodoProvider, useTodo } from "../TodoContext";
import { AuthProvider } from "../AuthContext";
import { todoService } from "@/services/todo.service";
import { useToast } from "@/contexts/ToastProvider";

jest.mock("@/services/todo.service");
jest.mock("@/contexts/ToastProvider");

const mockUseToast = useToast as jest.MockedFunction<typeof useToast>;

describe("TodoContext", () => {
  beforeEach(() => {
    mockUseToast.mockReturnValue(jest.fn());
  });

  const TestComponent = () => {
    const { todos, addTodo, deleteTodo } = useTodo();
    return (
      <div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
        <button
          onClick={() =>
            addTodo({
              title: "New Todo",
              description: "New Todo Description",
              due_date: "2023-12-31",
            })
          }
        >
          Add Todo
        </button>
        <button onClick={() => deleteTodo("1")}>Delete Todo</button>
      </div>
    );
  };

  it("adds a todo", async () => {
    (todoService.create as jest.Mock).mockResolvedValue({
      id: "1",
      title: "New Todo",
      description: "New Todo Description",
    });

    render(
      <MemoryRouter>
        <AuthProvider>
          <TodoProvider>
            <TestComponent />
          </TodoProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Add Todo"));

    await waitFor(() => {
      expect(screen.getByText("New Todo")).toBeInTheDocument();
    });
  });

  it("deletes a todo", async () => {
    (todoService.delete as jest.Mock).mockResolvedValue({});

    render(
      <MemoryRouter>
        <AuthProvider>
          <TodoProvider>
            <TestComponent />
          </TodoProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Delete Todo"));

    await waitFor(() => {
      expect(screen.queryByText("New Todo")).not.toBeInTheDocument();
    });
  });
});
