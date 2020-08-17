import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Aid } from "./Aid";
import { User } from "./User";

@Entity()
export class UserAid {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(type => User, user => user.pews, { onDelete: "CASCADE" })
  user!: User;

  @ManyToOne(type => Aid, aid => aid.userAids, { onDelete: "CASCADE" })
  aid!: Aid;
}
