import { Movie } from '@common/entity/Movie.entity';
import { useContext, useEffect, useState, createContext } from 'react';

type IMovieContext = {
  movies: Movie[];
};

const MovieContext = createContext<IMovieContext>({} as IMovieContext);

type MovieProviderProps = {
  children: JSX.Element | JSX.Element[];
};

export function MovieProvider({ children }: MovieProviderProps) {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const [movies] = await window.electron.getAllMovies();
      setMovies(movies);
    };
    fetchMovies();
  }, []);

  return (
    <MovieContext.Provider value={{ movies }}>{children}</MovieContext.Provider>
  );
}

export function useMovie(): IMovieContext {
  return useContext(MovieContext);
}
