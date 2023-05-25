import pool from "../databases/database.js";

// POST CREATE CONTACT SEND MESSAGE
export const addArticle = async (data) => {
    const result = await pool.query("INSERT INTO articles SET ?", [data]);
    console.log(result[0]);
    return result[0].insertId;
};

export const allArticles = async () => {
    const result = await pool.query("SELECT * FROM articles");
    return result[0];
};

export const getAllArticlesByRubrique = async (rubrique) => {
    const result = await pool.query("SELECT * FROM articles where rubrique = ?", [rubrique]);
    return result[0];
};

export const getAllArticlesById = async (id) => {
    const result = await pool.query("SELECT * FROM articles WHERE idUserArticle = ?", [id]);
    return result[0];
}

export const updateArticle = async (data) => {
    const result = await pool.query("UPDATE articles SET ? WHERE idarticles = ?", [data, data.idarticles]);
    return result[0];
}

export const deleteArticle = async (id) => {
    const result = await pool.query("DELETE FROM articles WHERE idarticles = ?", [id]);
    return result[0];
}

export const getArticleById = async (id) => {
    const result = await pool.query("SELECT * FROM articles WHERE idarticles = ?", [id]);
    return result[0];
}

export const getArticleByDate = async (limit) => {
    const result = await pool.query("SELECT * FROM articles ORDER BY date DESC limit ?", [limit]);
    return result[0]
}