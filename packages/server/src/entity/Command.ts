import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { CommandAlias } from "./CommandAlias";

@Entity()
export class Command {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  command!: string;

  @OneToMany(type => CommandAlias, commandAlias => commandAlias.command, {
    nullable: true
  })
  aliases!: CommandAlias[];

  @Column()
  response!: string;

  @Column({ default: true })
  modOnly!: boolean;
}
