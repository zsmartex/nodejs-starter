import {
  Entity, ObjectID, ObjectIdColumn, Column, UpdateDateColumn, CreateDateColumn, Index,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @ObjectIdColumn({
    name: '_id',
  })
  id: ObjectID;

  @Column()
  @Index({ unique: true })
  first_name: string;

  @Column()
  last_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor(firstName: string, lastName: string) {
    this.first_name = firstName;
    this.last_name = lastName;
  }
}
