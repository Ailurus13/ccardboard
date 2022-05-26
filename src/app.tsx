import { createRoot } from "react-dom/client";
import { MovieForm } from "./movie/MovieForm";

function App() {
  return <MovieForm />;
}

function render() {
  const root = createRoot(document.getElementById("app"));
  root.render(<App />);
}

render();
