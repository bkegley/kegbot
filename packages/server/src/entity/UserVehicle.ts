import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany
} from "typeorm";
import { Vehicle } from "./Vehicle";
import { User } from "./User";
import { DeliverySession } from "./DeliverySession";

@Entity()
export class UserVehicle {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(type => User, user => user.vehicles)
  user!: User;

  @ManyToOne(type => Vehicle, vehicle => vehicle.userVehicles)
  vehicle!: Vehicle;

  @OneToMany(
    type => DeliverySession,
    deliverySession => deliverySession.userVehicle
  )
  deliverySessions!: DeliverySession[];

  @Column()
  health!: number;
}
