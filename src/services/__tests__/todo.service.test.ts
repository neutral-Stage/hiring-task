import { AppDataSouce } from "../../db";
import { TodoEntity, UserEntity } from "../../entities";
import {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
} from "../todo.service";

jest.mock("../../db");

describe("Todo Service", () => {
  let userRepository;
  let todoRepository;
  let user: UserEntity;
  let todo: TodoEntity;

  beforeAll(() => {
    userRepository = {
      save: jest.fn(),
      delete: jest.fn(),
      findOneBy: jest.fn(),
    };
    todoRepository = {
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    AppDataSouce.getRepository = jest.fn((entity) => {
      if (entity === UserEntity) return userRepository;
      if (entity === TodoEntity) return todoRepository;
    });
  });

  beforeEach(() => {
    user = new UserEntity();
    user.uuid = "test-uuid";
    user.username = "Test User";
    userRepository.save.mockResolvedValue(user);
    userRepository.findOneBy.mockResolvedValue(user);

    todo = new TodoEntity();
    todo.id = "test-id";
    todo.title = "Test Todo";
    todo.description = "Test Description";
    todo.completed = false;
    todo.due_date = new Date();
    todo.user = user;
    todoRepository.save.mockResolvedValue(todo);
    todoRepository.find.mockResolvedValue([todo]);
    todoRepository.findOne.mockResolvedValue(todo);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new todo", async () => {
    const todoData = {
      title: "Test Todo",
      description: "Test Description",
      completed: false,
      dueDate: new Date(),
    };

    const createdTodo = await createTodo(todoData, user.uuid);
    expect(createdTodo).toBeDefined();
    expect(createdTodo.title).toBe(todoData.title);
    expect(createdTodo.user.uuid).toBe(user.uuid);
    expect(todoRepository.save).toHaveBeenCalledWith(
      expect.objectContaining(todoData)
    );
  });

  it("should get todos for a user", async () => {
    const todos = await getTodos(user.uuid);
    expect(todos).toHaveLength(1);
    expect(todos[0].title).toBe(todo.title);
    expect(todoRepository.find).toHaveBeenCalledWith({
      where: { user: { uuid: user.uuid } },
      relations: ["user"],
      order: { createdAt: "DESC" },
    });
  });

  it("should get a todo by id", async () => {
    const fetchedTodo = await getTodoById(todo.id);
    expect(fetchedTodo).toBeDefined();
    expect(fetchedTodo.id).toBe(todo.id);
    expect(todoRepository.findOne).toHaveBeenCalledWith({
      where: { id: todo.id },
    });
  });

  it("should update a todo", async () => {
    const updatedData = { title: "Updated Test Todo" };
    todoRepository.update.mockResolvedValue({ ...todo, ...updatedData });
    const updatedTodo = await updateTodo(todo.id, updatedData);
    expect(updatedTodo).toBeDefined();
    expect(updatedTodo.title).toBe(updatedData.title);
    expect(todoRepository.update).toHaveBeenCalledWith(
      { id: todo.id },
      updatedData
    );
  });

  it("should delete a todo", async () => {
    todoRepository.delete.mockResolvedValue({});
    await deleteTodo(todo.id);
    todoRepository.findOne.mockResolvedValue(null);
    const deletedTodo = await getTodoById(todo.id);
    expect(deletedTodo).toBeNull();
    expect(todoRepository.delete).toHaveBeenCalledWith({ id: todo.id });
  });
});
