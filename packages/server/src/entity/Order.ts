import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: false })
  approved!: boolean;

  @ManyToOne(type => User, user => user.orders)
  user!: User;

  @Column()
  description!: string;
}
