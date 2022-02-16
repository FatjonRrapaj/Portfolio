import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import World from "../objects/world";

import "./styles.css";

const Scene = () => {
  const canvas = useRef();

  return (
    <div id="wrapper">
      <div id="webgl" className="container">
        <Canvas
          shadows
          camera={{
            far: 50, //important to have a clean view from the curve path (plane trajectory)
            near: 1,
            fov: 45,
            aspect: window.innerWidth / window.innerHeight,
          }}
          antialias
          ref={canvas}
        >
          <World />
        </Canvas>
      </div>
      <div id="fold" className="container">
        {/* <div
          style={{
            position: "absolute",
            height: "100vh",
            backgroundColor: "red",
          }}
        >
          <h1>Cool stuff going on here</h1>
          <h1>Cool stuff going on here</h1>
          <h1>Cool stuff going on here</h1>
          <h1>Cool stuff going on here</h1>
          <h1>Cool stuff going on here</h1>
          <h1>Cool stuff going on here</h1>
          <h1>Cool stuff going on here</h1>
          <h1>Cool stuff going on here</h1>
        </div> */}
      </div>
    </div>
  );
};

export default Scene;
