import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userUniqueId: number;

  @Column()
  userId: String;

  @Column()
  userPassword: String;

  @Column()
  userAccount: String;

  @Column()
  lux: number;
}
