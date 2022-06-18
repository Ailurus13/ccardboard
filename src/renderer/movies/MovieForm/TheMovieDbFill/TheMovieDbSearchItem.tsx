import { TheMovieDbSearchMovieResultParsed } from '@renderer/util/TheMovieDb';
import { Image } from 'antd';
import styles from './TheMovieDbSearchItem.module.scss';

type TheMovieDbSearchItemProps = {
  onClick: (movie: TheMovieDbSearchMovieResultParsed) => void;
  movie: TheMovieDbSearchMovieResultParsed;
};

export function TheMovieDbSearchItem({
  movie,
  onClick,
}: TheMovieDbSearchItemProps) {
  return (
    <div onClick={() => onClick(movie)} className={styles['container']}>
      <div>
        <Image
          src={movie.poster_full}
          preview={false}
          className={styles['image']}
        />
      </div>
      <div>
        <p>{movie.title}</p>
        <p>{movie.short_overview}</p>
      </div>
    </div>
  );
}
