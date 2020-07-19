import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column({ default: 0 })
  cost!: number;

  @Column({ default: 100 })
  baseHealth!: number;

  @Column({ default: 100 })
  baseSpeed!: number;
}
