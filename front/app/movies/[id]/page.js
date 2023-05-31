"use client";

import { useState, useEffect } from "react";

// consts
import { useAppContext } from "../../context/context";

import { useRouter } from "next/navigation";

export default function App({ params }) {
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState(null);
  const [error, setError] = useState(null);

  const [formRating, setFormRating] = useState(0);
  const [comment, setComment] = useState("");

    const router = useRouter();

  // User
  const { sharedState, dispatch } = useAppContext();

  useEffect(() => {
    // Appelle du film
    async function fetchData() {
      const url = `https://moviesdatabase.p.rapidapi.com/titles/${params.id}`;
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
        setMovie(result.results);
      } catch (error) {
        setError(error);
        console.error(error);
      }
    }

    // Film Rating
    async function fetchDataRating() {
      const url = `https://moviesdatabase.p.rapidapi.com/titles/${params.id}/ratings`;
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
        setRating(result.results);
      } catch (error) {
        setError(error);
        console.error(error);
      }
    }

    // Call fonction APIs
    fetchData();
    fetchDataRating();
  }, []);

  const handleRatingChange = (e) => {
    setFormRating(parseInt(e.target.value));
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiMovieId = params.id;
    const userId = sharedState.user.id;

    // Ajout à la watchList
    const url = `${process.env.NEXT_PUBLIC_API}/movies/addWatchlist`;
    const options = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ apiMovieId, formRating, comment, userId }),
    };

    try {
      const response = await fetch(url, options);
      await response.json();
      router.push("/")
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };

  // Chargement de l'api
  if (movie === null) {
    return <div className="mt-[150px]">Chargement en cours ...</div>;
  }

  return (
    <div className="mt-[150px]">
      <img
        src={
          movie.primaryImage !== null
            ? movie.primaryImage.url
            : "images/default.jpg"
        }
        alt={movie.originalTitleText.text}
        className="w-64 h-auto mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">
        {movie.originalTitleText.text}
      </h1>
      <p>
        Date de sortie : {movie.releaseDate.day}/{movie.releaseDate.month}/
        {movie.releaseDate.year}
      </p>
      {rating !== null ? (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Notation :</h2>
          <p>Rating: {rating.averageRating}</p>
          <p>Votes: {rating.numVotes}</p>
        </div>
      ) : (
        <></>
      )}
      {sharedState.user === null ? (
        <></>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="font-bold" htmlFor="rating">
              Rating:
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              min="0"
              max="10"
              onChange={handleRatingChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="font-bold" htmlFor="comment">
              Commentaire:
            </label>
            <textarea
              id="comment"
              name="comment"
              onChange={handleCommentChange}
              className="border border-gray-300 rounded-md p-2 w-full text-gray-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Ajouter à la watchlist
          </button>
        </form>
      )}
    </div>
  );
}
