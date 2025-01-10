import React, { useState, useEffect } from "react";
import Header from "./Header";
import Search from "./Search";
import TrendingMovies from "./TrendingMovies";

const HomePage = () => {
  return (
    <div className="container">
      <Search />
      <TrendingMovies />
    </div>
  );
};

export default HomePage;

// https://api.themoviedb.org/3/movie/157336?api_key=38301f7e8ac3b8b12e4725f048a519aa&append_to_response=videos,images
