import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Work {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title: string;

  @Column()
  nomination: 'game' | 'adventure';

  @Column({ nullable: true })
  adventureType?: 'scenario' | 'decoration';

  @Column()
  year: string;

  @Column()
  system: string;

  @Column()
  evaluation: number;

  @Column()
  filePath: string;

  @Column()
  description: string;
}
