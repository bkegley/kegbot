import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class DeliverySession {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(type => User, user => user.deliverySessions)
  user!: User;
}
