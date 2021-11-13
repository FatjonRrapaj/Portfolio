import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import World from "../objects/world";

import { Welcome } from "../modules";

import "./styles.css";

const Scene = () => {
  const canvas = useRef();

  return (
    <div className="container">
      <Canvas antialias ref={canvas} className="webgl">
        <World />
      </Canvas>

      <Welcome />
    </div>
  );
};

export default Scene;
