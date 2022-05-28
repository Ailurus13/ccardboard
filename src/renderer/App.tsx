import { Routes, Route, HashRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Template } from './Template';
import { MovieForm } from './movies/MovieForm';
import { MovieList } from './movies/MovieList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Template />}>
        <Route index element={<MovieList />} />
        <Route path="create" element={<MovieForm />} />
      </Route>
    </Routes>
  );
}

function render() {
  const root = createRoot(document.getElementById('app'));
  root.render(
    <HashRouter>
      <App />
    </HashRouter>
  );
}

render();
