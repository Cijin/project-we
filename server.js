const express = require("express");
const app = express();
const { ExpressPeerServer } = require("peer");
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const PORT = process.env.PORT || 3001;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log("New Message: ", msg);
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on Port: ${PORT}`);
});
