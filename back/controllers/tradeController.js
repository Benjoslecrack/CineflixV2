import {
  deleteTrade,
  getAllTrades,
  getTrade,
  createTrade,
  updateTrade
} from "../requests/trades.js";

/** getAllTradesController
 * Recupère tout les trades d'un utilisateur en fonction de son id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const getAllTradesController = async (req, res, next) => {
  try {
    const result = await getAllTrades(req.token.idUser);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(404).json(error.message);
  }
};

/** deleteTradeController
 * Supprime un trade pour un utilisateur en fonction de son id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const deleteTradeController = async (req, res, next) => {
  const [result] = await getTrade(req.body.id);
  if (result.userId !== req.token.idUser)
    return console.log({
      error: "Vous n'êtes pas autorisé à effectuer cette action",
    });
  try {
    const result = await deleteTrade(req.body.id);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(404).json(error.message);
  }
};

/** createTradeController
 * Créer un Trade en fonction de l'id de l'utilisateur
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const createTradeController = async (req, res, next) => {
  try {
    const id = await createTrade({ ...req.body, userId: req.token.idUser });
    res.status(200).json(id);
  } catch (error) {
    console.error(error);
    res.status(404).json(error.message);
  }
};

/** export const getTradeController = async (req, res, next) => {
 * Récupère un Trade en fonction de son id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const getTradeController = async (req, res, next) => {
  try {
    const result = await getTrade(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(404).json(error.message);
  }
};

export const updateTradeController = async (req, res, next) => {
  try {
    const result = await updateTrade({ ...req.body });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(404).json(error.message);
  }
};
