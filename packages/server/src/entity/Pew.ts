import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserPew } from "./UserPew";

@Entity()
export class Pew {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @OneToMany(type => UserPew, userPew => userPew.pew)
  userPews!: UserPew[];

  @Column({ default: 0 })
  cost!: number;

  @Column({ default: true })
  expendable!: boolean;
}
