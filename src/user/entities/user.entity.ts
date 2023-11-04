import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userUniqueId: number;

  @PrimaryColumn()
  userId: String;

  @Column()
  userPassword: String;

  @Column()
  userAccount: String;

  @Column()
  lux: number;
}
