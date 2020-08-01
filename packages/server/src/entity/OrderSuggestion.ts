import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class OrderSuggestion {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: false })
  approved!: boolean;

  @ManyToOne(type => User, user => user.orderSuggestions)
  user!: User;

  @Column()
  description!: string;
}
