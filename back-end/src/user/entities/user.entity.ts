// user.entity.ts
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class User {
  [x: string]: any;
  @PrimaryGeneratedColumn()
  seq: number;

  @PrimaryColumn()
  UserID: string;

  @Column()
  Name: string;

  @Column()
  Email:string;

  @Column()
  Password: string;

  @Column()
  PhoneNumber:string;

  @Column()
  Nickname:string;

  @Column()
  Address:string;

  @Column()
  Admin: number;
}
