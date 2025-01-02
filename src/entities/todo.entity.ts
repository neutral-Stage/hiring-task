import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { CoreEntity } from "./core.entity";
import { UserEntity } from "./user.entity";

@Entity("todos")
export class TodoEntity extends CoreEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  completed: boolean;

  @Column({ type: "timestamp" })
  dueDate: Date;

  @ManyToOne(() => UserEntity, (user) => user.todos)
  @JoinColumn({ name: "userId" })
  user: UserEntity;

  @Column({ type: "uuid" })
  userId: string;
}
