import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { CommandAlias } from "./CommandAlias";

@Entity()
export class Command {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  command!: string;

  @ManyToOne(type => CommandAlias, commandAlias => commandAlias.command)
  aliases!: CommandAlias[];

  @Column()
  response!: string;

  @Column({ default: true })
  modOnly!: boolean;
}
