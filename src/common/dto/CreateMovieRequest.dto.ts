export type CreateMovieRequestDTO = {
  name: string;
  release: 'normal' | 'ap' | 'national';
  poster: {
    type: 'url' | 'path';
    value: string;
  };
  arthouse: boolean;
  rated: 10 | 12 | 16 | 18 | null | undefined;
};
