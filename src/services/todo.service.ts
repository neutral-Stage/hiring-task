import { AppDataSouce } from "../db";
import { TodoEntity } from "../entities/todo.entity";

export class TodoService {
  private todoRepository = AppDataSouce.getRepository(TodoEntity);

  async createTodo(data: Partial<TodoEntity>) {
    const todo = this.todoRepository.create(data);
    return await this.todoRepository.save(todo);
  }

  async getTodos(userId: string) {
    return await this.todoRepository.find({
      where: { userId },
      order: { createdAt: "DESC" },
    });
  }

  async getTodoById(id: string, userId: string) {
    return await this.todoRepository.findOne({
      where: { id, userId },
    });
  }

  async updateTodo(id: string, userId: string, data: Partial<TodoEntity>) {
    await this.todoRepository.update({ id, userId }, data);
    return await this.getTodoById(id, userId);
  }

  async deleteTodo(id: string, userId: string) {
    return await this.todoRepository.delete({ id, userId });
  }
}

export const todoService = new TodoService();
