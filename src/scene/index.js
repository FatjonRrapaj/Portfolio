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
            far: 200,
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

      {/* <Welcome /> */}
      <div id="fold" className="container"></div>
    </div>
  );
};

export default Scene;
