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

  @Column({ default: false })
  isTrading: boolean;

  @Column({ default: 0 })
  postedUserId: number;

  @Column({ default: 0 })
  purchasedUserId: number;

  @Column({ default: 0 })
  bidUserId: number;
}
