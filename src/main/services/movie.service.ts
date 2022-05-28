import { db } from '@main/db';
import { Movie } from '@common/entity/Movie.entity';
import { CreateMovieDTO } from '@common/dto/CreateMovie.dto';

export async function createMovie(movie: CreateMovieDTO) {
  const movieRepository = db.getRepository(Movie);
  const createdMovie = new Movie();
  createdMovie.name = movie.name;
  await movieRepository.save(createdMovie);
  return createdMovie;
}
