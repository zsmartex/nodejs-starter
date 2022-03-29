import {
  Entity, ObjectID, ObjectIdColumn, Column, UpdateDateColumn, CreateDateColumn, Index, BeforeInsert, BeforeUpdate,
} from 'typeorm';
import bcrypt from 'bcrypt';
import { Exclude } from 'amala';

@Entity({ name: 'users' })
export class UserEntity {
  @ObjectIdColumn({
    name: '_id',
  })
  id: ObjectID;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  hashPasswords() {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);

    this.password = hash;
  }

  comparePassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }

  toJSON() {
    return {
      email: this.email,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}
