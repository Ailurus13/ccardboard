import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Seance } from './Seance.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  poster: string;

  @Column()
  release: string;

  @Column()
  arthouse: boolean;

  @Column({ nullable: true })
  rated?: number;

  @OneToMany(() => Seance, (seance) => seance.movie, {
    cascade: true,
    eager: true,
  })
  seances: Seance[];
}
