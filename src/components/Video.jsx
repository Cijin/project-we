import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:3001";

function Video() {
  const userVideo = useRef();
  const socket = useRef();

  const [stream, setStream] = useState();

  useEffect(() => {
    socket.current = io.connect(ENDPOINT);
    socket.current.emit("chat message", "Heya");

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((userMediaStream) => {
        setStream(userMediaStream);
      });
  }, []);

  if (stream && userVideo.current) {
    userVideo.current.srcObject = stream;
    userVideo.current.addEventListener("loadedmetadata", () => {
      userVideo.current.play();
    });
  }

  return (
    <>
      <video playsInline muted autoPlay ref={userVideo}></video>
    </>
  );
}

export default Video;
