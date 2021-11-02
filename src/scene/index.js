import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";

import Floor from "../objects/floor";
import Plane from "../objects/plane";

import "./style.css";
import { Vector3 } from "three";

const Scene = () => {
  const canvas = useRef();
  const camera = useRef();

  /**
   * Camera Controls
   */
  const { positionX, positionY, positionZ, fov, near, far } = useControls(
    "camera",
    {
      positionX: {
        value: 0,
        min: -100,
        max: 100,
        step: 0.1,
      },
      positionY: {
        value: 0,
        min: -100,
        max: 100,
        step: 0.1,
      },
      positionZ: {
        value: 0,
        min: -100,
        max: 100,
        step: 0.1,
      },

      rotationX: {
        value: 0,
        step: Math.PI / 4,
        min: -1000,
        max: 1000,
        onChange: (val) => camera.current && camera.current.rotateY(val),
      },
      rotationY: {
        value: 0,
        step: Math.PI / 4,
        min: -1000,
        max: 1000,
        onChange: (val) => camera.current && camera.current.rotateX(val),
      },
      rotationZ: {
        value: 0,
        step: Math.PI / 4,
        min: -1000,
        max: 1000,
        onChange: (val) => camera.current && camera.current.rotateZ(val),
      },
      fov: {
        min: 45,
        max: 75,
        value: 75,
        step: 5,
      },
      near: {
        min: 0.1,
        value: 0.1,
        max: 10,
        step: 0.1,
      },
      far: {
        min: 50,
        max: 200,
        step: 10,
        value: 100,
      },
    }
  );

  return (
    <div id="container">
      <Canvas ref={canvas} className="webgl">
        <perspectiveCamera
          ref={camera}
          args={[fov, window.innerWidth / window.innerHeight, near, far]}
          position={new Vector3(positionX, positionY, positionZ)}
        >
          <Suspense fallback={<div color="white">LOADINGË</div>}>
            <Plane />
          </Suspense>

          <Floor />
        </perspectiveCamera>
      </Canvas>
    </div>
  );
};

export default Scene;
