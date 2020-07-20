import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Vehicle } from "./Vehicle";
import { User } from "./User";

@Entity()
export class UserVehicle {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(type => User, user => user.vehicles)
  user!: User;

  @ManyToOne(type => Vehicle, vehicle => vehicle.userVehicles)
  vehicle!: Vehicle;

  @Column()
  health!: number;
}
