// Imports
import {
  createUser,
  verifyEmailTokenFromUsers,
  updateUserIsActiveByToken,
  getUserByEmail,
  updateTokenUser,
  updatePassword,
  updateLostPassword,
  setEmailTokenAfterLost,
} from "../requests/users.js";
import { getUserRole } from "../requests/roles.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { createError } from "../helpers/errors.js";
import { createJwt } from "../helpers/jwt.js";

// Configs
dotenv.config();

// Middlewares

/** registerController
 * Fonction d'inscription
 * Crypte le mot de passe
 * Récupère le rôle de l'utilisateur
 * Signe le Token
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const registerController = async (req, res, next) => {
  console.log(req.body, "confirm register");
  try {
    /* On check si l'utilisateur existe déjà */
    const isUserAlreadyCreated = await getUserByEmail(req.body.email);
    if (isUserAlreadyCreated)
      return next(createError(400, "Le compte existe déjà"));

    /* Encrypte le mdp et creer l'utilisateur */
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashPassword;
    console.log(req.body, "confirm register22222");
    const idUser = await createUser({ ...req.body });
    if (!idUser) {
      return next(
        createError(
          1001,
          "Problème à la création du compte de l'utilisateur : ",
          req.body.email
        )
      );
    }
    const user = await getUserByEmail(req.body.email);
    const {
      password,
      is_verified,
      email_token,
      createdAt,
      updatedAt,
      ...otherUserDetails
    } = user;
    const token = createJwt(idUser);
    res
      .cookie("access_token", token, {
        httpOnly: false,
        secure: true,
        sameSite: true,
      })
      .status(200)
      .json({ user: { ...otherUserDetails }, token: token });
    console.log("everything is good");
  } catch (err) {
    res.status(500).json(err);
  }
};

/** confirmEmailController
 * Fonction qui confirme l'email d'un utilisateur via le token
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const confirmEmailController = async (req, res) => {
  try {
    /* Recupère le token et le verifie */
    const emailToken = req.params.email_token;
    const result = await verifyEmailTokenFromUsers(emailToken);
    if (result === -1) return next(createError(400, "Le token n'est pas bon"));

    /* Met à jour la valeur is_active à 1 pour l'utilisateur correspondant */
    await updateUserIsActiveByToken(emailToken);
    res.redirect(`${process.env.CORS_ORIGIN}`);
  } catch (error) {
    res.json(error);
  }
};

/** loginController
 * Fonction de connexion
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns une erreur s'il y en a une
 */
export const loginController = async (req, res, next) => {
  try {
    console.log("login");
    /* Recuperation de l'utilisateur */
    const user = await getUserByEmail(req.body.email);
    if (!user) return next(createError(400, "Le compte n'existe pas."));
    console.log("pass here to see if the account exist", req.body, user);
    /* On regarde si le MDP eest correct */
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    console.log("isPasswordCorrect", isPasswordCorrect);
    if (!isPasswordCorrect)
      return next(
        createError(
          400,
          "L'adresse mail ou le mot de passe ne correspondent pas."
        )
      );
    console.log("the account exist and the password is correct");
    /* On vérifie si le compte est actif */
    if (user.is_active === 0)
      return next(createError(400, "Le compte n'est pas actif"));
    console.log("the account is active");
  

    /* On enleve le MDP, isAdmin et idUser de la variable user*/
    const {
      password,
      is_active,
      email_token,
      createdAt,
      updatedAt,
      ...otherUserDetails
    } = user;

    /* On se connecte si tout est bon :
        Création + gestion du Token d'authentification */
    const token = createJwt(user.idUsers);
    res
      .cookie("access_token", token, {
        httpOnly: false,
        secure: true,
        sameSite: true,
      })
      .status(200)
      .json({ user: { ...otherUserDetails }, token: token });
    console.log("everything is good");
  } catch (err) {
    res.status(500).json(err.message);
  }
};

/** forgotPasswordController
 * Fonction demande un renouvelement de mdp
 * @param {*} req
 * @param {*} res
 * @returns une erreur si l'utilisateur n'a pas rentré d'adresse mail
 */
export const forgotPasswordController = async (req, res, next) => {
  try {
    /* Update le user */
    const user = await updateTokenUser(req.body.email_token, req.body.email);
    if (user === -1) return next(createError(400, "Le compte n'existe pas."));

    /* Donne l'accord */
    next();
  } catch (err) {
    res.status(500).json(err.message);
  }
};

/** ResetPasswordController
 * Fonction qui change le mdp
 * @param {*} req
 * @param {*} res
 * @returns une erreur s'il y a en une
 */
export const ResetPasswordController = async (req, res, next) => {
  try {
    /* Check si le old mdp est le même */
    if (!bcrypt.compareSync(req.body.oldPassword, req.body.currentPassword))
      return next(createError(400, "Votre mot de passe n'est pas le bon."));

    /* Check si le nouveau mdp n'est pas le même que l'ancien */
    if (req.body.oldPassword === req.body.password)
      return next(
        createError(
          400,
          "Votre mot de passe ne peut pas être le même que l'ancien."
        )
      );

    /* Récupération du mdp et encrypte le mdp */
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(req.body.password, salt);

    /* Changement du mot de passe */
    const result = await updatePassword(newPassword, req.body.currentPassword);
    if (result === -1) return next(createError(400, "Le token n'est pas bon"));

    /* Validation */
    res.status(200).json({ message: "Votre mot de passe a bien été changé" });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

/**Reset password when you forgot */
export const ResetPasswordForgotController = async (req, res, next) => {
  const emailToken = req.params.email_token;
  try {
    /* Récupération du mdp et encrypte le mdp */
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(req.body.password, salt);

    /* Changement du mot de passe */
    const result = await updateLostPassword(newPassword, emailToken);
    if (result === -1) return next(createError(400, "Le token n'est pas bon"));
    const Deletoken = await setEmailTokenAfterLost(emailToken);
    if (Deletoken === -1)
      return next(createError(400, "Le token n'a pas pu être modifié"));
    /* Validation */
    res.status(200).json({ message: "Votre mot de passe a bien été changé" });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const logoutController = (req, res) => {
  res.clearCookie("access_token");
  console.log("logout done");
  res.redirect(`${process.env.CORS_ORIGIN}`);
};
