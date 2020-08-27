import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { DeliverySession } from "./DeliverySession";
import { UserVehicle } from "./UserVehicle";
import { UserPew } from "./UserPew";
import { PewSuggestion } from "./PewSuggestion";
import { OrderSuggestion } from "./OrderSuggestion";
import { UserAid } from "./UserAid";

@Entity()
export class User {
  @PrimaryColumn()
  username!: string;

  @Column({ default: "" })
  greeting!: string;

  @Column({ default: "" })
  email!: string;

  @Column({ default: 0 })
  kegerrands!: number;

  @OneToMany(type => DeliverySession, deliverySession => deliverySession.user)
  deliverySessions!: DeliverySession[];

  @OneToMany(type => UserVehicle, userVehicle => userVehicle.user)
  vehicles!: UserVehicle[];

  @OneToMany(type => UserPew, userPew => userPew.user)
  pews!: UserPew[];

  @OneToMany(type => UserAid, userAid => userAid.user)
  aids!: UserAid[];

  @OneToMany(type => PewSuggestion, pewSuggestion => pewSuggestion.user)
  pewSuggestions!: PewSuggestion[];

  @OneToMany(type => OrderSuggestion, orderSuggestion => orderSuggestion.user)
  orderSuggestions!: OrderSuggestion[];
}
