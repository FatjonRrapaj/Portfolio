/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import anime from "animejs/lib/anime.es.js";

import useStore from "../../store";

export default function PaperPlane({ ...props }) {
  const { camera } = useThree();

  /** GLTF PaperPlane controls leva */
  const {
    scaleFactor,
    color,
    positionX,
    positionY,
    positionZ,
    wireframe,
    rotationX,
    rotationY,
    rotationZ,
    emissiveIntensity,
  } = useControls("plane", {
    scaleFactor: {
      value: 10,
      min: 0.1,
      max: 100,
      step: 0.5,
    },
    emissiveIntensity: {
      min: 0,
      max: 100,
      value: 0,
      step: 0.01,
    },
    color: "#fff",
    positionX: {
      value: 0,
      min: -1000,
      max: 1000,
      step: 0.01,
    },
    positionY: {
      value: 0,
      min: -1000,
      max: 1000,
      step: 0.1,
    },
    positionZ: {
      value: 697,
      min: -1000,
      max: 1000,
      step: 0.1,
    },
    rotationX: {
      value: Math.PI / 2,
      step: 0.1,
      min: -1000,
      max: 1000,
    },
    rotationY: {
      value: 0,
      step: 0.1,
      min: -1000,
      max: 1000,
    },
    rotationZ: {
      value: -Math.PI * 2,
      step: 0.001,
      min: -1000,
      max: 1000,
    },
    wireframe: false,
  });

  /** GLTF variables */
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    process.env.PUBLIC_URL + "/ekzotik.glb"
  );
  const { actions } = useAnimations(animations, group);

  // /** GLTF PaperPlane textures */
  const front = useLoader(THREE.TextureLoader, "front.jpg");
  front.flipY = false;
  const back = useLoader(THREE.TextureLoader, "back.jpg");
  const frontAMap = useLoader(THREE.TextureLoader, "aMap.jpg");
  frontAMap.flipY = false;
  const backAMap = useLoader(THREE.TextureLoader, "aMap.jpg");

  /** Store subscription handling */
  const positionRef = useRef([0, 0, 697]);

  useEffect(() => {
    //Scroll & resize event listeners
    // divContainer.addEventListener("wheel", onWheel, false);
    // window.addEventListener("resize", onResize, { passive: true });

    //GLTF animation
    const { fold } = actions;
    fold.reset();
    fold.setLoop(THREE.LoopOnce, 1);
    fold.setDuration(18000);
    fold._mixer.time = 18000;
    fold.clampWhenFinished = true;
    fold.play();

    //Zustand store subscriptions
    const unsubscribePaperPlaneChanges = useStore.subscribe(
      (state) => state.paperPlane,
      ({
        animationTime,
        initialTrajectoryPointAnimationTime,
        position,
        rotationAngle,
        lastChanged,
      }) => {
        switch (lastChanged) {
          case "animationTime":
            if (animationTime <= 18000) {
              fold._mixer.setTime(animationTime);
            }
            break;
          case "initialTrajectoryPointAnimationTime":
            if (timeline.began && timeline.completed) {
              timeline.completed = false;
            }
            timeline.seek(initialTrajectoryPointAnimationTime);
            break;
          case "position":
            group.current && group.current.position.set(...position);
            break;
          case "rotationAngle":
            group.current.quaternion.setFromAxisAngle(
              rotationAngle.axis,
              rotationAngle.angle
            );
            break;
          default:
            break;
        }
      }
    );

    //Remove event listeners and subscriptions
    return () => {
      // divContainer.removeEventListener("wheel", onWheel);
      // window.removeEventListener("resize", onResize);
      unsubscribePaperPlaneChanges();
    };
  }, []);

  /** Anime JS timeline */
  const [timeline] = useState(() =>
    anime.timeline({
      autoplay: false,
      duration: 2000,
      easing: "easeOutSine",
    })
  );

  useEffect(() => {
    if (group.current) {
      timeline.add({
        targets: group.current.quaternion,
        x: -0.0047017907484663505,
        y: 0.009403581496932701,
        z: 0,
        w: 0.9999447313820841,
        duration: 666.666,
      });
      timeline.add({
        targets: group.current.position,
        x: -0.004043493877883724,
        y: -0.002021746938941862,
        z: 694.5603454848316,
        duration: 666.666,
      });
      timeline.add({
        targets: camera.position,
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z + 10,
        duration: 666.666,
      });
    }
  }, [group.current]);

  return (
    <group
      scale={[scaleFactor, scaleFactor, scaleFactor]}
      rotation={[rotationX, rotationY, rotationZ]}
      position={positionRef.current}
      ref={group}
      {...props}
      dispose={null}
    >
      <mesh
        layers={2}
        name="Plane_1"
        geometry={nodes.Plane_1.geometry}
        // material={materials.back}
        castShadow={true}
        receiveShadow={true}
        morphTargetDictionary={nodes.Plane_1.morphTargetDictionary}
        morphTargetInfluences={nodes.Plane_1.morphTargetInfluences}
      >
        <meshStandardMaterial
          {...materials.back}
          alphaMap={backAMap}
          roughness={1}
          metalness={0.4}
          map={back}
          transparent={true}
          depthTest={true}
          alphaTest={0.5}
          side={THREE.FrontSide}
        />
      </mesh>
      <mesh
        layers={2}
        name="Plane_2"
        geometry={nodes.Plane_2.geometry}
        material={materials.side}
        morphTargetDictionary={nodes.Plane_2.morphTargetDictionary}
        morphTargetInfluences={nodes.Plane_2.morphTargetInfluences}
      >
        <meshStandardMaterial color={"#fff"} />
      </mesh>
      <mesh
        layers={2}
        name="Plane_3"
        geometry={nodes.Plane_3.geometry}
        morphTargetDictionary={nodes.Plane_3.morphTargetDictionary}
        morphTargetInfluences={nodes.Plane_3.morphTargetInfluences}
      >
        <meshStandardMaterial
          {...materials.front}
          side={THREE.FrontSide}
          roughness={1}
          metalness={0.4}
          map={front}
          transparent={true}
          alphaMap={frontAMap}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload(process.env.PUBLIC_URL + "/ekzotik.glb");
