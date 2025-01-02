import { DataSource } from "typeorm";
import { Env } from "./env";
import { UserEntity } from "./entities/user.entity";
import { TodoEntity } from "./entities/todo.entity";

export const AppDataSouce = new DataSource({
  type: "mysql",
  host: Env.host,
  port: Env.dbPort,
  username: Env.username,
  password: Env.password,
  database: Env.dbName,
  synchronize: true,
  logging: true,
  entities: [UserEntity, TodoEntity],
  subscribers: [],
  migrations: [],
});