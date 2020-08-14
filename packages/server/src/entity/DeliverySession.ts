import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { UserVehicle } from "./UserVehicle";
import { Order } from "./Order";

@Entity()
export class DeliverySession {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(type => User, user => user.deliverySessions)
  user!: User;

  @Column({ default: 60000 })
  duration!: number;

  @Column({ default: 250 })
  reward!: number;

  @Column({ default: 100000 })
  distance!: number;

  @Column({ default: "pending" })
  status!: "pending" | "won" | "lost";

  @ManyToOne(type => UserVehicle, userVehicle => userVehicle.deliverySessions)
  userVehicle!: UserVehicle;

  @Column({ default: false })
  isActive!: boolean;

  @ManyToOne(type => Order, order => order.deliverySessions)
  order!: Order;
}
