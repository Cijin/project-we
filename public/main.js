const Peer = window.Peer;

const videoEl = document.querySelector(".remote-video");
const peerIdEl = document.querySelector("#connect-to-peer");
const messagesEl = document.querySelector(".messages");

const logMessage = (message) => {
  const newMessage = document.createElement("div");
  newMessage.innerText = message;
  messagesEl.appendChild(newMessage);
};

const renderVideo = (stream) => {
  videoEl.srcObject = stream;
};

// Register peer
const peer = new Peer({
  host: "/",
  path: "/peerjs/myapp",
});

peer.on("open", (id) => {
  logMessage("My Peer ID: " + id);
});

peer.on("error", (error) => {
  console.error(error);
});

// Handle incoming connection
peer.on("connection", (conn) => {
  logMessage("Incoming connection :)");

  conn.on("data", (data) => {
    logMessage(`Recieved: ${data}`);
  });

  conn.on("open", () => {
    conn.send("hello");
  });
});

// Handling incoming audio/video
peer.on("call", (call) => {
  try {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        call.answer(stream);
        call.on("stream", renderVideo);
      });
  } catch (err) {
    console.error("Unable to get user media: ", err);
  }
});

// Initiate outgoing connection
const connectToPeer = () => {
  const peerId = peerIdEl.value;
  logMessage(`Connecting to ${peerId} ...`);

  const conn = peer.connect(peerId);
  conn.on("data", (data) => {
    logMessage("Recieved: ", data);
  });

  conn.open("open", () => {
    conn.send("hi");
  });

  try {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        const call = peer.call(peerId, stream);
        call.on("stream", renderVideo);
      });
  } catch (err) {
    logMessage("Failed to get local stream ", err);
  }
};

window.connectToPeer = connectToPeer;
