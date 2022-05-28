import { createRoot } from 'react-dom/client';
import { MovieForm } from './movie/MovieForm';
import { MovieList } from './movie/MovieList';

function App() {
  return (
    <div>
      <MovieForm />
      <MovieList />
    </div>
  );
}

function render() {
  const root = createRoot(document.getElementById('app'));
  root.render(<App />);
}

render();
