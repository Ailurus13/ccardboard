import { Routes, Route, HashRouter, Navigate } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { MovieForm } from './movies/MovieForm/MovieForm';
import { MovieList } from './movies/MovieList';
import { Template } from './template/Template';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Template />}>
        <Route index element={<Navigate to="/list" />} />
        <Route path="list" element={<MovieList />} />
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
