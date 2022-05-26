import { contextBridge, ipcRenderer } from "electron";
import { Movie } from "./model/Movie";

export interface IElectronAPI {
  createMovie: (movie: Movie) => Promise<string>;
}

const communication: IElectronAPI = {
  createMovie: (movie: Movie) => ipcRenderer.invoke("movie:create", movie),
};

contextBridge.exposeInMainWorld("electron", communication);
