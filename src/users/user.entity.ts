import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('new user created with that id :', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('new user created with that id :', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('new user created with that id :', this.id);
  }
}
