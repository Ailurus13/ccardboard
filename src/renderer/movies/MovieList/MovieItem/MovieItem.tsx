import { Movie } from '@common/entity/Movie.entity';
import { Card, Image, Tag } from 'antd';
import { format } from 'date-fns';
import styles from './MovieItem.module.scss';
import locale from 'date-fns/locale/fr';

type MovieItemProps = {
  movie: Movie;
};

export function MovieItem({ movie }: MovieItemProps) {
  return (
    <Card title={`${movie.name}`}>
      <div className={styles.tags}>
        {movie.release && <Tag>{movie.release}</Tag>}
        {movie.arthouse && <Tag color="magenta">Art et essaie</Tag>}
        {movie.rated && <Tag color="warning">Âge : {movie.rated}</Tag>}
      </div>
      <div className={styles['card-content']}>
        <div className={styles['informations']}>
          <div>
            {movie.seances?.length == 0 && <p>Pas de séances</p>}
            {movie.seances?.length > 0 &&
              movie.seances.map((s) => (
                <p key={s.id}>
                  {format(s.date, "dd MMMM yyyy à HH'h'mm", {
                    locale,
                  })}
                </p>
              ))}
          </div>
        </div>
        <div className={styles['poster']}>
          <Image
            className={styles['image']}
            src={`filestorage://${movie.poster}`}
            preview={false}
          />
        </div>
      </div>
    </Card>
  );
}
