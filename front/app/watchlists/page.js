"use client";

import { useState, useEffect } from "react";

// consts
import { useAppContext } from "../context/context";

export default function App() {
  const [apiMovies, setApiMovies] = useState(null);
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Changement de page
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // User
  const { sharedState, dispatch } = useAppContext();

  // fetch data
  useEffect(() => {
    async function getWatchList() {
      if (sharedState.user === null) return;
      const url = `${process.env.NEXT_PUBLIC_API}/movies/watchlist/${sharedState.user.id}`;
      const options = {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setMovies(result);

        // Liste ID film
        const apiMovieIds = result.map((entry) => entry.api_movie_id).join(",");
        console.log(apiMovieIds);

        // Requete
        const apiUrl = `https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids?idsList=${apiMovieIds}`;
        const apiOptions = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": process.env.NEXT_PUBLIC_MOVIE_API_KEY,
            "X-RapidAPI-Host": process.env.NEXT_PUBLIC_MOVIE_API_HOST,
          },
        };

        const apiResponse = await fetch(apiUrl, apiOptions);
        const apiResult = await apiResponse.json();
        console.log(apiResult.results);
        setApiMovies(apiResult.results);
        setTotalPages(Math.ceil(apiResult.results.length / 10));
      } catch (error) {
        console.error(error);
        setError(error);
      }
    }

    getWatchList();
  }, [sharedState.user]);

  if (movies === null || apiMovies === null) {
    return <main className="mt-[150px]">Chargement des données ...</main>;
  }

  return (
    <div className="mt-[150px]">
    {console.log(movies, apiMovies)}
      <h1 className="text-2xl font-bold mb-6">Liste des derniers films</h1>
      <div className="movie-list grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {apiMovies.map((movie, index) => (
          <a
            key={movie.id}
            href={`/movies/${movie.id}`}
            className="movie-item bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center w-48 h-72 mx-4 my-4"
          >
            <img
              src={
                movie.primaryImage !== null
                  ? movie.primaryImage.url
                  : "images/default.jpg"
              }
              alt={movie.originalTitleText.text}
              className="w-full h-48 object-contain rounded-md mb-2"
            />
            <h3 className="text-lg font-semibold text-center text-[#14181c]">
              {movie.originalTitleText.text}
            </h3>
            <p className="text-red-500">Note: {`${movies[index].rating}`}</p>
            <p className="text-red-500">Avis: {`${movies[index].comment}`}</p>
          </a>
        ))}
      </div>
      <div className="flex justify-center items-center mt-4">
        <button
          className="px-4 py-2 border border-gray-300 bg-gray-200 text-gray-700 rounded-l-md hover:bg-gray-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Précédent
        </button>
        <span className="px-4 py-2 border-t border-b border-gray-300 text-white">
          Page {currentPage} sur {totalPages}
        </span>
        <button
          className="px-4 py-2 border border-gray-300 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
