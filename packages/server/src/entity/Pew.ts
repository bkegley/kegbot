import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Pew {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column({ default: 0 })
  cost!: number;
}
