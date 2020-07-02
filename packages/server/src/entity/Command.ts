import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Command {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  command!: string;

  @Column()
  response!: string;
}
