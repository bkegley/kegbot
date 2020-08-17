import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

export enum PewSuggestionStatus {
  PENDING = "pending",
  APPROVED = "approved",
  DENIED = "denied"
}

@Entity()
export class PewSuggestion {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @ManyToOne(type => User, user => user.pewSuggestions, {
    onDelete: "SET NULL"
  })
  user!: User;

  @Column({ default: PewSuggestionStatus.PENDING })
  status!: PewSuggestionStatus;
}
