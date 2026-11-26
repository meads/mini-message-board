const pool = require("./pool")

async function getAllMessages() {
    const { rows } = await pool.query("SELECT id, username, text, added FROM messages");
    return rows;
}

async function insertMessage(username, text) {
    await pool.query("INSERT INTO messages (username, text) VALUES ($1, $2)", [username, text]);
}

async function getMessageById(id) {
    const { rows } = await pool.query("SELECT id, username, text, added FROM messages WHERE id = $1", [id]);
    if (rows && rows.length === 1) {
        return rows[0]
    }
    return null;
}

module.exports = {
    insertMessage,
    getAllMessages,
    getMessageById
}
