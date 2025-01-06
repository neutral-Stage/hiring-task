import api from "@/lib/api";

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  due_date: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoDTO {
  title: string;
  description: string;
  due_date: string;
}

export interface UpdateTodoDTO extends Partial<CreateTodoDTO> {
  completed?: boolean;
}

export const todoService = {
  async getAll(): Promise<Todo[]> {
    const response = await api.get<{ data: Todo[] }>("/todos");
    return response.data.data;
  },

  async create(todo: CreateTodoDTO): Promise<Todo> {
    const response = await api.post<{ data: Todo }>("/todos", todo);
    return response.data.data;
  },

  async update(id: string, todo: UpdateTodoDTO): Promise<Todo> {
    const response = await api.patch<{ data: Todo }>(`/todos/${id}`, todo);
    return response.data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/todos/${id}`);
  },
};
