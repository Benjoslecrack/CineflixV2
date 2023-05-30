// Imports
import express from "express";
import { generateAccessToken, verifyToken } from "../helpers/jwt.js";
import { SendMailWithConfirmationLink, SendMailWithResetPasswordLink } from "../helpers/mailer.js"

// Imports controller functions
import {
    registerController,
    confirmEmailController,
    loginController,
    forgotPasswordController,
    ResetPasswordController,
    logoutController,
    ResetPasswordForgotController
} from "../controllers/authController.js";

// Initialisation du Router
const router = express.Router();

// Routes

/** Route de 
 * D'inscription
 */
router.post("/register",  generateAccessToken, registerController);

/**
 * Route de
 * Confirmation de l'email
 */
router.get("/confirmation/:email_token", confirmEmailController);

/**
 * Route de
 * Connexion
 */
router.post("/login", loginController);

/** 
 * Route de 
 * Demande d'un nouveau mdp
*/
router.post("/forgotPassword", generateAccessToken, forgotPasswordController, SendMailWithResetPasswordLink);

/**
 * Route de 
 * Changement de mot de passe
 */
router.post("/resetPassword", verifyToken, ResetPasswordController);


router.post("/resetPasswordForgot/:email_token", ResetPasswordForgotController)
/**
 * Route de
 * Déconnexion
 */
router.post("/logout", logoutController);

export default router;