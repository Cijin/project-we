import React, { useState, useEffect, useRef } from "react";

export const Video = () => {
  const [stream, setStream] = useState();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((userMediaStream) => {
        setStream(userMediaStream);
      });

    if (userVideo.current) {
      userVideo.current.srcObject = stream;
    }
  }, []);

  const userVideo = useRef();
  return (
    <>
      <video playsInline muted autoPlay ref={userVideo}></video>
    </>
  );
};
