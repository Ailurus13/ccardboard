import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Movie } from './Movie.entity';

@Entity()
export class Seance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column({ nullable: true })
  langage?: string;

  @ManyToOne(() => Movie, (movie) => movie.seances)
  movie: Movie;
}
