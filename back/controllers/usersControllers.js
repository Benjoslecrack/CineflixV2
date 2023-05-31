import {
  getUserByEmail,
  updateUser, getUser, getUserById, getAllUsers, addMovieToWatchedListForUserId
} from "../requests/users.js";
import { createError } from "../helpers/errors.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

// GET USER
export const getUserController = async (req, res) => {
  const id = req.params.id;
  const user = await getUser(id);
  if (!user) {
    res.status(404).json({ error: "User not found" });
  } else {
    res.status(200).json(user);
  }
};
// GET UPDATE USER
export const getUserUpdateController = async (req, res) => {
  const id = req.params.id;
  console.log(id, "id for update");
  const [user, error] = await getUser(id);

  if (error) {
    res.status(404).json({ error: error, message: "user not found" });
  } else {
    res.status(200).json(user);
  }
};
// POST UPDATE USER
export const postUserUpdateController = async (req, res, next) => {
  try{
    const {id, profil_pic, username} = req.body;

    // Update BDD
    const idUserUpdate = await updateUser(req.body, id);

    res.status(200).json(idUserUpdate);
  
  } catch (err) {
    res.status(404).json(error.message);
  }
}



// POST UPDATE USERDOUBLE
export const postUserUpdateDoubleController = async (req, res, next) => {
  const id = req.params.id;
  const username = req.body.username;
  const city = req.body.city;
  console.log(username, city, "username and city");
  const { password } = req.body;
  const salt = await bcrypt.genSalt(10);
  // req.body.password = await bcrypt.hash(password, salt);
  try {
    //  let user = await updateUser(id, {...req.body});
    let user = await updateUserDouble(id, username, city);

    next();
    //  res.status(200).json(user);
  } catch (error) {
    res.status(404).json(error.message);
  }
};


// GET ALL USERS
export const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json(error.message);
  }
};


// DELETE ONE USER

export const deleteController = async (req, res) => {
  const id = req.params.id;
  try {
    await deleteUser(id);
    res.status(200).json("user deleted");
  } catch (error) {
    res.status(404).json(error);
  }
};


//VERIFY TOKEN

export const userVerifyToken = async (req, res) => {
  console.log("req token :", req.token)
  const user = await getUserById(req.token.idUser)
  console.log("user in verify token", user)
  res.status(200).send(user);
};

// ADD MOVIE TO WATCHLIST
export const addMovieToWatchedList = async (req, res) => {
  try {
    const { id } = req.params;
    const { apiMovieId } = req.body;

    // Appeler le service pour ajouter le film à la liste "Watched Movies"
    await addMovieToWatchedListForUserId(id, apiMovieId);

    res.status(200).json({ message: 'Film added to Watched Movies list' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
}