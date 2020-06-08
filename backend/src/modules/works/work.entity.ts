import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Review } from '../reviews/review.entity';

@Entity()
export class Work {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  author?: string;

  @Column({ nullable: true })
  imgUrl?: string;

  @Column({ nullable: true })
  finalUrl?: string;

  @Column()
  nomination: 'game' | 'adventure';

  @Column({ nullable: true })
  adventureType?: 'scenario' | 'decoration';

  @Column()
  year: string;

  @Column({ nullable: true })
  system?: string;

  @Column()
  evaluation: number;

  @Column()
  filePath: string;

  @Column({
    type: 'longtext',
    nullable: true,
    name: 'description'
  })
  description?: string;

  @OneToMany(type => Review, review => review.work, { cascade: ['insert', 'update'] })
  reviews: Review[]
}
