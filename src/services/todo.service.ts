import { AppDataSouce } from "../db";
import { TodoEntity, UserEntity } from "../entities";

const todoRepository = AppDataSouce.getRepository(TodoEntity);
const userRepository = AppDataSouce.getRepository(UserEntity);

export const createTodo = async (
  data: Partial<TodoEntity>,
  userUuid: string
) => {
  const user = await userRepository.findOneBy({ uuid: userUuid });

  if (!user) {
    throw new Error("User not found");
  }
  const todo = todoRepository.create({
    ...data,
    user,
  });
  return await todoRepository.save(todo);
};

export const getTodos = async (userUuid: string) => {
  return await todoRepository.find({
    where: { user: { uuid: userUuid } },
    relations: ["user"],
    order: { createdAt: "DESC" },
  });
};

export const getTodoById = async (id: string) => {
  return await todoRepository.findOne({
    where: { id },
  });
};

export const updateTodo = async (id: string, data: Partial<TodoEntity>) => {
  await todoRepository.update({ id }, data);
  return await getTodoById(id);
};

export const deleteTodo = async (id: string) => {
  return await todoRepository.delete({ id });
};
