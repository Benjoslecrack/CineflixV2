"use client";

import { useState, useEffect } from "react";

export default function App() {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  useEffect(() => {
    async function fetchData() {
      const url = `https://moviesdatabase.p.rapidapi.com/titles?year=2023&page=${currentPage}`;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_MOVIE_API_KEY,
          "X-RapidAPI-Host": process.env.NEXT_PUBLIC_MOVIE_API_HOST,
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setMovies(result.results);
        console.log("results", result.results);
      } catch (error) {
        setError(error);
        console.error(error);
      }
    }
    fetchData();
  }, [currentPage]);

  // Changement de page
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Chargement de l'api
  if (movies === null) {
    return <div className="mt-[150px]">Chargement en cours ...</div>;
  }

  return (
    <div className="mt-[150px]">
      <h1 className="text-2xl font-bold mb-6">Liste des derniers films</h1>
      <div className="movie-list grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {movies.map((movie) => (
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
