import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ObjectIdColumn,
  ObjectID,
} from 'typeorm';

import { Exclude } from 'class-transformer';

@Entity('users')
class User {
  @PrimaryGeneratedColumn()
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  signInUserId: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}

export default User;
