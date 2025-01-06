import {
  todoService,
  Todo,
  CreateTodoDTO,
  UpdateTodoDTO,
} from "../todo.service";
import api from "@/lib/api";

jest.mock("@/lib/api");

describe("todoService", () => {
  const mockTodo: Todo = {
    id: "1",
    title: "Test Todo",
    description: "Test Description",
    completed: false,
    due_date: "2023-12-31",
    userId: "1",
    createdAt: "2023-01-01",
    updatedAt: "2023-01-01",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should get all todos", async () => {
    (api.get as jest.Mock).mockResolvedValue({ data: { data: [mockTodo] } });

    const todos = await todoService.getAll();

    expect(api.get).toHaveBeenCalledWith("/todos");
    expect(todos).toEqual([mockTodo]);
  });

  it("should create a todo", async () => {
    const newTodo: CreateTodoDTO = {
      title: "New Todo",
      description: "New Description",
      due_date: "2023-12-31",
    };
    (api.post as jest.Mock).mockResolvedValue({ data: { data: mockTodo } });

    const createdTodo = await todoService.create(newTodo);

    expect(api.post).toHaveBeenCalledWith("/todos", newTodo);
    expect(createdTodo).toEqual(mockTodo);
  });

  it("should update a todo", async () => {
    const updatedTodo: UpdateTodoDTO = { title: "Updated Todo" };
    (api.patch as jest.Mock).mockResolvedValue({ data: { data: mockTodo } });

    const result = await todoService.update(mockTodo.id, updatedTodo);

    expect(api.patch).toHaveBeenCalledWith(
      `/todos/${mockTodo.id}`,
      updatedTodo
    );
    expect(result).toEqual(mockTodo);
  });

  it("should delete a todo", async () => {
    (api.delete as jest.Mock).mockResolvedValue({});

    await todoService.delete(mockTodo.id);

    expect(api.delete).toHaveBeenCalledWith(`/todos/${mockTodo.id}`);
  });
});
