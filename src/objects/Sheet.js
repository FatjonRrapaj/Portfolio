/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useEffect, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import anime from "animejs/lib/anime.es";

import useStore from "../store";
import { seekGltfAnimation } from "../helpers/animation";

export default function Model({ ...props }) {
  const group = useRef();
  const material1Ref = useRef();
  const material2Ref = useRef();
  const material3Ref = useRef();
  const { nodes, animations } = useGLTF(process.env.PUBLIC_URL + "/sheet.glb");
  const { actions } = useAnimations(animations, group);
  const front = useLoader(TextureLoader, process.env.PUBLIC_URL + "/front.jpg");
  front.flipY = false;
  const back = useLoader(TextureLoader, process.env.PUBLIC_URL + "/back.jpg");
  back.flipY = false;

  let sheetProgressChecker = useRef(0);

  useEffect(() => {
    if (!group.current) return;
    const initialRotation = anime({
      targets: group.current.rotation,
      x: 0,
      y: 0,
      z: 0,
      duration: 400,
      autoplay: false,
    });

    const unsubscribeInitialAnimation = useStore.subscribe(
      (state) => state.initialAnimation,
      ({ progress, lastChanged }) => {
        if (lastChanged === "progress") {
          initialRotation.seek(progress);
        }
      }
    );

    //switch between shet & plane visibilities
    const unsubscribeFromPlaneListener = useStore.subscribe(
      (state) => state.plane,
      ({ lastChanged }) => {
        if (lastChanged === "planeFoldingProgress") {
          if (group.current.visible) group.current.visible = false;
        }
      }
    );

    const moveToCenterAnimation = anime({
      //it's a very very very absolutley bad idea to change the position, only if you match it with the plane position, as they swap visibilies. incopetent blender trick just to save some time, please don't be judge too much :/
      targets: group.current.position,
      x: 14.5,
      y: -1,
      z: 682,
      duration: 500,
      autoplay: false,
    });

    const rotateToSheet = anime({
      targets: group.current.rotation,
      x: 0,
      y: Math.PI / 6,
      z: 0,
      duration: 500,
      autoplay: false,
    });

    const rotateBack = anime({
      targets: group.current.rotation,
      x: 0,
      y: 0,
      z: 0,
      duration: 500,
      autoplay: false,
    });

    const fixSheetPositonbeforeConvertingToSheet = anime({
      targets: group.current.position,
      x: 13.5,
      y: 0,
      z: 682,
      duration: 200,
      autoplay: false,
    });

    const unsubscribeSheetStore = useStore.subscribe(
      (state) => {
        return state.sheet;
      },
      ({
        moveToCenterProgress,
        sheetProgress,
        rotateToSheetProgress,
        backRotateProgress,
        lastChanged,
      }) => {
        switch (lastChanged) {
          case "moveToCenterProgress":
            moveToCenterAnimation.seek(moveToCenterProgress);
            break;

          case "rotateToSheetProgress":
            rotateToSheet.seek(rotateToSheetProgress);
            break;

          //this is a gltf animation seeking case:
          case "sheetProgress":
            if (!group.current.visible) group.current.visible = true;
            const { toSheet } = actions;
            seekGltfAnimation(
              toSheet,
              sheetProgress,
              sheetProgressChecker,
              2000
            );
            break;
          case "backRotateProgress":
            rotateBack.seek(backRotateProgress);
            break;

          default:
            break;
        }
      }
    );

    return () => {
      unsubscribeInitialAnimation();
      unsubscribeSheetStore();
      unsubscribeFromPlaneListener();
    };
  }, [group.current]);

  return (
    <group
      //it's a very very very absolutley bad idea to change the position, only if you match it with the plane position, as they swap visibilies. incopetent blender trick just to save some time, please don't be judge too much :/
      //todo: check if you can throw an error if the sheet & plane positions don't match
      position={[12, -0.6, 682]}
      // scale={[0.4, 0.4, 0.4]}
      rotation={[0, Math.PI / 8, 0]}
      ref={group}
      {...props}
      dispose={null}
    >
      <mesh
        name="material"
        geometry={nodes.material.geometry}
        morphTargetDictionary={nodes.material.morphTargetDictionary}
        morphTargetInfluences={nodes.material.morphTargetInfluences}
      >
        <meshStandardMaterial
          {...nodes.material.material}
          map={back}
          ref={material1Ref}
          roughness={1}
          metalness={0.4}
          transparent={true}
          depthTest={true}
          alphaTest={0.5}
        />
      </mesh>
      <mesh
        name="material_1"
        geometry={nodes.material_1.geometry}
        morphTargetDictionary={nodes.material_1.morphTargetDictionary}
        morphTargetInfluences={nodes.material_1.morphTargetInfluences}
      >
        <meshStandardMaterial
          {...nodes.material_1.material}
          map={front}
          ref={material2Ref}
          roughness={1}
          metalness={0.4}
          transparent={true}
          depthTest={true}
          alphaTest={0.5}
        />
      </mesh>
      <mesh
        name="material_2"
        geometry={nodes.material_2.geometry}
        morphTargetDictionary={nodes.material_2.morphTargetDictionary}
        morphTargetInfluences={nodes.material_2.morphTargetInfluences}
      >
        <meshStandardMaterial
          {...nodes.material_2.material}
          ref={material3Ref}
          color="#fff"
          emissive="#fff"
        />
      </mesh>
    </group>
  );
}

useGLTF.preload(process.env.PUBLIC_URL + "/sheet.glb");
