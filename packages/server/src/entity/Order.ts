import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { DeliverySession } from "./DeliverySession";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  text!: string;

  @OneToMany(type => DeliverySession, deliverySession => deliverySession.order)
  deliverySessions!: DeliverySession[];
}
