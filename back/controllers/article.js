import dotenv from "dotenv";
dotenv.config();
import {
    addArticle,
    allArticles,
    getAllArticlesByRubrique,
    getAllArticlesById,
    updateArticle,
    deleteArticle,
    getArticleById,
    getArticleByDate
} from "../requests/article.js";
import fs from "fs";

// GET CONTACT MESSAGE PAGE
export const postAddArticle = async (req, res) => {
    console.log(req.body);
    req.body.date = new Date();
    if (req.files.cv) {
        req.body.imageArticle = req.files.cv[0].filename;
    }
    req.body.idUserArticle = req.token.idUser;
    const article = await addArticle(req.body);
    console.log(article);
    if (article) {
        res.status(200).json(article);
    } else {
        res.status(404).json({ error: "une erreur est survenue a la création de l'article" });
    }
};

export const getAllArticles = async (req, res) => {
    console.log("getAllArticles");
    const articles = await allArticles();
    if (articles) {
        res.status(200).send(articles);
    } else {
        res.status(404).json({ error: "une erreur est survenue a la récupération des articles" });
    }
}

export const getArticles = async (req, res) => {
    console.log(req.params.rubrique, "getArticles");
    const articles = await getAllArticlesByRubrique(req.params.rubrique);
    if (articles) {
        res.status(200).json(articles);
    } else {
        res.status(404).json({ error: "une erreur est survenue a la récupération des articles" });
    }
}

export const getArticlesByDateController = async (req, res) => {
    const limit = parseInt(req.params.limit, 10)
    const articles = await getArticleByDate(limit);
    console.log("artcicles", articles)
    if (articles) {
        res.status(200).json(articles);
    } else {
        res.status(404).json({ error: "une erreur est survenue a la récupération des articles" })
    }
}

export const getArticlesById = async (req, res) => {
    const articles = await getAllArticlesById(req.token.idUser);
    if (articles) {
        res.status(200).json(articles);
    } else {
        res.status(404).json({ error: "une erreur est survenue a la récupération des articles" });
    }
}


export const getOneArticleById = async (req, res) => {
    const id = req.params.id;
    const articles = await getArticleById(id);
    if (articles) {
        res.status(200).json(articles);
    } else {
        res.status(404).json({ error: "une erreur est survenue a la récupération des articles" });
    }
}



export const postUpdateArticle = async (req, res) => {
    console.log(req.body);
    req.body.date = new Date();
    if (req.files.cv) {
        fs.unlink(`./public/uploads/${req.body.imgPrec}`, (err) => {
            if (err) {
                console.error(err);
                return;
            }
        });
        req.body.imageArticle = req.files.cv[0].filename;
        delete req.body.imgPrec;
    }
    req.body.idUserArticle = req.token.idUser;
    console.log(req.body, "eeeeeeeeeeeee");
    const article = await updateArticle(req.body);
    console.log(article);
    if (article) {
        res.status(200).json(article);
    } else {
        res.status(404).json({ error: "une erreur est survenue a la création de l'article" });
    }
}

export const postDeleteArticle = async (req, res) => {
    console.log(req.params);
    if (req.params.image) {
        fs.unlink(`public/uploads/${req.params.image}`, (err) => {
            if (err) {
                console.error(err);
                return;
            }
        });
    }
    const article = await deleteArticle(req.params.idarticles);
    console.log(article);
    if (article) {
        res.status(200).json(article);
    } else {
        res.status(404).json({ error: "une erreur est survenue a la supression de l'article" });
    }
}