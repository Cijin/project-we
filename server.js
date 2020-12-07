const path = require("path");
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { v4: uuidV4 } = require("uuid");
const { ExpressPeerServer } = require("peer");

const PORT = process.env.PORT || 3090;
const peerServer = ExpressPeerServer(server, {
  debug: true,
});

app.use("/peerjs", peerServer);
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (request, response) => {
  response.redirect(`/${uuidV4()}`);
});

app.get("/:room", (request, response) => {
  response.render("room", { roomId: request.params.room });
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);

    socket.on("disconnect", () => {
      socket.to(roomId).broadcast.emit("user-disconnected", userId);
    });
  });
});

server.listen(PORT, () => {
  console.log("server listening on: ", PORT);
});
