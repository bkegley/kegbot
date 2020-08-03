import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserPew } from "./UserPew";

@Entity()
export class Pew {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column({ nullable: true })
  healthModification?: number;

  @Column({ nullable: true })
  speedModification?: number;

  @Column({ nullable: true })
  speedModificationTimeout?: number;

  @Column({ default: 0 })
  cost!: number;

  @Column({ default: true })
  expendable!: boolean;

  @OneToMany(type => UserPew, userPew => userPew.pew, { onDelete: "CASCADE" })
  userPews!: UserPew[];
}
