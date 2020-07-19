import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne
} from "typeorm";
import { Vehicle } from "./Vehicle";
import { User } from "./User";

@Entity()
export class UserVehicle {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(type => User, user => user.vehicles)
  user!: User;

  @OneToOne(type => Vehicle)
  @JoinColumn()
  vehicle!: Vehicle;

  @Column()
  health!: number;
}
