import React, { useState, useEffect } from "react";
import axios from "axios";

const MovieWidget = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);


  const API_KEY = "331bb592c4c723afeda06da5aecfb63a";
  const TMDB_API_URL = "https://api.themoviedb.org/3";

  // Fetch trending movies
  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(
          `${TMDB_API_URL}/trending/movie/day?api_key=${API_KEY}`
        );
        setTrendingMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };
    
    fetchTrendingMovies();
  }, []);

  // Fetch movie details
  const fetchMovieDetails = async (movieId) => {
    try {
      const response = await axios.get(
        `${TMDB_API_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
      );
      setSelectedMovie(response.data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  return (
    <div className="p-8 rounded-2xl shadow-lg bg-gradient-to-r from-slate-800 to-gray-900 text-white max-w-full md:max-w-5xl mx-auto mt-10">
      <h2 className="text-3xl font-semibold mb-6 text-center">Trending Movies</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {trendingMovies.map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-800 rounded-xl p-4 cursor-pointer h-[350px] flex flex-col justify-between hover:bg-gray-700 transition-colors duration-200"
            onClick={() => fetchMovieDetails(movie.id)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-xl w-full h-48 object-cover mb-4"
            />
            <h3 className="text-lg font-medium truncate">{movie.title}</h3>
            <p className="text-xs text-gray-400">{movie.release_date}</p>
            {/* Display the average rating (user rating) */}
            <p className="text-xs mt-2 text-yellow-300">Rating: {movie.vote_average} / 10</p>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className="mt-10 text-center">
          <h3 className="text-xl font-semibold mb-4">{selectedMovie.title}</h3>
          <img
            src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
            alt={selectedMovie.title}
            className="rounded-xl w-48 h-72 mx-auto mb-4"
          />
          <p className="text-sm text-gray-300">{selectedMovie.overview}</p>
          <div className="mt-4">
            <h4 className="text-lg font-semibold">Ratings</h4>
            {/* Display the user rating for the selected movie */}
            <p className="text-yellow-300">Average Rating: {selectedMovie.vote_average} / 10</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieWidget;