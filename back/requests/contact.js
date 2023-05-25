import pool from "../databases/database.js";

// POST CREATE CONTACT SEND MESSAGE
export const createContact = async (email,message) => {
    console.log(email, "je suis dans req createcontact")
    const result = await pool.query("INSERT INTO visitormsg SET ?", [
        email,
        message,
    ]);
    console.log(result[0]);
    return result[0].insertId;
};

// GET ALL CONTACTS
export const getAllContactsMessages = async () => {
    const rows = await pool.query("SELECT * FROM visitormsg");
    if (rows.length > 0) {
        return rows;
    } else {
        return [-1, "No contact message found"];
    }
};

 // GET CONTACTS
export const getContacts = async () => {
    const rows = await pool.query("SELECT email FROM visitormsg");
    if (rows.length > 0) {
        return rows;
    } else {
        return [-1, "No contact message found"];
    }
};

// GET CONTACT BY ID
export const getContactById = async (id) => {
    id = parseInt(id);
    if (Number.isInteger(id)) {
        var rows = await pool.query("SELECT * FROM visitormsg WHERE idContact = ?", [id]);
        if (rows.length > 0) {
            return rows[0];
        } else {
            return [-1, "Contact not found"];
        }
    } else {
        return [-2, "Invalid ID"];
    }
};
// POST UPDATE CONTACT
export const updateContact = async (id, contact) => {
    const result = await pool.query("UPDATE visitormsg SET ? where idContact = ?", [contact, id]);
    console.log(result[0]);
    return result;
}
// DELETE CONTACT (POST)
export const deleteContact = async (id) => {
    id = parseInt(id);
    if (Number.isInteger(id)) {
        var rows = await pool.query("DELETE FROM contact_message WHERE idContact = ?", [id]);
        if (rows.length > 0) {
            return rows[0];
        } else {
            return [-1, "Contact not found"];
        }
    } else {
        return [-2, "Invalid ID"];
    }
};

