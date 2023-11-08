import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Idea {
  @PrimaryGeneratedColumn()
  ideaId: number;

  @Column()
  ideaField: string;

  @Column()
  ideaName: string;

  @Column({ length: 1000 })
  ideaDetail: string;

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
