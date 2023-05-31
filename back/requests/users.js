// Imports
import pool from "../databases/database.js";
import { createError } from "../helpers/errors.js";

//////////////////////// REQUETES

/** createUser
 * Fonction qui créer un utilisateur
 * @param {*} user les infos de l'utilisateur qui est crée
 * @returns l'id de l'utilisateur inséré
 */
export const createUser = async (user) => {
  const result = await pool.query("INSERT INTO users SET ?", [user]);
  return result[0].insertId;
};

/** verifyEmailTokenFromUsers
 * Fonction qui vérifie si le token
 * @param {*} token
 * @returns une erreur si le token ne correspond a aucun email
 * @returns L'utilisateur si le token est valide
 */
export const verifyEmailTokenFromUsers = async (email_token) => {
  try {
    const [
      result,
    ] = await pool.query("SELECT * FROM users WHERE email_token = ?", [
      email_token,
    ]);
    if (result.length === 0) {
      return (result[0] = -1);
    } else {
      return result;
    }
  } catch (err) {
    createError(
      1001,
      "Problème à la vérification du token de l'utilisateur associé au token : ",
      email_token
    );
  }
};

/** updateUserIsActiveByToken
 * Fonction qui passe is_active de l'utilisateur en fonction de son token
 * @param {*} token
 * @returns une erreur si il n'y a rien dans la bdd
 * @returns un resultat sinon
 */
export const updateUserIsActiveByToken = async (token) => {
  try {
    const [
      result,
    ] = await pool.query(
      "UPDATE users SET is_active = 1, email_token = NULL WHERE email_token = ?",
      [token]
    );

    return result;
  } catch (err) {
    createError(
      1001,
      "Problème à l'update de is_active de l'utilisateur correspondant au token : ",
      token
    );
  }
};

/**
 * Fonction qui retourne un utilisateur en fonction de son
 * @param {*} email
 * @returns une erreur si aucun utilisateur n'est trouvé
 * @returns l'utilisateur sinon
 */
export const getUserByEmail = async (email) => {
  const [result] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return result[0];
};

export const getUserById = async (id) => {
  const [result] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
  return result[0];
};

/** updateTokenUser
 * Fonction qui modifie email_token pour l'utilisateur associé a l'email
 * @param {*} email_token
 * @param {*} email
 * @returns le résultat de la requête
 */
export const updateTokenUser = async (email_token, email) => {
  try {
    const [
      result,
    ] = await pool.query("UPDATE users SET email_token = ? where email = ?", [
      email_token,
      email,
    ]);
    if (result.length === 0) {
      return (result[0] = -1);
    } else {
      return result[0];
    }
  } catch (err) {
    createError(
      1001,
      "Problème a l'update d'un nouveau token pour l'utilisateur correspondant à l'email : ",
      email
    );
  }
};

/** updatePasswordUser
 * Fonction qui change le mot de passe et reset le token a null
 * @param {*} newPassword
 * @param {*} email_token
 * @returns le résultat de la requête
 */
export const updatePassword = async (newPassword, currentPassword) => {
  try {
    const [
      result,
    ] = await pool.query("UPDATE users SET password = ? WHERE password = ?", [
      newPassword,
      currentPassword,
    ]);
    if (result.length === 0) {
      return (result[0] = -1);
    } else {
      return result[0];
    }
  } catch (err) {
    createError(
      1001,
      "Problème a l'update du nouveau mdp pour l'utilisateur correspondant au mdp : ",
      currentPassword
    );
  }
};

export const updateLostPassword = async (newPassword, emailToken) => {
  console.log("result", newPassword, "hihi", emailToken);
  const [
    result,
  ] = await pool.query("UPDATE users SET password = ? WHERE email_token = ?", [
    newPassword,
    emailToken,
  ]);
  return result[0];
};

export const setEmailTokenAfterLost = async (emailToken) => {
  const [
    result,
  ] = await pool.query(
    "UPDATE users SET email_token = NULL WHERE email_token = ?",
    [emailToken]
  );
  return result[0];
};

/**
 * GetUser
 */
export const getUser = async (id) => {
  const [
    result,
  ] = await pool.query(
    "SELECT email, profil_pic, username FROM users WHERE id = ?",
    [id]
  );
  return result[0];
};

/**
 * Get All user
 */
export const getAllUsers = async () => {
  const [result] = await pool.query(
    " SELECT username, profil_pic, id, email FROM users"
  );
  console.log("result all users", result);
  return result;
};

/** updateUser
 *
 */
export const updateUser = async (data, id) => {
  const [result] = await pool.query("UPDATE users SET ? WHERE id = ?", [
    data,
    id,
  ]);
  return result[0];
};

/**
 * Update document
 */
export const updateDocument = async (data, iduser) => {
  const [result] = await pool.query("UPDATE documents SET ? WHERE iduser = ?", [
    data,
    iduser,
  ]);
  return result[0];
};

export const addMovieToWatchedListForUserId = async (id, apiMovieId) => {
  const [result] = await pool.query(
    "INSERT INTO watched_movies (user_id, api_movie_id) VALUES (?, ?)",
    [id, apiMovieId]
  );
  return result[0];
};
