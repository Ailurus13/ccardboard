import { contextBridge, ipcRenderer } from 'electron';
import { Movie } from '@common/entity/Movie.entity';
import { Configuration } from '@common/entity/Configuration.entity';
import { CreateMovieRequestDTO } from '@common/dto/CreateMovieRequest.dto';

export type ElectronApiError = string;

export type ElectronApiResponse<T> = [T, ElectronApiError?];

export type IElectronAPI = {
  createMovie: (
    movie: CreateMovieRequestDTO
  ) => Promise<ElectronApiResponse<Movie>>;
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
  createMovie: (movie: CreateMovieRequestDTO) =>
    ipcRenderer.invoke('movie:create', movie),
  getAllMovies: () => ipcRenderer.invoke('movie:getAll'),
  setConfiguration: (key, value) =>
    ipcRenderer.invoke('configuration:set', key, value),
  getConfiguration: (key) => ipcRenderer.invoke('configuration:get', key),
  downloadRemotionVideo: () => ipcRenderer.invoke('download-remotion'),
};

contextBridge.exposeInMainWorld('electron', communication);
