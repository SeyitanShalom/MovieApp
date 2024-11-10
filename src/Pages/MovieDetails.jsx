import React, { useEffect, useState } from "react";
import { generatePath, Link, useParams } from "react-router-dom";
import axios from "axios";
import HomePage from "../Components/HomePage";

const apiKey = import.meta.env.VITE_API_KEY;

const MovieDetails = () => {
  const [genres, setGenres] = React.useState([]);

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [recMovies, setRecMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      try {
        const movieRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
        );
        const creditRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`
        );
        setMovie(movieRes.data);
        setCast(creditRes.data.cast);
        // console.log(movieRes.data);
        // console.log(creditRes.data.cast);

        // const genreIds = movieRes.data.genres.map((genre) => genre.id);
        // const recommendedMovies = await axios.get(
        //   `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreIds}`
        // );
        const similarMoviesResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}`
        );
        setRecMovies(similarMoviesResponse.data.results);
        console.log(similarMoviesResponse.data.results);
      } catch (error) {
        setError("Failed to get movie details");
      } finally {
        setIsLoading(false);
      }
    };
    getMovieDetails();
  }, [id]);

  useEffect(() => {
    const getGenres = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
        );
        setGenres(res.data.genres);
      } catch (error) {
        setError("Failed to fetch genres");
      } finally {
        setIsLoading(false);
      }
    };
    getGenres();
  }, []);

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center p-7">
      <div
        className="container flex-col justify-center items-center max-md:mt-10 mt-32 mb-20
      "
      >
        {isLoading && <p>Loading...</p>}
        <div className="flex max-md:flex-wrap mb-24 gap-10 ">
          <div className="max-md:w-full w-96 shrink-0">
            <img
              className="w-full rounded-lg"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
          <div className="max-md:mt-0 mt-5 max-md:text-base text-lg">
            <h1 className="font-black max-md:text-lg  text-2xl mb-4">
              {movie.title}
            </h1>
            <p className="">
              <span className="text-orange-600 font-bold">Genre:</span>{" "}
              {movie.genres.map((genre) => genre.name).join(", ")}
            </p>
            <p className="w-5/6 max-md:w-full">
              <span className="text-orange-600 font-bold ">Synopsis:</span>{" "}
              {movie.overview}
            </p>
            <p className="">
              <span className="text-orange-600 font-bold">Release date:</span>{" "}
              {movie.release_date}
            </p>
            <p className="">
              <span className="text-orange-600 font-bold">Ratings:</span>{" "}
              {movie.vote_average.toFixed(1)}
            </p>
            <Link
              to={movie.homepage}
              target="blank"
              className="text-orange-600 underline text-base font-medium hover:text-white transition-all hover:no-underline duration-300 mt-12"
            >
              Click to visit the official website
            </Link>
          </div>
        </div>
        {cast.length > 0 ? (
          <div className="flex flex-col">
            <h2 className="mb-5 text-lg font-bold">Cast</h2>
            <div className="flex flex-nowrap overflow-x-auto gap-10 ">
              {cast.slice(0, 10).map((castMember) => (
                <div className="w-24 shrink-0 " key={castMember.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${castMember.profile_path}`}
                    alt={castMember.name}
                    className="w-full  rounded-full contain"
                  />
                  <h4 className="text-sm font-bold mb-1">{castMember.name}</h4>
                  <p className="text-xs font-semibold">
                    {castMember.character}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>No cast details found!</p>
        )}
        <div className="mt-20">
          <h2 className="text-xl font-bold mb-4">Recommended Movies</h2>
          {recMovies.length > 0 ? (
            <div className="grid grid-cols-7 max-md:grid-cols-3 gap-10">
              {recMovies.map((movie) => (
                <div key={movie.id} className="max-md:w-28">
                  <Link
                    to={`/movie/${movie.id}`}
                    target="blank"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                      className="rounded-lg"
                    />
                    <h5 className="text-sm mb-2 font-bold mt-1.5">
                      {movie.title}
                    </h5>
                    <p className="text-xs text-gray-300 ">
                      Release Date: {movie.release_date}
                    </p>
                    <p className="text-orange-600 text-xs font-bold mt-1">
                      Ratings: {movie.vote_average.toFixed(1)}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p>No recommended movies available.</p>
          )}
        </div>
        <div className="flex justify-center items-center mt-20">
          <Link to={"/"}>
            <button className="bg-orange-600 font-bold px-5 rounded-lg py-2">
              Go Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
