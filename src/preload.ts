import { contextBridge, ipcRenderer } from 'electron';
import { Movie } from './model/Movie';

export type ElectronApiError = string;

export type ElectronApiResponse<T> = [T, ElectronApiError];

export type IElectronAPI = {
  createMovie: (movie: Movie) => Promise<ElectronApiResponse<string>>;
};

const communication: IElectronAPI = {
  createMovie: (movie: Movie) => ipcRenderer.invoke('movie:create', movie),
};

contextBridge.exposeInMainWorld('electron', communication);
