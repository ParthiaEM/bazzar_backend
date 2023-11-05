import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userUniqueId: number;

  @Column()
  userId: string;

  @Column()
  userPassword: string;

  @Column()
  userAccount: string;

  @Column()
  lux: number;
}
