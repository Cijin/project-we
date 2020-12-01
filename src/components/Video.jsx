import React, { useState, useEffect, useRef } from "react";

function Video() {
  const userVideo = useRef();
  const [stream, setStream] = useState();

  useEffect(() => {
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
