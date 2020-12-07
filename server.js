const path = require("path");
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { v4: uuidV4 } = require("uuid");

const PORT = process.env.PORT || 3090;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (request, response) => {
  response.redirect(`/${uuidV4()}`);
});

app.get("/:room", (request, response) => {
  res.render("room", { roomId: req.params.room });
});

server.listen(PORT);
