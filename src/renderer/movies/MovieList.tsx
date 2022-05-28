import { useEffect, useState } from 'react';
import { Movie } from '@common/entity/Movie.entity';

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
    <div>
      <h1>Liste des films</h1>
      {movies.map((m) => (
        <div key={m.id}>
          <p>{m.name}</p>
        </div>
      ))}
    </div>
  );
}
