// Imports
import pool from "../databases/database.js";

export const insertMovieToWatchlist = async (movieData) => {
  const { apiMovieId, formRating, comment, userId } = movieData;

  // Insertion des données dans la table watchlist de la base de données

  const query =
    "INSERT INTO watchlist (api_movie_id, rating, comment, user_id) VALUES (?, ?, ?, ?)";
  const values = [apiMovieId, formRating, comment, userId];

  try {
    const [res] = await pool.query(query, values);
    return res;
  } catch (error) {
    console.error("Erreur lors de l'ajout du film à la watchlist :", error);
    throw error;
  }
};

export const getWatchlistById = async (id) => {
    try {
        const query = "SELECT api_movie_id, rating, comment FROM watchlist WHERE user_id = ?";
        const values = [id];
    
        const [result] = await pool.query(query, values);
        return result;
      } catch (error) {
        console.error("Erreur en allant chercher la watchlist:", error);
        throw error;
      }
}
