import { Entity, Column, DeleteDateColumn, OneToMany } from "typeorm";
import { CoreEntity } from "./core.entity";
import { TodoEntity } from "./todo.entity";

@Entity()
export class UserEntity extends CoreEntity {
  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => TodoEntity, (todo) => todo.user)
  todos: TodoEntity[];
}
