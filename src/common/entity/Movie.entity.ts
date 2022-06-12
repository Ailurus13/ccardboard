import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  poster: string;

  @Column({ nullable: false })
  release: string;

  @Column({ nullable: false })
  arthouse: boolean;

  @Column()
  rated: number;

  // TODO: Seances
}
