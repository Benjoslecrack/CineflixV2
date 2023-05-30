"use client";

import { useState, useEffect } from "react";

export default function App({ params }) {
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
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
    async function fetchDataRating() {
      const url = `https://moviesdatabase.p.rapidapi.com/titles/${params.id}/ratings`;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "fe9d345140msheba806bd53b6fd2p10e943jsn5c52d050eb26",
          "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
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

  // Chargement de l'api
  if (movie === null) {
    return <div className="mt-[150px]">Chargement en cours ...</div>;
  }

  return (
    <div className="mt-[150px]">
      {console.log("movie", movie)}
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
    </div>
  );
}
