import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const apiKey = import.meta.env.VITE_API_KEY;

const TrendingMovies = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const res = await axios.get(
          //   `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`
        );
        const sortedMovies = res.data.results.sort(
          (a, b) => b.vote_average - a.vote_average
        );
        setTrendingMovies(sortedMovies);
        console.log(res.data.results);
      } catch (error) {
        setError("Failed to fetch movies data");
      } finally {
        setIsLoading(false);
      }
    };
    getTrendingMovies();
  }, []);
  return (
    <div className="flex justify-center items-center flex-col mb-20 p-5 ">
      <div className="container flex flex-col justify-center items-center">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : trendingMovies.length > 0 ? (
          <>
            <h1 className="text-orange-600 text-2xl font-bold mb-5 z-10">
              Trending Movies
            </h1>
            <div className="grid lg:grid-cols-5  md:grid-cols-4 xl:grid-cols-7 max-md:grid-cols-3 gap-10 max-sm:gap-10 ">
              {/* Map through the movies array and render each movie */}
              {trendingMovies.map((movie) => (
                <div
                  className="w-40 max-sm:w-28  rounded-3xl cursor-pointer  p-2 transition-all duration-500 hover:scale-110 hover:shadow-2xl"
                  key={movie.id}
                >
                  <Link
                    to={`/movie/${movie.id}`}
                    style={{ color: "white", textDecoration: "none" }}
                    target="blank"
                  >
                    {" "}
                    <img
                      className="overflow-hidden rounded-md mb-1 "
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <p className="text-sm mb-2 font-bold max-sm:text-xs">
                      {movie.title}
                    </p>
                    <p className="text-xs text-slate-300 mb-1">
                      Release Date: {movie.release_date}
                    </p>
                    <p className="text-xs font-bold text-orange-600">
                      Ratings: {movie.vote_average.toFixed(1)}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>No trending movies found</p>
        )}
      </div>
    </div>
  );
};

export default TrendingMovies;