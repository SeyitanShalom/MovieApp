import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./Components/HomePage";
import MovieDetails from "./Pages/MovieDetails";
import "./App.css";
// import AuthPage from "./Pages/AuthPage";
import { useState } from "react";
import Header from "./Components/Header";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import NotFound from "./Components/NotFound";
import SharedLayout from "./Components/SharedLayout";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  const [user, setUser] = useState(null);
  return (
    <>
      <Router basename="/MovieApp/">
        <Header />

        <Routes>
          <Route path="/" element={<SharedLayout />}>
            {/* <Route path="/auth" element={<AuthPage />} /> */}
            {/* <Route
              index
              element={
                <Signup
                  authenticated={authenticated}
                  setAuthenticated={setAuthenticated}
                />
              }
            /> */}
            <Route
              index
              path="/"
              element={<Login user={user} setUser={setUser} />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/homepage"
              element={user ? <HomePage /> : <Navigate to="/" />}
            />

            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
