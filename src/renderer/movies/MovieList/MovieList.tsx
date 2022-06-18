import { Empty } from 'antd';
import { useMovie } from '../../provider/MovieProvider';
import { MovieItem } from './MovieItem/MovieItem';
import styles from './MovieListe.module.scss';

export function MovieList() {
  const { movies } = useMovie();

  return (
    <>
      {movies.length == 0 && <NoMovie />}
      {movies.length > 0 && (
        <div className={styles['movies-grid']}>
          {movies.map((m) => (
            <MovieItem key={m.id} movie={m} />
          ))}
        </div>
      )}
    </>
  );
}

export function NoMovie() {
  return (
    <div>
      <Empty description="Vous n'avez pas encore ajouté de séances" />
    </div>
  );
}
