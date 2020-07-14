import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { DeliverySession } from "./DeliverySession";

@Entity()
export class User {
  @PrimaryColumn()
  username!: string;

  @Column({ default: "" })
  greeting!: string;

  @OneToMany(type => DeliverySession, deliverySession => deliverySession.user)
  deliverySessions!: DeliverySession[];
}
