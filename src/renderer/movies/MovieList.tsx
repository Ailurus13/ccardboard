import { Card } from 'antd';
import { useEffect, useState } from 'react';
import { Movie } from '@common/entity/Movie.entity';

type MovieItemProps = {
  movie: Movie;
};

export function MovieItem({ movie }: MovieItemProps) {
  return <Card title={movie.name}>Coming later</Card>;
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
  );
}
