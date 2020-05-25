import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Work } from '../works/work.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  rewiewId?: number;

  @Column()
  text: string;

  @Column()
  author: string;

  @Column({ nullable: true })
  positive?: string;

  @Column({ nullable: true })
  negative?: string;

  @ManyToOne(type => Work, work => work.reviews)
  work: Work;
}
