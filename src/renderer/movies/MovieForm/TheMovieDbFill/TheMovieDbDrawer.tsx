import { Drawer } from 'antd';
import { useTheMovieDb } from '../../../provider/TheMovieDBProvider';
import { TheMovieDbSearchMovieResultParsed } from '../../../util/TheMovieDb';
import { TheMovieDbNoKey } from './TheMovieDbNoKey';
import { TheMovieDbSearch } from './TheMovieDbSearch';

type TheMovieDbDrawerProps = {
  visible: boolean;
  onClose: () => void;
  onMovieSelect: (movie: TheMovieDbSearchMovieResultParsed) => void;
};

export function TheMovieDbDrawer({
  visible,
  onClose,
  onMovieSelect,
}: TheMovieDbDrawerProps) {
  const { hasValidApiKey } = useTheMovieDb();

  return (
    <Drawer
      title="Autocomplétion"
      placement="right"
      size="large"
      onClose={onClose}
      visible={visible}
    >
      {!hasValidApiKey && <TheMovieDbNoKey />}
      {hasValidApiKey && (
        <TheMovieDbSearch
          onMovieSelect={(movie) => {
            onMovieSelect(movie);
            onClose();
          }}
        />
      )}
    </Drawer>
  );
}
