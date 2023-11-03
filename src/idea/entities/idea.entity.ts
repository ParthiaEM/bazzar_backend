import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Idea {
  @PrimaryGeneratedColumn()
  ideaId: number;

  @Column()
  ideaField: String;

  @Column()
  ideaName: String;

  @Column({ length: 1000 })
  ideaDetail: String;

  @Column()
  price: number;

  @Column()
  isTrading: boolean;

  @Column()
  postedUserId: number;

  @Column()
  purchasedUserId: number;

  @Column()
  bidUserId: number;
}
