import {
  TheMovieDb,
  TheMovieDbSearchMovieResultParsed,
} from '../util/TheMovieDb';
import { useContext, useEffect, useState, createContext } from 'react';

type ITheMovieDbContext = {
  hasValidApiKey: boolean;
  registerApiKey: (key: string) => Promise<void>;
  search: (query: string) => Promise<TheMovieDbSearchMovieResultParsed[]>;
};

const TheMovieDbContext = createContext<ITheMovieDbContext>(
  {} as ITheMovieDbContext
);

type TheMovieDbProviderProps = {
  children: JSX.Element | JSX.Element[];
};

export function TheMovieDbProvider({ children }: TheMovieDbProviderProps) {
  const [key, setKey] = useState<string | null>(null);
  const hasValidApiKey = key ? true : false;

  useEffect(() => {
    const loadKey = async () => {
      const [config] = await window.electron.getConfiguration('tmdb-key');
      if (config) {
        setKey(config.value);
      }
    };
    loadKey();
  }, []);

  const registerApiKey = async (key: string) => {
    await window.electron.setConfiguration('tmdb-key', key);
    setKey(key);
  };

  const search = async (query: string) => {
    if (!key) {
      throw new Error('No api key to call the movie db api');
    }

    const tmdb = TheMovieDb('fr-FR', key);
    return await tmdb.search(query);
  };

  return (
    <TheMovieDbContext.Provider
      value={{ hasValidApiKey, registerApiKey, search }}
    >
      {children}
    </TheMovieDbContext.Provider>
  );
}

export function useTheMovieDb(): ITheMovieDbContext {
  return useContext(TheMovieDbContext);
}
