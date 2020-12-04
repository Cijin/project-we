import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

function Video() {
  const userVideo = useRef();

  const [stream, setStream] = useState();
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = io("/");
    socket.on("new message", (date) => {
      setResponse(date);
    });

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((userMediaStream) => {
        setStream(userMediaStream);

        if (userVideo.current) {
          console.log(stream, userVideo);
          userVideo.current.srcObject = userMediaStream;
        }
      });
  }, []);

  let UserVideo;
  if (stream) {
    UserVideo = <video playsInline muted autoPlay ref={userVideo}></video>;
  }

  return (
    <>
      {UserVideo}
      <p>Response from Server: {response}</p>
    </>
  );
}

export default Video;
