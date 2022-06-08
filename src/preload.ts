import { contextBridge, ipcRenderer } from 'electron';
import { CreateMovieDTO } from '@common/dto/CreateMovie.dto';
import { Movie } from '@common/entity/Movie.entity';
import { Configuration } from '@common/entity/Configuration.entity';

export type ElectronApiError = string;

export type ElectronApiResponse<T> = [T, ElectronApiError];

export type IElectronAPI = {
  createMovie: (movie: CreateMovieDTO) => Promise<ElectronApiResponse<Movie>>;
  getAllMovies: () => Promise<ElectronApiResponse<Movie[]>>;
  setConfiguration: (
    key: string,
    value: string
  ) => Promise<ElectronApiResponse<Configuration>>;
  getConfiguration: (
    key: string
  ) => Promise<ElectronApiResponse<Configuration>>;
  downloadRemotionVideo: () => Promise<void>;
};

const communication: IElectronAPI = {
  createMovie: (movie: CreateMovieDTO) =>
    ipcRenderer.invoke('movie:create', movie),
  getAllMovies: () => ipcRenderer.invoke('movie:getAll'),
  setConfiguration: (key, value) =>
    ipcRenderer.invoke('configuration:set', key, value),
  getConfiguration: (key) => ipcRenderer.invoke('configuration:get', key),
  downloadRemotionVideo: () => ipcRenderer.invoke('download-remotion'),
};

contextBridge.exposeInMainWorld('electron', communication);
