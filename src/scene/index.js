import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import World from "../objects/world";

import "./style.css";

import { Welcome } from "../modules";
import DirectionalLight from "../objects/directionalLight";

const Scene = () => {
  const canvas = useRef();

  return (
    <div id="container">
      <Canvas ref={canvas} className="webgl">
        <World />

        <Welcome />
        <DirectionalLight />
      </Canvas>
    </div>
  );
};

export default Scene;
