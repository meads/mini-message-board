const db = require("../db/queries")
const { body, param, validationResult } = require("express-validator");

exports.getMessages = async (req, res) => {
    const messages = await db.getAllMessages();
    res.render("index", { title: "Mini Message Board", messages: messages });
};

exports.newMessagesGet = (req, res) => {
    res.render("form", { title: "New Message Form" });
};

const newMesssagesPostValidator = [
    body("messageUser").trim().isLength({ min: 1, max: 20 })
        .withMessage("Message user must be between 1 and 20 characters.")
        .escape(),
    body("messageText").trim().isLength({ min: 1, max: 255 })
        .withMessage("Message text must be between 1 and 255 characters.")
        .escape(),
];

exports.newMessagesPost = [
    newMesssagesPostValidator,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array())
            return res.status(400).render("form", {
                title: "New Message Form",
                errors: errors.array(),
                messageUser: req.body.messageUser,
                messageText: req.body.messageText,
            });
        }
        const messageText = req.body.messageText;
        const messageUser = req.body.messageUser;
        await db.insertMessage(messageUser, messageText);

        res.redirect("/");
}];

const idParamValidator = [
    param('id').isInt({ min: 1, max: Number.MAX_SAFE_INTEGER })
];

exports.messageDetailsGet = [
    idParamValidator,
    async function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const message = await db.getMessageById(req.params.id);
        if (message) {
            return res.render("message-details", { 
                added: message.added, 
                username: message.username, 
                text: message.text 
            });
        }
        res.redirect("/");
    }
]
