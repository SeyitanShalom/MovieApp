import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import MovieDetails from "./Pages/MovieDetails";
import "./App.css";
import AuthPage from "./Pages/AuthPage";
import { useState } from "react";
import Header from "./Components/Header";
import Signup from "./Components/Signup";
import Login from "./Components/Login";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  return (
    <>
      <Router basename="/MovieApp">
        <Header />

        <Routes>
          <Route
            path="/auth"
            element={<AuthPage setAuthenticated={setAuthenticated} />}
          />
          <Route path="/signup" element={<Signup authenticated />} />
          <Route path="/login" element={<Login authenticated />} />
          <Route
            exact
            path="/"
            element={authenticated ? <HomePage /> : <AuthPage />}
          />
          <Route path="/movie/:id" element={<MovieDetails />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
