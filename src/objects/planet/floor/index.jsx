import React, { useRef, createRef, useEffect, forwardRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";

import Sphere from "./sphere";

function Floor() {
  const sphericFloor = useRef();

  let cam = null;

  /**
   * Camera Controls
   */
  useControls("camera", {
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
      value: 0,
      min: -1000,
      max: 1000,
      step: 0.01,
      onChange: (val) => {
        cam.position.y = val;
      },
    },
    positionZ: {
      value: 700,
      min: -2000,
      max: 2000,
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
  const { autoRotate, scaleFactor } = useControls("sphericFloor", {
    autoRotate: false,
    scaleFactor: {
      min: 0.1,
      max: 100,
      value: 3.5,
      step: 0.01,
    },
  });

  const {
    radius,
    detail,
    polygonOffsetFactor,
    polygonOffsetUnits,
    opacity,
    positionX,
    positionY,
    positionZ,
    wireframeLinewidth,
    wireframeLinecap,
    wireframeLinejoin,
    roughness,
    sphere1Color,
    sphere2Color,
    offset,
    rotationSpeed,
    sphere1WireFrame,
    sphere2WireFrame,
  } = useControls("floorSphere", {
    sphere1Color: "#00cfff",
    sphere2Color: "#26ffa6",
    offset: 0.2,
    radius: {
      value: 199,
      min: 1,
      max: 500,
      step: 10,
    },
    detail: {
      value: 160,
      min: 1,
      max: 500,
      step: 0.5,
    },
    opacity: {
      value: 1,
      max: 1,
      min: 0,
      step: 0.01,
    },
    polygonOffsetFactor: {
      min: -100,
      max: 100,
      step: 1,
      value: 1,
    },
    polygonOffsetUnits: {
      min: -100,
      max: 100,
      step: 1,
      value: 1,
    },
    wireframeLinewidth: {
      min: -100,
      max: 100,
      step: 1,
      value: 1,
    },
    wireframeLinecap: {
      options: {
        butt: "butt",
        round: "round",
        square: "square",
      },
      value: "round",
    },
    wireframeLinejoin: {
      options: {
        bevel: "bevel",
        round: "round",
        miter: "miter",
      },
      value: "round",
    },
    roughness: {
      value: 0.8,
      min: 0,
      max: 1,
      step: 0.01,
    },
    rotationSpeed: {
      value: 0.05,
      min: 0.001,
      max: 1,
      step: 0.001,
    },
    positionX: {
      value: 0,
      min: -1000,
      max: 1000,
      step: 0.01,
    },
    positionY: {
      value: 0,
      min: -100,
      max: 100,
      step: 0.01,
    },
    positionZ: {
      value: -550,
      min: -1500,
      max: 2000,
      step: 0.01,
    },
    rotationX: {
      value: 0,
      step: Math.PI / 4,
      min: -1000,
      max: 1000,
    },
    rotationY: {
      value: 0,
      step: Math.PI / 4,
      min: -1000,
      max: 1000,
    },
    rotationZ: {
      value: 0,
      step: Math.PI / 4,
      min: -1000,
      max: 1000,
    },
    sphere1WireFrame: false,
    sphere2WireFrame: true,
  });

  useFrame(() => {
    if (sphericFloor.current) {
      sphericFloor.current.rotation.x += 0.0003;
    }
  });

  return (
    <group scale={[1.5, 1.5, 1.5]} layers={1} ref={sphericFloor}>
      <Sphere
        radius={radius}
        detail={detail}
        polygonOffsetFactor={polygonOffsetFactor}
        polygonOffsetUnits={polygonOffsetUnits}
        opacity={opacity}
        wireframeLinewidth={wireframeLinewidth}
        wireframeLinecap={wireframeLinecap}
        wireframeLinejoin={wireframeLinejoin}
        roughness={roughness}
        color={sphere1Color}
        wireframe={sphere1WireFrame}
      />
      <Sphere
        radius={radius}
        detail={detail}
        polygonOffsetFactor={polygonOffsetFactor}
        polygonOffsetUnits={polygonOffsetUnits}
        opacity={opacity}
        wireframeLinewidth={wireframeLinewidth}
        wireframeLinecap={wireframeLinecap}
        wireframeLinejoin={wireframeLinejoin}
        roughness={roughness}
        name="Sphere2"
        wireframe={sphere2WireFrame}
        offset={offset}
        color={sphere2Color}
      />
    </group>
  );
}

export default Floor;
