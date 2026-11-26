const db = require("../db/queries")

async function getMessages(req, res) {
    const messages = await db.getAllMessages();
    res.render("index", { title: "Mini Message Board", messages: messages });
}

function newMessagesGet(req, res) {
    res.render("form", { title: "New Message Form" })
}

async function newMessagesPost(req, res) {
    const messageText = req.body.messageText;
    const messageUser = req.body.messageUser;
    await db.insertMessage(messageUser, messageText)
    
    res.redirect("/");
}

async function messageDetailsGet(req, res) {
    const message = await db.getMessageById(req.params.id);
    res.render("message-details", { added: message.added, username: message.username, text: message.text });
}

module.exports = {
    getMessages,
    newMessagesGet,
    newMessagesPost,
    messageDetailsGet
}