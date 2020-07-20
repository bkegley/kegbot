import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Pew } from "./Pew";
import { User } from "./User";

@Entity()
export class UserPew {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(type => User, user => user.pews)
  user!: User;

  @ManyToOne(type => Pew, pew => pew.userPews)
  pew!: Pew;
}
