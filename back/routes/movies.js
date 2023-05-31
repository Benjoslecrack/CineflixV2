// Imports
import express from "express";

// Imports controller functions
import { addMovieToWatchlist, getWatchlist } from "../controllers/moviesController.js";
import { verifyToken } from "../helpers/jwt.js";

// Initialisation du Router
const router = express.Router();

// Routes

/**
 * Ajouter un film à la WatchList
 */
router.post("/addWatchlist", verifyToken, addMovieToWatchlist);

router.get("/watchlist/:id", verifyToken, getWatchlist);

export default router;