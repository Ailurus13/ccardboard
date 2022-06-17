import { db } from '@main/db';
import { Movie } from '@common/entity/Movie.entity';
import { CreateMovieDTO } from '@common/dto/CreateMovie.dto';
import { Seance } from '@common/entity/Seance.entity';

export async function createMovie(movie: CreateMovieDTO) {
  const movieRepository = db.getRepository(Movie);
  const createdMovie = new Movie();
  createdMovie.name = movie.name;
  createdMovie.arthouse = movie.arthouse;
  createdMovie.release = movie.release;
  createdMovie.rated = movie.rated;
  createdMovie.poster = movie.poster;
  createdMovie.seances = movie.seances?.map((s) => {
    const seance = new Seance();
    seance.date = s.date;
    seance.langage = s.langage;
    return seance;
  });
  await movieRepository.save(createdMovie);
  return createdMovie;
}

export async function getAllMovies() {
  const movieRepository = db.getRepository(Movie);
  const movies = await movieRepository.find();
  return movies;
}
