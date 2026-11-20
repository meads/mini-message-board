import path from 'node:path';
import express from 'express';

const app = express();

app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(import.meta.dirname, 'public');
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));

var currentId = 2;
const messages = [
  {
    id: 1,
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    id: 2,
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

app.get("/", (req, res) => {
    res.render("index", { title: "Mini Message Board", messages: messages });
});

app.get("/new", (req, res) => {
    res.render("form", { title: "New Message Form" })
});

app.post("/new", (req, res) => {
    const messageText = req.body.messageText;
    const messageUser = req.body.messageUser;
    currentId += 1;
    messages.push({ id: currentId, text: messageText, user: messageUser, added: new Date() });
    res.redirect("/");
});

app.get("/details/:id", (req, res) => {
    let message = null;
    messages.forEach((m) => {
        if (m.id == req.params.id) {
            message = m;
        }
    });
    if (message == null) {
        throw Error("message not found!");
    }
    res.render("message-details", { added: message.added, user: message.user, text: message.text });
});


const PORT = process.env.PORT || 8080;
app.listen(PORT);
