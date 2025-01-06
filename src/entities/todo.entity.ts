import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { CoreEntity } from "./core.entity";
import { UserEntity } from "./user.entity";

@Entity("todos")
export class TodoEntity extends CoreEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  completed: boolean;

  @Column({ type: "timestamp" })
  due_date: Date;

  @ManyToOne(() => UserEntity, (user) => user.todos, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userUuid" })
  user!: UserEntity;
}
