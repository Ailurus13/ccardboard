export interface TheMovieDbSearchMovieResult {
  id: number;
  title: string;
  adult: boolean;
  poster_path?: string;
  release_date?: string;
  overview?: string;
}

export interface TheMovieDbSearchMovieResultParsed
  extends TheMovieDbSearchMovieResult {
  year?: string;
  poster_full?: string;
  short_overview?: string;
}

export interface TheMovieDbSearchResult {
  page: number;
  total_pages: number;
  total_results: number;
  results: TheMovieDbSearchMovieResult[];
}

export interface InterfaceTheMovieDb {
  search: (query: string) => Promise<TheMovieDbSearchMovieResultParsed[]>;
}

export function TheMovieDb(
  language: 'fr-FR' | 'en-US',
  api_key: string
): InterfaceTheMovieDb {
  const search = async (query: string) => {
    const params = new URLSearchParams({
      api_key,
      language,
      query,
    });
    const url = `https://api.themoviedb.org/3/search/movie?${params.toString()}`;
    const response = await fetch(url);
    if (response.status == 401) {
      throw new Error('Invalid API Token');
    }
    if (response.status != 200) {
      throw new Error('Unexpected error');
    }
    const searchResult: TheMovieDbSearchResult = await response.json();
    const movies: TheMovieDbSearchMovieResultParsed[] = searchResult.results
      .map((movie) => ({
        ...movie,
        year: movie.release_date?.split('-')[0],
        poster_full: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : null,
        short_overview: movie.overview
          ? `${movie.overview.substring(0, 100)}...`
          : null,
      }))
      .filter((movie) => !movie.adult);
    return movies;
  };

  return { search };
}
