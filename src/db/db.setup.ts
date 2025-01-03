import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { UserEntity } from "../entities";
import { Env } from "../env";
import { TodoEntity } from "../entities/todo.entity";

export const AppDataSouce = new DataSource({
  type: "mysql",
  database: Env.dbName,
  host: Env.host,
  username: Env.username,
  password: Env.password,
  port: Env.dbPort,
  logging: false,
  synchronize: false,
  entities: [UserEntity, TodoEntity],
  entitySkipConstructor: true,
  namingStrategy: new SnakeNamingStrategy(),
});
