/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Exercise 02: Movie Library
 * We are trying to make a movie library for internal users. We are facing some issues by creating this, try to help us following the next steps:
 * !IMPORTANT: Make sure to run yarn movie-api for this exercise
 * 1. We have an issue fetching the list of movies, check why and fix it (handleMovieFetch)
 * 2. Create a filter by fetching the list of gender (http://localhost:3001/genres) and then loading
 * list of movies that belong to that gender (Filter all movies).
 * 3. Order the movies by year and implement a button that switch between ascending and descending order for the list
 * 4. Try to recreate the user interface that comes with the exercise (exercise02.png)
 *
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import "./assets/styles.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Nav from "../../Nav/Nav";

export default function Exercise02() {
  const [movies, setMovies] = useState([]);
  const [fetchCount, setFetchCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [orderBy, setOrderBy] = useState("asc"); // Estado para el orden de las películas

  useEffect(() => {
    handleMovieFetch();
    fetchGenre();
  }, []);

  const fetchGenre = async () => {
    try {
      const response = await axios.get("http://localhost:3001/genres");
      setGenres(response.data);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const handleGenreCharge = (event) => {
    const genre = event.target.value;
    setSelectedGenre(genre);
    filterMovies(genre);
  };

  const filterMovies = (genre) => {
    if (genre === "") {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter((movie) => movie.genres.includes(genre));
      setFilteredMovies(filtered);
    }
  };

  const handleMovieFetch = async () => {
    setLoading(true);
    setFetchCount(fetchCount + 1);
    console.log("Getting movies");

    try {
      const response = await axios.get(
        "http://localhost:3001/movies?_limit=50"
      );
      const moviesData = response.data.map((movie) => ({
        ...movie,
        id: Math.floor(Math.random() * 1000),
      }));
      setMovies(moviesData);
      setFilteredMovies(moviesData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setLoading(false);
    }
  };

  const handleOrderChange = () => {
    const newOrder = orderBy === "asc" ? "desc" : "asc"; // Cambiar el orden actual
    setOrderBy(newOrder);
    const sortedMovies = [...filteredMovies].sort((a, b) => {
      if (newOrder === "asc") {
        return parseInt(a.year, 10) - parseInt(b.year, 10);
      } else {
        return parseInt(b.year, 10) - parseInt(a.year, 10);
      }
    });
    setFilteredMovies(sortedMovies);
  };

  return (
    <section className="movie-library">
      <Nav />
      <div className="movie-library__actions">
        <select
          name="genre"
          placeholder="Search by genre..."
          onChange={handleGenreCharge}
          value={selectedGenre}
          className="movie-library__select"
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <button
          onClick={handleOrderChange}
          className="movie-library__order-button"
        >
          {orderBy === "asc" ? "Order Descending" : "Order Ascending"}
        </button>
      </div>
      {loading ? (
        <div className="movie-library__loading">
          <p>Loading...</p>
        </div>
      ) : (
        <ul className="movie-library__list">
          {filteredMovies.map((movie) => (
            <li key={movie.id} className="movie-library__card">
              <img src={movie.posterUrl} alt={movie.title} />
              <ul>
                <li>ID: {movie.id}</li>
                <li>Title: {movie.title}</li>
                <li>Year: {movie.year}</li>
                <li>Runtime: {movie.runtime}</li>
                <li>Genres: {movie.genres.join(", ")}</li>
              </ul>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
