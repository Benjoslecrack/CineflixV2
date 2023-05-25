// Imports
import express from "express";

// Imports controller functions
import { postAddArticle, getAllArticles, getArticles, getArticlesById, postUpdateArticle, postDeleteArticle, getOneArticleById, getArticlesByDateController } from "../controllers/article.js";

import { verifyToken } from "../helpers/jwt.js";

import upload from "../helpers/multer.js";

// Initialisation du Router
const router = express.Router();

// Routes


/** Route de 
 * De récuperation des articles
*/
router.get("/getAll", getAllArticles);

router.get("/get/:rubrique", getArticles);

router.get("/getById/:id", getOneArticleById);

/** Route de 
 * De récuperation des articles by id
 */
router.get("/getById", verifyToken, getArticlesById);

router.get("/getByDate/:limit", getArticlesByDateController);

/** Route de
 * De création d'un article
 */
router.post("/add", verifyToken, upload, postAddArticle);

router.post("/update", verifyToken, upload, postUpdateArticle);

router.delete("/delete/:idarticles/:image", verifyToken, postDeleteArticle);


export default router;