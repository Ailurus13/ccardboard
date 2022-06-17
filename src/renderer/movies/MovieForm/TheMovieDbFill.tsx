import { useState } from 'react';
import { Alert, Button, Drawer, Form, Input, message } from 'antd';
import {
  TheMovieDbProvider,
  useTheMovieDb,
} from '../../provider/TheMovieDBProvider';
import { TheMovieDbSearchMovieResultParsed } from '@renderer/util/TheMovieDb';
const { Search } = Input;

type TheMovieDbSearchItemProps = {
  onClick: (movie: TheMovieDbSearchMovieResultParsed) => void;
  movie: TheMovieDbSearchMovieResultParsed;
};

function TheMovieDbSearchItem({ movie, onClick }: TheMovieDbSearchItemProps) {
  return <p onClick={() => onClick(movie)}>{movie.title}</p>;
}

type KeyProps = {
  onMovieSelect: (movie: TheMovieDbSearchMovieResultParsed) => void;
};

function Key({ onMovieSelect }: KeyProps) {
  const [movies, setMovies] = useState<TheMovieDbSearchMovieResultParsed[]>([]);
  const [error, setError] = useState<string>();
  const { search } = useTheMovieDb();

  const onSearch = async (query: string) => {
    try {
      const movies = await search(query);
      setMovies(movies);
    } catch (e) {
      setError(
        "Erreur de lors de la requête à TheMovieDb, veuillez vérifier votre clé d'API"
      );
    }
  };

  return (
    <div>
      <Search
        placeholder="Nom du film"
        onSearch={onSearch}
        style={{ marginBottom: '2vh' }}
      />
      {error && <Alert message={error} type="error" />}
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
  );
}

function NoKey() {
  const { registerApiKey } = useTheMovieDb();

  const onFinish = async ({ key }) => {
    await registerApiKey(key);
    message.success('Clé sauvegardée avec succès !');
  };

  return (
    <div>
      <h1>Configuration</h1>
      <p>L'autocomplétion demande une clé d'API The Movie DB.</p>
      <Form onFinish={onFinish}>
        <Form.Item
          label="Clé"
          name="key"
          rules={[
            { required: true, message: "Veuillez indiquer une clé d'API" },
          ]}
        >
          <Input placeholder="Votre clé" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Valider
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

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
      onClose={onClose}
      visible={visible}
    >
      {!hasValidApiKey && <NoKey />}
      {hasValidApiKey && (
        <Key
          onMovieSelect={(movie) => {
            onMovieSelect(movie);
            onClose();
          }}
        />
      )}
    </Drawer>
  );
}

type TheMovieDbFillProps = {
  onMovieSelect: (movie: TheMovieDbSearchMovieResultParsed) => void;
};

export function TheMovieDbFill({ onMovieSelect }: TheMovieDbFillProps) {
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
