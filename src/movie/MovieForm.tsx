import { useState } from "react";
import { IElectronAPI } from "../preload";

// TODO: Make it global
declare global {
  interface Window {
    electron: IElectronAPI;
  }
}

export function MovieForm() {
  const [name, setName] = useState("");

  console.log(name);

  const createMovie = async () => {
    const test = await window.electron.createMovie({ name });
    setName(test);
  };

  return (
    <div>
      <h1>Nouveau film</h1>
      <div className="pb-2">
        <span className="pr-2">Nom :</span>
        <input
          type="text"
          placeholder="Spiderman"
          className="border-2 rounded pr-2 pl-2 pt-1 pb-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-400 rounded pr-2 pl-2 pt-1 pb-1"
        onClick={createMovie}
      >
        Valider
      </button>
    </div>
  );
}
