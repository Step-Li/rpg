import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Work } from '../works/work.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  reviewId?: number;

  @Column({
    type: 'longtext',
    name: 'text'
  })
  text: string;

  @Column()
  author: string;

  @Column({
    type: 'longtext',
    nullable: true,
    name: 'positive'
  })
  positive?: string;

  @Column({
    type: 'longtext',
    nullable: true,
    name: 'negative'
  })
  negative?: string;

  @ManyToOne(type => Work, work => work.reviews)
  work: Work;
}
