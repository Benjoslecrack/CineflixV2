"use client";

import { useState, useEffect } from "react";

// consts
import { useAppContext } from "../context/context";

export default function App() {
  const [idMovies, setIdMovies] = useState(null);
  const [movies, setMovies] = useState(null);

  const { sharedState, dispatch } = useAppContext();

  useEffect(() => {
    async function getWatchList() {
      console.log(sharedState.user.id)
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
        setIdMovies(result);
        console.log("idmovies", idMovies);
      } catch (error) {
        setError(error);
        console.error(error);
      }
    };

    getWatchList();
  }, [sharedState.user]);

  if (movies === null) {
    return <main className="mt-[150px]">Chargement des données ...</main>;
  }

  return <main className="mt-[150px]">Bienvenue sur les Watchlists</main>;
}
