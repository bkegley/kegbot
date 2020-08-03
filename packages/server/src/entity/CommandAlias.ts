import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Command } from "./Command";

@Entity()
export class CommandAlias {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  alias!: string;

  @OneToMany(type => Command, command => command.aliases)
  command!: Command;
}
