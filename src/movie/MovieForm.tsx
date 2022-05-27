import { useState } from 'react';

export function MovieForm() {
  const [name, setName] = useState('');

  const createMovie = async () => {
    const [res, err] = await window.electron.createMovie({ name });
    if (res) {
      setName(res);
    } else {
      console.log(`Oups y'a une erreur bg : ${err}`);
    }
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
