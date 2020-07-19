import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { DeliverySession } from "./DeliverySession";
import { UserVehicle } from "./UserVehicle";

@Entity()
export class User {
  @PrimaryColumn()
  username!: string;

  @Column({ default: "" })
  greeting!: string;

  @OneToMany(type => DeliverySession, deliverySession => deliverySession.user)
  deliverySessions!: DeliverySession[];

  @OneToMany(type => UserVehicle, userVehicle => userVehicle.user)
  vehicles!: UserVehicle[];
}
