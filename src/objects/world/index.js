import React, { useRef, createRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";

import Sphere from "./sphere";

function SphericFloor() {
  const sphericFloor = useRef();
  const sphere = createRef();
  let cam = null;

  /**
   * Camera Controls
   */
  const { lookX, lookY, lookZ } = useControls("camera", {
    positionX: {
      value: 0,
      min: -1000,
      max: 1000,
      step: 0.01,
      onChange: (val) => {
        cam.position.x = val;
      },
    },
    positionY: {
      value: -100,
      min: -1000,
      max: 1000,
      step: 0.01,
      onChange: (val) => {
        cam.position.y = val;
      },
    },
    positionZ: {
      value: 1000,
      min: -1000,
      max: 1000,
      step: 0.01,
      onChange: (val) => {
        cam.position.z = val;
      },
    },

    rotationX: {
      value: 0,
      step: Math.PI / 4,
      min: -1000,
      max: 1000,
      onChange: (val) => {
        cam.rotateX(val);
      },
    },
    rotationY: {
      value: 0,
      step: Math.PI / 4,
      min: -1000,
      max: 1000,
      onChange: (val) => {
        cam.rotateY(val);
      },
    },
    rotationZ: {
      value: 0,
      step: Math.PI / 4,
      min: -1000,
      max: 1000,
      onChange: (val) => {
        cam.rotateZ(val);
      },
    },
  });

  useThree(({ camera }) => {
    cam = camera;
  });

  /**
   * SphericFloor controls
   */
  const { autoRotate } = useControls("sphericFloor", {
    autoRotate: false,
  });

  useFrame(() => {
    if (autoRotate) sphericFloor.current.rotation.x += 0.005;
  });

  return (
    <group ref={sphericFloor}>
      <Sphere ref={sphere} />
    </group>
  );
}

export default SphericFloor;
