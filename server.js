const express = require("express");
const { ExpressPeerServer } = require("peer");
const path = require("path");

const app = express();
const PORT = process.env.PORT;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

const listener = app.listen(PORT, () => {
  console.log("Your app is listening on Port: ", PORT);
});

const peerServer = ExpressPeerServer(listener, {
  debug: true,
  path: "/myapp",
});

app.use("/peerjs", peerServer);
