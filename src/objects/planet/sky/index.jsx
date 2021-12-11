import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import anime from "animejs/lib/anime.es.js";

import { useControls } from "leva";
import useStore from "../../../store";

const Sky = () => {
  const innerSky = useRef();
  const outerSky = useRef();

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

  /** Anime JS timeline */
  const [timeline] = useState(() =>
    anime.timeline({
      autoplay: false,
      duration: 1000,
      easing: "easeOutSine",
    })
  );

  useEffect(() => {
    if (outerSky.current) {
      console.log("outerSky.current: ", outerSky.current);
      timeline.add({
        targets: outerSky.current.material,
        opacity: 0,
        duration: 1000,
      });

      useStore.subscribe(
        (state) => state.world,
        ({ progress }) => {
          if (progress > 42320) {
            const localProgress = progress - 42320;
            console.log("localProgress: ", localProgress);
            if (timeline.began && timeline.completed) {
              timeline.completed = false;
            }
            timeline.seek(localProgress);
          }
        }
      );
    }
  }, [outerSky.current]);

  console.log("SKY CURR", outerSky.current);

  useFrame(() => {
    if (innerSky.current) {
      innerSky.current.rotation.x += 0.0006;
    }
  });

  return (
    <>
      <mesh
        scale={[scaleFactor, scaleFactor, scaleFactor]}
        layers={1}
        ref={outerSky}
      >
        <sphereBufferGeometry args={[radius, 1000, 1000]} />
        <meshStandardMaterial
          ref={outerSky}
          side={THREE.DoubleSide}
          transparent={true}
          opacity={1}
          color={color}
          flatShading={flatShading}
          wireframe={wireframe}
          emissive={emissiveColor}
          emissiveIntensity={2.0}
        />
      </mesh>
      <mesh
        ref={innerSky}
        scale={[scaleFactor, scaleFactor, scaleFactor]}
        rotation={[0, 0, Math.PI / 2]}
        layers={1}
      >
        <sphereBufferGeometry args={[radius, 100, 50]} />
        <meshStandardMaterial
          side={THREE.DoubleSide}
          color={color}
          flatShading={flatShading}
          wireframe={wireframe}
          emissive={emissiveColor}
          emissiveIntensity={0.1}
        />
      </mesh>
    </>
  );
};

export default Sky;
