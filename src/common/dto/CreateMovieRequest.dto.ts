import { StorePosterDto } from './StorePoster.dto';

export type CreateMovieRequestDTO = {
  name: string;
  release: 'normal' | 'ap' | 'national';
  poster: StorePosterDto;
  arthouse: boolean;
  rated: 10 | 12 | 16 | 18 | null | undefined;
};
