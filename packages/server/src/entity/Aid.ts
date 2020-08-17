import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserAid } from "./UserAid";

@Entity()
export class Aid {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column({ nullable: true })
  description!: string;

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

  @OneToMany(type => UserAid, userAid => userAid.aid, { onDelete: "CASCADE" })
  userAids!: UserAid[];
}
