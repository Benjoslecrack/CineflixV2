import {
  getUserByEmail,
  updateUser, getUser, getUserById,getAllUsers
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
  const id = req.params.id;
  console.log(id, "id for update");
  const user = await getUserById(id);
  console.log("user", user)
  const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
  if (!isPasswordCorrect) {
    const error = new Error("Le mot de passe est incorrect.");
    error.status = 400;
    return next(error);
  }
  delete req.body.password;
  if(req.files.cv){
    if(user.cv){
      fs.unlink(`./public/uploads/${user.cv}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    }
    req.body.cv = req.files.cv[0].filename;
  }
  if(req.files.pp){
    if(user.pp){
      fs.unlink(`./public/uploads/${user.pp}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    }
    req.body.pp = req.files.pp[0].filename;
  }
  console.log("updateuser", req.body)
  try {
    let user = await updateUser(req.body, req.body.email);
    res.status(200).json(user);
    next();
  } catch (error) {
    res.status(404).json({ message: error.message, passwordError: error.status === 400 ? error.message : undefined });
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