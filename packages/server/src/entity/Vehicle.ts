import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserVehicle } from "./UserVehicle";

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @OneToMany(type => UserVehicle, userVehicle => userVehicle.vehicle)
  userVehicles!: UserVehicle[];

  @Column({ default: 0 })
  cost!: number;

  @Column({ default: 100 })
  baseHealth!: number;

  @Column({ default: 100 })
  baseSpeed!: number;
}
