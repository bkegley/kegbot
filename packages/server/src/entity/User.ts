import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { DeliverySession } from "./DeliverySession";
import { UserVehicle } from "./UserVehicle";
import { UserPew } from "./UserPew";

@Entity()
export class User {
  @PrimaryColumn()
  username!: string;

  @Column({ default: "" })
  greeting!: string;

  @Column({ default: 0 })
  kegerrands!: number;

  @OneToMany(type => DeliverySession, deliverySession => deliverySession.user)
  deliverySessions!: DeliverySession[];

  @OneToMany(type => UserVehicle, userVehicle => userVehicle.user)
  vehicles!: UserVehicle[];

  @OneToMany(type => UserPew, userPew => userPew.user)
  pews!: UserPew[];
}
