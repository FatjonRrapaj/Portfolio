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
      value: -1500,
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
    wireframe: false,
    flatShading: false,
    autoRotate: true,
  });

  useFrame(({ clock }) => {
    if (autoRotate) {
      sky.current.rotation.y -= 0.001;
      //   sky.current.rotation.y = Math.cos(clock.elapsedTime) * 0.2;
    }
  });

  useEffect(() => {
    if (sky.current) {
      setTimeout(() => {
        sky.current.material.opacity = 0.2;
      }, 1000);
    }
  }, [sky.current]);

  return (
    <mesh
      onPointerDown={() => console.log("SKYY CLICKED")}
      layers={1}
      ref={sky}
      position={[x, y, z]}
    >
      <sphereBufferGeometry args={[radius, detail, detail]} />
      <meshStandardMaterial
        side={THREE.DoubleSide}
        color={color}
        flatShading={flatShading}
        wireframe={wireframe}
        emissive={emissiveColor}
        emissiveIntensity={emissiveIntensity}
      />
    </mesh>
  );
};

export default Sky;
