import { Card, Empty, Image } from 'antd';
import { useEffect, useState } from 'react';
import { Movie } from '@common/entity/Movie.entity';

type MovieItemProps = {
  movie: Movie;
};

export function MovieItem({ movie }: MovieItemProps) {
  return (
    <Card title={movie.name}>
      <p>Release : {movie.release}</p>
      <p>Rated : {movie.rated}</p>
      <p>{`Art et essai : ${movie.arthouse}`}</p>
      <Image src={`filestorage://${movie.poster}`} />
      {movie.seances?.map((s) => (
        <p>{s.date.toDateString()}</p>
      ))}
    </Card>
  );
}

export function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const [movies] = await window.electron.getAllMovies();
      setMovies(movies);
    };
    fetchMovies();
  }, []);

  return (
    <>
      {movies.length == 0 && (
        <div>
          <Empty description="Vous n'avez pas encore ajouté de séances" />
        </div>
      )}
      {movies.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '1vw',
          }}
        >
          {movies.map((m) => (
            <MovieItem key={m.id} movie={m} />
          ))}
        </div>
      )}
    </>
  );
}
