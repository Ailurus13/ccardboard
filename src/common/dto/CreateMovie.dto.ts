import { CreateSeanceDTO } from './CreateSeance.dto';

export type CreateMovieDTO = {
  name: string;
  release: 'normal' | 'ap' | 'national';
  poster: string;
  arthouse: boolean;
  rated?: 10 | 12 | 16 | 18;
  seances: CreateSeanceDTO[];
};
