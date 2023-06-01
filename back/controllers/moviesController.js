import { insertMovieToWatchlist, getWatchlistById } from '../requests/movies.js';

export const addMovieToWatchlist = async (req, res) => {
    try{
        // Enregistrer en BDD
        const resultat = await insertMovieToWatchlist(req.body);
        res.status(200).json(resultat);
    } catch (err) {
        res.status(404).json(err.message);
    }
}

export const getWatchlist = async (req, res) => {
    try {
        console.log(req.params);
        const watchList = await getWatchlistById(req.params.id);
        console.log(watchList)
        res.status(200).json(watchList);
    } catch (err) {
        res.status(404).json(err.message);
    }
}