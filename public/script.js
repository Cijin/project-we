const socket = io("/");
const myPeer = new Peer();

const videoGrid = document.querySelector("#video-grid");
const myVideo = document.createElement("video");
myVideo.muted = true;

const peers = {};
let myVideoStream;

navigator.mediaDevices
  .getUserMedia({ video: true, audio: true })
  .then((stream) => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);

    myPeer.on("call", (call) => {
      call.answer(stream);
      // to display your video on the calle's screen
      const userVideo = document.createElement("video");

      call.on("stream", (userVideoStream) => {
        addVideoStream(userVideo, userVideoStream);
      });
    });

    socket.on("user-connected", (userId) => {
      connectToNewUser(userId, stream);
    });
  });

socket.on("user-disconnected", (userId) => {
  if (peers[userId]) {
    peers[userId].close();
  }
});

myPeer.on("open", (id) => {
  socket.emit("join-room", ROOM_ID, id);
});

function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videoGrid.appendChild(video);
}

function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream);
  // displays on your screen
  const userVideo = document.createElement("video");

  call.on("stream", (userVideoStream) => {
    addVideoStream(userVideo, userVideoStream);
  });

  call.on("close", () => {
    userVideo.remove();
  });

  peers[userId] = call;
}

function toggleVideoIcon(isVideoEnabled) {
  const videoIconDiv = document.querySelector(".video-toggle-icon");
  if (isVideoEnabled) {
    return (videoIconDiv.innerHTML = `<ion-icon name="videocam-off-outline"></ion-icon>`);
  }
  return (videoIconDiv.innerHTML = `<ion-icon name="videocam-outline"></ion-icon>`);
}

function toggleVideo() {
  const isVideoEnabled = myVideoStream.getVideoTracks()[0].enabled;
  if (isVideoEnabled) {
    myVideoStream.getVideoTracks()[0].enabled = false;
  } else {
    myVideoStream.getVideoTracks()[0].enabled = true;
  }

  toggleVideoIcon(isVideoEnabled);
}

function toggleAudioIcon(isAudioEnabled) {
  const audioIconDiv = document.querySelector(".audio-toggle-icon");
  if (isAudioEnabled) {
    return (audioIconDiv.innerHTML = `<ion-icon name="mic-off-outline"></ion-icon>`);
  }
  return (audioIconDiv.innerHTML = `<ion-icon name="mic-outline"></ion-icon>`);
}

function toggleAudio() {
  const isAudioEnabled = myVideoStream.getAudioTracks()[0].enabled;
  if (isAudioEnabled) {
    myVideoStream.getAudioTracks()[0].enabled = false;
  } else {
    myVideoStream.getAudioTracks()[0].enabled = true;
  }

  toggleAudioIcon(isAudioEnabled);
}
