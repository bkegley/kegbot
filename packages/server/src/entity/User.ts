import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryColumn()
  username!: string;

  @Column()
  greeting!: string;
}
