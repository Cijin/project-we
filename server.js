const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const { v4: uuidV4 } = require("uuid");
const path = require("path");

const PORT = process.env.PORT || 3000;
let interval;

const getApiAndEmit = (socket) => {
  const response = new Date();
  socket.emit("new message", response);
};

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect(`/${uuidV4()}`);
});

app.get("/:roomId", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

io.on("connection", (socket) => {
  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(() => getApiAndEmit(socket), 1000);

  socket.on("disconnect", () => {
    console.log("a user disconnected");
    clearInterval(interval);
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on Port: ${PORT}`);
});
