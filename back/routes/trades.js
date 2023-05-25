// Imports
import express from "express";

// Imports controller functions
import {
  getAllTradesController,
  deleteTradeController,
  createTradeController,
  getTradeController,
  updateTradeController
} from "../controllers/tradeController.js";
import { verifyToken } from "../helpers/jwt.js";
import { verify } from "jsonwebtoken";

// Initialisation du Router
const router = express.Router();

// Routes
/** GET ALL
 * Route Get All
 */
router.get("/all", verifyToken, getAllTradesController);

/** DELETE
 * Route Delete
 */
router.delete("/:id", verifyToken, deleteTradeController);

/** UPDATE
 * Route Update
 */
router.put("/update", verifyToken, updateTradeController);

/** CREATE
 * Route Create
 */
router.post("/create", verifyToken, createTradeController);

/** GET
 * Route Get
 */
router.get("/:id", getTradeController);

export default router;
