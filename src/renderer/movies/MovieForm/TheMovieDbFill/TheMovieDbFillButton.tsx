import { Button } from 'antd';
import { useState } from 'react';
import { TheMovieDbProvider } from '../../../provider/TheMovieDBProvider';
import { TheMovieDbSearchMovieResultParsed } from '../../../util/TheMovieDb';
import { TheMovieDbDrawer } from './TheMovieDbDrawer';

type TheMovieDbFillButtonProps = {
  onMovieSelect: (movie: TheMovieDbSearchMovieResultParsed) => void;
};

export function TheMovieDbFillButton({
  onMovieSelect,
}: TheMovieDbFillButtonProps) {
  const [visible, setVisible] = useState(false);

  return (
    <TheMovieDbProvider>
      <Button
        type="default"
        onClick={() => {
          setVisible(true);
        }}
      >
        Autocomplétion
      </Button>
      <TheMovieDbDrawer
        onMovieSelect={onMovieSelect}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
      />
    </TheMovieDbProvider>
  );
}
