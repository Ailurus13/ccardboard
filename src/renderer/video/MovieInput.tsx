import { Movie } from '@common/entity/Movie.entity';
import { Button, Modal } from 'antd';
import { useState } from 'react';
import { MoviePicker } from './MoviePicker';

type MovieInputProps = {
  onChange?: (movie: Movie) => void;
};

export function MovieInput({ onChange }: MovieInputProps) {
  const [movie, setMovie] = useState<Movie>();
  const [visible, setVisible] = useState<boolean>(false);

  const ok = () => {
    setVisible(false);
    onChange && onChange(movie);
  };

  const cancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button onClick={() => setVisible(true)}>
        {movie?.name || 'Sélectionner'}
      </Button>
      <Modal
        title="Choix du film"
        visible={visible}
        onOk={ok}
        onCancel={cancel}
      >
        <MoviePicker
          onChange={(movies) => {
            setMovie(movies[0]);
          }}
          max={1}
        />
      </Modal>
    </div>
  );
}
