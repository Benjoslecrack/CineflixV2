import express from "express";
import {
  getUserController,
  postUserUpdateController,
  userVerifyToken,
  getAllUsersController,
  addMovieToWatchedList
} from "../controllers/usersControllers.js";
import { verifyToken } from "../helpers/jwt.js";
const router = express.Router();

import upload from "../helpers/multer.js";

router.get("/", (req, res, next) => {
  res.send("We are on users");
});

//router.delete("/delete/:id", deleteController); // DELETE USER (DELETE)
//router.get("/update/:id", verifyToken, getUserUpdateController); // UPDATE USER (GET)
router.post("/update/:id", verifyToken, postUserUpdateController); // UPDATE USER (POST)

router.get("/get/all", getAllUsersController); // ALL USERS (GET)
//router.get("profile/:id", verifyToken, getUserController); // PROFILE (GET")
router.get("/verifytoken", verifyToken, userVerifyToken);
router.get("/:id", verifyToken, getUserController); // USER (GET)
//router.post("/updateDouble/:id", upload, postUserUpdateDoubleController, getUserController); // UPDATE USER (POST)

// Route pour ajouter un film à la liste "Watched Movies" d'un utilisateur
router.post(
  "/users/:id/watched-movies",
  verifyToken,
  addMovieToWatchedList
);

export default router;
