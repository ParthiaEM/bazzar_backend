import { Entity, Column, Generated, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @Generated()
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
