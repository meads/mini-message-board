const path = require('node:path');
const express = require('express');
const messagesController = require("./controllers/messagesController")

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));

app.get("/", messagesController.getMessages);
app.get("/new", messagesController.newMessagesGet);
app.post("/new", messagesController.newMessagesPost);
app.get("/details/:id", messagesController.messageDetailsGet);


const PORT = process.env.PORT || 8080;
app.listen(PORT);
