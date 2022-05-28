import { contextBridge, ipcRenderer } from 'electron';
import { CreateMovieDTO } from '@common/dto/CreateMovie.dto';
import { Movie } from '@common/entity/Movie.entity';

export type ElectronApiError = string;

export type ElectronApiResponse<T> = [T, ElectronApiError];

export type IElectronAPI = {
  createMovie: (movie: CreateMovieDTO) => Promise<ElectronApiResponse<Movie>>;
};

const communication: IElectronAPI = {
  createMovie: (movie: CreateMovieDTO) =>
    ipcRenderer.invoke('movie:create', movie),
};

contextBridge.exposeInMainWorld('electron', communication);
