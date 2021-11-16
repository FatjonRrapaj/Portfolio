import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import World from "../objects/world";

import { Welcome } from "../modules";

import "./styles.css";

const Scene = () => {
  const canvas = useRef();

  return (
    <div className="container">
      <Canvas
        shadows
        camera={{
          far: 1500,
          near: 0.01,
          fov: 45,
          aspect: window.innerWidth / window.innerHeight,
        }}
        antialias
        ref={canvas}
        className="webgl"
      >
        <World />
      </Canvas>
      <Welcome />
      <div className="scrollContainer" />
    </div>
  );
};

export default Scene;
