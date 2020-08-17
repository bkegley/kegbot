import { Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Command } from "./Command";

@Entity()
export class CommandAlias {
  @PrimaryColumn()
  alias!: string;

  @ManyToOne(type => Command, command => command.aliases, {
    onDelete: "CASCADE"
  })
  command!: Command;
}
