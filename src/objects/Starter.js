/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import useStore from "../store";
import { useState } from "react/cjs/react.development";
import anime from "animejs/lib/anime.es";

export default function Model({ ...props }) {
  const mainContainer = useRef();
  const { nodes, materials, animations } = useGLTF(
    process.env.PUBLIC_URL + "/all.glb"
  );
  const { actions } = useAnimations(animations, mainContainer);
  console.log("actions: ", actions);
  console.log("materials: ", materials);

  //refs

  const timeouts = useRef([]);

  const delay = (seconds) =>
    new Promise((resolve) => {
      const t = setTimeout(resolve, seconds * 1000);
      timeouts.current.push(t);
      return t;
    });

  const actionsPointer = useRef({
    transform: null,
    move: null,
    moveInfinite: false, //if the moving animation is repeating or not.
    fromLastPosition: false, //animation should start from where the object is, not from moving.
    transformTweak: 0, //from manually testing the animations... sorry for the inconvience.
    moveTweak: 0, //from manually testing the animations... sorry for the inconvience.
    reverseDelay: 0, //from manually testing the animations... sorry for the inconvience.
  });

  const assignActions = (number) => {
    const {
      androidMove,
      appleMove,
      camelMove,
      clockMove,
      toAndroid,
      toApple,
      toCamel,
      toCannon,
      toClock,
      toFlower,
      toPineapple,
    } = actions;

    switch (number) {
      case 0:
        //asign clock animations
        actionsPointer.current.transform = toClock;
        actionsPointer.current.move = clockMove;
        actionsPointer.current.moveInfinite = true;
        actionsPointer.current.transformTweak = 0.1;
        actionsPointer.current.moveTweak = 0.05;
        actionsPointer.current.reverseDelay = 7.75;
        actionsPointer.current.fromLastPosition = false;
        break;
      case 1:
        //assign camel animations
        actionsPointer.current.transform = toCamel;
        actionsPointer.current.move = camelMove;
        actionsPointer.current.moveInfinite = true;
        actionsPointer.current.transformTweak = 0.1;
        actionsPointer.current.moveTweak = 0.055;
        actionsPointer.current.reverseDelay = 7.75;
        actionsPointer.current.fromLastPosition = false;
        break;
      case 2:
        //assign android animations
        actionsPointer.current.transform = toAndroid;
        actionsPointer.current.move = androidMove;
        actionsPointer.current.moveInfinite = false;
        actionsPointer.current.transformTweak = 0;
        actionsPointer.current.moveTweak = 0.05;
        actionsPointer.current.reverseDelay = 7.75;
        actionsPointer.current.fromLastPosition = false;
        break;
      case 3:
        //assign apple animations
        actionsPointer.current.transform = toApple;
        actionsPointer.current.move = appleMove;
        actionsPointer.current.moveInfinite = true;
        actionsPointer.current.transformTweak = 0.1; //try also 0
        actionsPointer.current.moveTweak = 0.1; //try also 0.05
        actionsPointer.current.reverseDelay = 7.75;
        actionsPointer.current.fromLastPosition = false;
        break;
      case 4:
        //assign flower animations
        actionsPointer.current.transform = toFlower;
        actionsPointer.current.move = null;
        actionsPointer.current.transformTweak = 0.05;
        actionsPointer.current.fromLastPosition = false;
        break;
      case 5:
        //assign pineapple animations
        actionsPointer.current.transform = toPineapple;
        actionsPointer.current.move = null;
        actionsPointer.current.transformTweak = 0.05;
        actionsPointer.current.fromLastPosition = true;
        break;
      case 6:
        //assign cannon animations
        actionsPointer.current.transform = toCannon;
        actionsPointer.current.move = null;
        actionsPointer.current.transformTweak = 0.05;
        actionsPointer.current.fromLastPosition = true;
      default:
        break;
    }
  };

  const startAnimations = async () => {
    const { come } = actions;
    const {
      transform,
      transformTweak,
      move,
      moveInfinite,
      moveTweak,
      fromLastPosition,
    } = actionsPointer.current;

    if (!fromLastPosition) {
      //come
      come.repetitions = 1;
      come.play();
      await delay(come._clip.duration); //wait for animation to finish
    }

    //transform animation
    transform.repetitions = 1;
    transform.play();
    await delay(transform._clip.duration - transformTweak);

    //move animation
    if (move) {
      if (moveInfinite) move.time = moveTweak;
      if (!moveInfinite) move.repetitions = 1;
      move.play();
    }
  };

  const endAnimations = async () => {
    const { go } = actions;
    const { transform, move, reverseDelay, moveTweak } = actionsPointer.current;

    if (!move) {
      return;
    }
    //fake waiting
    await delay(8);

    //reverse move;
    move.reset();
    move.time = moveTweak;
    move.timeScale = -1;
    move.repetitions = 1;
    move.startAt(reverseDelay);
    move.play();
    await delay(move._clip.duration);

    //reverse transform
    transform.reset();
    transform.repetitions = 1;
    transform.timeScale = -1;
    transform.startAt(reverseDelay);
    transform.play(); //+2 needed when going backwards
    await delay(2.75);

    go.repetitions = 1;
    go.clampWhenFinished = true;
    go.play();
  };

  let initialRotation = null;

  useEffect(() => {
    if (!mainContainer.current) return;

    initialRotation = anime({
      targets: mainContainer.current?.rotation,
      x: 0,
      y: 0,
      z: 0,
      duration: 400,
    });
  }, [mainContainer.current]);

  useEffect(() => {
    // assignActions(6);
    // startAnimations();
    // endAnimations();

    const unsubscribeStore = useStore.subscribe(
      (state) => state.experience,
      ({ rotationProgress, lastChanged }) => {
        console.log("enters here");
        switch (lastChanged) {
          case "rotationProgress":
            console.log("Rotation progress: ", rotationProgress);
            initialRotation.seek(rotationProgress);
            break;

          default:
            break;
        }
      }
    );

    return () => {
      unsubscribeStore();
      for (let i = 0; i < timeouts.current.length; i++) {
        clearTimeout(timeouts[i]);
      }
    };
  }, []);

  useFrame(() => {
    //transform fixes
    const { transform, move, moveInfinite, transformTweak, moveTweak } =
      actionsPointer.current;
    if (!transform) {
      return;
    }
    if (transform.time >= transform._clip.duration - transformTweak) {
      transform.paused = true;
    }
    //move fixes
    if (!move) {
      return;
    }
    if (moveInfinite) {
      if (move.time >= move._clip.duration - moveTweak) {
        move.time = moveTweak;
      }
    } else {
      if (move.time >= move._clip.duration - moveTweak) {
        move.paused = true;
      }
    }

    if (actions.go.time >= actions.go._clip.duration - 0.1) {
      actions.go.paused = true;
    }
  });

  return (
    <group
      position={[15.45, -0.6, 681.4]}
      // scale={[0.4, 0.4, 0.4]}
      rotation={[0, Math.PI / 8, 0]}
      ref={mainContainer}
      {...props}
      dispose={null}
    >
      <mesh
        name="cube"
        geometry={nodes.cube.geometry}
        material={nodes.cube.material}
        receiveShadow={true}
        morphTargetDictionary={nodes.cube.morphTargetDictionary}
        morphTargetInfluences={nodes.cube.morphTargetInfluences}
      >
        {/**this is the main cube */}
        <meshStandardMaterial
          {...nodes.cube.material}
          layers={2}
          roughness={0.8}
          metalness={0.2}
          emissive="green"
        />
      </mesh>
      <mesh
        name="cube_1"
        geometry={nodes.cube_1.geometry}
        material={nodes.cube_1.material}
        morphTargetDictionary={nodes.cube_1.morphTargetDictionary}
        morphTargetInfluences={nodes.cube_1.morphTargetInfluences}
      >
        {/** this is the face of the main cube */}
        <meshStandardMaterial
          {...nodes.cube_1.material}
          layers={2}
          emissive="#fff000"
        />
      </mesh>
      <group position={[4.25, -0.25, 0]} scale={[1.255, 1.255, 1.255]}>
        <mesh
          name="cube_2"
          geometry={nodes.cube_2.geometry}
          material={nodes.cube_2.material}
          morphTargetDictionary={nodes.cube_2.morphTargetDictionary}
          morphTargetInfluences={nodes.cube_2.morphTargetInfluences}
        >
          <meshStandardMaterial
            {...nodes.cube_2.material}
            layers={2}
            emissive="#00ff00"
          />
        </mesh>
        <mesh
          name="cube_3"
          geometry={nodes.cube_3.geometry}
          material={nodes.cube_3.material}
          morphTargetDictionary={nodes.cube_3.morphTargetDictionary}
          morphTargetInfluences={nodes.cube_3.morphTargetInfluences}
        >
          <meshStandardMaterial
            {...nodes.cube_3.material}
            layers={2}
            emissive="#ff00ff"
          />
        </mesh>
        <mesh
          name="cube_4"
          geometry={nodes.cube_4.geometry}
          material={nodes.cube_4.material}
          morphTargetDictionary={nodes.cube_4.morphTargetDictionary}
          morphTargetInfluences={nodes.cube_4.morphTargetInfluences}
        >
          <meshStandardMaterial layers={2} emissive="red" />
        </mesh>
        <mesh
          name="cube_5"
          geometry={nodes.cube_5.geometry}
          material={nodes.cube_5.material}
          morphTargetDictionary={nodes.cube_5.morphTargetDictionary}
          morphTargetInfluences={nodes.cube_5.morphTargetInfluences}
        >
          <meshStandardMaterial
            {...nodes.cube_5.material}
            layers={2}
            emissive="#ff00aa"
          />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload(process.env.PUBLIC_URL + "/all.glb");
