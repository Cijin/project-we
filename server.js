const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const { v4: uuidV4 } = require("uuid");
const path = require("path");

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect(`/${uuidV4()}`);
});

app.get("/:roomId", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);
  });

  socket.on("disconnect", () => {
    socket.to(roomId).broadcast.emit("user-disconnected", userId);
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on Port: ${PORT}`);
});
