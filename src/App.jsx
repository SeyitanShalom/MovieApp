import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import MovieDetails from "./Pages/MovieDetails";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
