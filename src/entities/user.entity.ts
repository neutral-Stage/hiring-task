import {
  Entity,
  Column,
  DeleteDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CoreEntity } from "./core.entity";
import { TodoEntity } from "./todo.entity";

@Entity("user")
export class UserEntity extends CoreEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ type: "varchar", nullable: true })
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
