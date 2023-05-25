import pool from "../databases/database.js";
import { createError } from "../helpers/errors.js";

//////////////////////// REQUETES

/** Retourne les roles d'un utilisateur en fonction de son id
 * @param {*} id Id de l'utilisateur
 * @returns le tableau contenant les roles de l'utilisateur
 */
export async function getUserRole(id) {
        var [rows] = await pool.query(`
            SELECT name
            FROM roles AS r
            INNER JOIN user_roles AS ur ON ur.idroles = r.idroles
            INNER JOIN users AS u ON ur.idusers = u.idusers
            WHERE u.idusers = ?;
        `, [id]);
        return rows[0];
   
}