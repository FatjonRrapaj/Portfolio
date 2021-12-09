import { useEffect, useReducer, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

import { useControls } from "leva";

const Sky = () => {
  const sky = useRef();

  const {
    color,
    wireframe,
    emissiveColor,
    flatShading,
    emissiveIntensity,
    x,
    y,
    z,
    radius,
    detail,
    autoRotate,
    scaleFactor,
  } = useControls("Sky", {
    x: {
      min: -1000,
      max: 1000,
      value: 0,
      step: 0.1,
    },
    y: {
      min: -1000,
      max: 1000,
      value: 0,
      step: 0.1,
    },
    z: {
      min: -2000,
      max: 2000,
      value: -550,
      step: 0.1,
    },
    radius: {
      min: 400,
      max: 1000,
      step: 1,
      value: 500,
    },
    detail: {
      min: 1,
      max: 1000,
      value: 400,
      step: 1,
    },
    emissiveIntensity: {
      min: 0.1,
      max: 100,
      value: 5.0,
      step: 0.1,
    },
    color: "#ffffff",
    emissiveColor: "#ffffff",
    wireframe: true,
    flatShading: false,
    autoRotate: true,
    scaleFactor: {
      min: 0.1,
      max: 2,
      value: 0.8,
      step: 0.01,
    },
  });

  useFrame(({ clock }) => {
    if (autoRotate) {
      sky.current.rotation.y -= 0.001;
      //   sky.current.rotation.y = Math.cos(clock.elapsedTime) * 0.2;
    }
  });

  return (
    <mesh
      scale={[scaleFactor, scaleFactor, scaleFactor]}
      layers={1}
      ref={sky}
      position={[0, 0, -550]}
    >
      <sphereBufferGeometry args={[radius, 1000, 1000]} />
      <meshStandardMaterial
        side={THREE.DoubleSide}
        color={color}
        flatShading={flatShading}
        wireframe={wireframe}
        emissive={emissiveColor}
        emissiveIntensity={2.0}
      />
    </mesh>
  );
};

export default Sky;
