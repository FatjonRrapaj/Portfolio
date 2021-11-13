import React, { useRef, createRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";

import Sphere from "./sphere";

function Floor() {
  const sphericFloor = useRef();
  const sphere = createRef();
  const sphere2 = createRef();
  const sphereMaterialShader = createRef();
  const sphere2MaterialShader = createRef();
  let cam = null;

  /**
   * Camera Controls
   */
  const { lookX, lookY, lookZ } = useControls("camera", {
    positionX: {
      value: -150.0,
      min: -1000,
      max: 1000,
      step: 0.01,
      onChange: (val) => {
        cam.position.x = val;
      },
    },
    positionY: {
      value: 81.8,
      min: -1000,
      max: 1000,
      step: 0.01,
      onChange: (val) => {
        cam.position.y = val;
      },
    },
    positionZ: {
      value: 250,
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
  } = useControls("floorSphere", {
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
    positionX: {
      value: 0,
      min: -100,
      max: 100,
      step: 0.01,
    },
    positionY: {
      value: 0,
      min: -100,
      max: 100,
      step: 0.01,
    },
    positionZ: {
      value: 10,
      min: -100,
      max: 100,
      step: 0.01,
    },
    rotationX: {
      value: 0,
      step: Math.PI / 4,
      min: -1000,
      max: 1000,
      onChange: (val) => sphere.current && sphere.current.rotateX(val),
    },
    rotationY: {
      value: 0,
      step: Math.PI / 4,
      min: -1000,
      max: 1000,
      onChange: (val) => sphere.current && sphere.current.rotateY(val),
    },
    rotationZ: {
      value: 0,
      step: Math.PI / 4,
      min: -1000,
      max: 1000,
      onChange: (val) => sphere.current && sphere.current.rotateZ(val),
    },
  });

  return (
    <group ref={sphericFloor}>
      <Sphere
        radius={radius}
        detail={detail}
        polygonOffsetFactor={polygonOffsetFactor}
        polygonOffsetUnits={polygonOffsetUnits}
        opacity={opacity}
        positionX={positionX}
        positionY={positionY}
        positionZ={positionZ}
        wireframeLinewidth={wireframeLinewidth}
        wireframeLinecap={wireframeLinecap}
        wireframeLinejoin={wireframeLinejoin}
        roughness={roughness}
        ref={sphere}
      />
      <Sphere
        radius={radius}
        detail={detail}
        polygonOffsetFactor={polygonOffsetFactor}
        polygonOffsetUnits={polygonOffsetUnits}
        opacity={opacity}
        positionX={positionX}
        positionY={positionY}
        positionZ={positionZ}
        wireframeLinewidth={wireframeLinewidth}
        wireframeLinecap={wireframeLinecap}
        wireframeLinejoin={wireframeLinejoin}
        roughness={roughness}
        name="Sphere2"
        wireframe
        offset={0.2}
        ref={sphere2}
      />
    </group>
  );
}

export default Floor;
