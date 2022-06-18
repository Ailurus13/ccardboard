import { Movie } from '@common/entity/Movie.entity';
import { Avatar, Checkbox, List } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useState } from 'react';
import { useMovie } from '../provider/MovieProvider';
import styles from './MoviePicker.module.scss';

type MoviePickerProps = {
  max: number;
  onChange: (movie: Movie[]) => void;
};

export function MoviePicker({ max, onChange }: MoviePickerProps) {
  const [selectedMovies, setSelectedMovies] = useState<Movie[]>([]);
  const { movies } = useMovie();

  const isDisabled = (movie: Movie) => {
    return !isMovieChecked(movie) && selectedMovies.length === max;
  };

  const isMovieChecked = (movie: Movie) => {
    return !!selectedMovies.find((m) => m.id === movie.id);
  };

  const handleCheckChange = (movie: Movie) => {
    return (e: CheckboxChangeEvent) => {
      if (e.target.checked) {
        if (selectedMovies.length < max) {
          setSelectedMovies([...selectedMovies, movie]);
          onChange([...selectedMovies, movie]);
        }
      } else {
        setSelectedMovies(selectedMovies.filter((m) => m.id !== movie.id));
        onChange(selectedMovies.filter((m) => m.id !== movie.id));
      }
    };
  };

  return (
    <div className={styles['list']}>
      <List
        itemLayout="horizontal"
        dataSource={movies}
        renderItem={(movie) => (
          <List.Item
            actions={[
              <Checkbox
                disabled={isDisabled(movie)}
                checked={isMovieChecked(movie)}
                onChange={handleCheckChange(movie)}
              />,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={`filestorage://${movie.poster}`} />}
              title={movie.name}
            />
          </List.Item>
        )}
      />
    </div>
  );
}
