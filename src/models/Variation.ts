import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import User from "./User";

@Entity("variations")
class Variation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  label: string;

  @Column()
  description: string;

  @Column()
  type: string;

  @Column()
  creator_id: string;
  
  @ManyToOne(() => User)
  @JoinColumn({name: 'creator_id'})
  creator: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Variation;
