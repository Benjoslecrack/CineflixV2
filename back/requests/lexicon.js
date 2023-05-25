// Imports
import pool from "../databases/database.js";
import { createError } from "../helpers/errors.js";

//////////////////////// REQUETES

/** createUser
 * Fonction qui créer un utilisateur
 * @param {*} user les infos de l'utilisateur qui est crée
 * @returns l'id de l'utilisateur inséré
 */
export const createWord = async (word) => {
    const result = await pool.query("INSERT INTO lexicon SET ?", [word]);
        return result[0].insertId;
};

/**
 * Get All Word
 */
export const getAllWord = async () =>{
    const [result] = await pool.query(
        " SELECT * FROM lexicon ORDER BY word ASC"
    )
    return result
    }

/**
 * Get Word by itself
 */
export const getWord = async (id) =>{
    const [result] = await pool.query(
        " SELECT lex.idlexicon, lex.word, lex.description, lex.lexiconUser, us.idusers, us.lastname, us.firstname FROM lexicon as lex INNER JOIN users as us ON lex.lexiconUser=us.idusers WHERE idlexicon = ?", [id]
    )
    return result[0]
    }

    /**
 * Get All Word by UserId
 */
export const getAllWordByUserId = async (id) =>{
    const [result] = await pool.query(
        " SELECT lex.idlexicon, lex.word, lex.description, lex.lexiconUser, us.idusers  FROM lexicon as lex INNER JOIN users as us ON lex.lexiconUser=us.idusers WHERE lexiconUser= ?  ORDER BY lex.word ASC", [id]
    )
    return result
    }


/** update Word
 * 
 */
export const updateWord = async (data, id) => {
    const [result] = await pool.query(
        "UPDATE lexicon SET ? WHERE idlexicon = ?"
    ,[data, id])
   return result[0] 
}


//** delete Word */
export const deleteWord = async (id) => {
    const [result] = await pool.query(
        "DELETE FROM lexicon WHERE idlexicon = ?"
    ,[id])
   return result[0] 
}
