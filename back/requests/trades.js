import pool from "../databases/database.js";

// GetAllUser
export const getAllTrades = async (userId) => {
    const [result] = await pool.query(
        "SELECT * FROM tradingbook WHERE userId = ?;", [userId]
    )
    console.log("result all tradingbook", result)
    return result;
}

// GetTrade
export const getTrade = async (id) => {
    const [result] = await pool.query(
        "SELECT * FROM tradingbook WHERE id = ?", [id]
    )
    console.log("result getTrade ", result);
    return result;
}

// DeleteTrade
export const deleteTrade = async (id) => {
    const [result] = await pool.query(
        "DELETE FROM tradingbook WHERE id = ?", [id]
    )
    console.log("result deleteTrade ", result);
    return result;
}

// createTrade
export const createTrade = async (trade) => {
    const [result] = await pool.query(
        "INSERT INTO tradingbook SET ?", [trade]
    );
    return result.insertId;
}

// updateTrade
export const updateTrade = async (trade) => {
    const [result] = await pool.query(
        "UPDATE tradingbook SET ? WHERE id = ?", [trade, trade.id]
    )
}