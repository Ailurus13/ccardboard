import { useContext, useEffect, useState, createContext } from 'react';

type ITheMovieDbContext = {
  hasValidApiKey: boolean;
  registerApiKey: (key: string) => Promise<void>;
};

const TheMovieDbContext = createContext<ITheMovieDbContext>(
  {} as ITheMovieDbContext
);

type TheMovieDbProviderProps = {
  children: JSX.Element | JSX.Element[];
};

export function TheMovieDbProvider(
  props: TheMovieDbProviderProps
): JSX.Element {
  const { children } = props;
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

  return (
    <TheMovieDbContext.Provider value={{ hasValidApiKey, registerApiKey }}>
      {children}
    </TheMovieDbContext.Provider>
  );
}

export function useTheMovieDb(): ITheMovieDbContext {
  return useContext(TheMovieDbContext);
}
