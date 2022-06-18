import { Alert, Input } from 'antd';
import { useState } from 'react';
import { useTheMovieDb } from '../../../provider/TheMovieDBProvider';
import { TheMovieDbSearchMovieResultParsed } from '../../../util/TheMovieDb';
import styles from './TheMovieDbSearch.module.scss';
import { TheMovieDbSearchItem } from './TheMovieDbSearchItem';
const { Search } = Input;

type TheMovieDbSearchProps = {
  onMovieSelect: (movie: TheMovieDbSearchMovieResultParsed) => void;
};

export function TheMovieDbSearch({ onMovieSelect }: TheMovieDbSearchProps) {
  const [movies, setMovies] = useState<TheMovieDbSearchMovieResultParsed[]>([]);
  const [error, setError] = useState<string>();
  const { search } = useTheMovieDb();

  const onSearch = async (query: string) => {
    try {
      const movies = await search(query);
      setMovies(movies);
      setError(null);
    } catch (e) {
      setMovies([]);
      setError(
        "Erreur de lors de la requête à TheMovieDb, veuillez vérifier votre clé d'API"
      );
    }
  };

  return (
    <div className={styles['container']}>
      <Search
        className={styles['search']}
        placeholder="Nom du film"
        onSearch={onSearch}
      />
      {error && <Alert message={error} type="error" />}
      {movies.length > 0 && (
        <div className={styles.result}>
          {movies.map((movie) => (
            <TheMovieDbSearchItem
              key={movie.id}
              movie={movie}
              onClick={(movie) => {
                onMovieSelect(movie);
                setMovies([]);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
