/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef, createRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import useStore from "../store";
import anime from "animejs/lib/anime.es";
import { useControls } from "leva";

import Paragraph from "./paragraphs/Paragraph";

import { seekGltfAnimation } from "../helpers/animation";
import { AnimationActionLoopStyles } from "three";

export default function Model({ ...props }) {
  const { camera } = useThree();
  console.log("camera: ", camera.position);

  const mainContainer = useRef();
  const secondaryContainer = useRef();

  const { nodes, materials, animations } = useGLTF(
    process.env.PUBLIC_URL + "/all.glb"
  );
  const { actions } = useAnimations(animations, mainContainer);

  //refs
  const timeouts = useRef([]);

  //paragraphs ref
  const timeDefinition = useRef();
  const patienceDefintion = useRef();

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

  //pargraphs show & hide
  // const timeDefinitionScale = useRef([0,0,0])

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

  function resetAnimationTime(animObject) {
    const newTime = animObject._clip.duration * 1000 * 2;
    animObject.setDuration(newTime);
  }

  //for controling backward and forward playing of GLTF animations
  const initialGoProgressChecker = useRef(0);
  const toClockProgressChecker = useRef(0);
  const clockMoveProgressChecker = useRef(0);
  const clockCloseProgressChecker = useRef(0);
  const toCamelProgressChecker = useRef(0);
  const camelMoveProgressChecker = useRef(0);
  const camelGoProgressChecker = useRef(0);
  const toAndroidProgressChecker = useRef(0);

  useControls("Experience", {
    x: {
      value: 15.45,
      min: -1000,
      max: 1000,
      onChange: (val) => {
        if (mainContainer?.current?.position.x) {
          mainContainer.current.position.x = val;
        }
      },
    },
    y: {
      value: -0.6,
      min: -1000,
      max: 1000,
      onChange: (val) => {
        if (mainContainer?.current?.position.y) {
          mainContainer.current.position.y = val;
        }
      },
    },
    z: {
      value: 681.4,
      min: -1000,
      max: 1000,
      onChange: (val) => {
        if (mainContainer?.current?.position.z) {
          mainContainer.current.position.z = val;
        }
      },
    },
  });

  useEffect(() => {
    // assignActions(6);
    // startAnimations();
    // endAnimations();
    if (!mainContainer.current) return;

    //initial rotation
    const initialRotation = anime({
      targets: mainContainer.current?.rotation,
      x: 0,
      y: 0,
      z: 0,
      duration: 500,
      autoplay: false,
    });

    const unsubscribeInitialAnimation = useStore.subscribe(
      (state) => state.initialAnimation,
      ({ progress }) => {
        initialRotation.seek(progress);
      }
    );

    //initial scaleDown for playing the go animation
    const scaleDown = anime({
      targets: secondaryContainer.current.scale,
      x: 1,
      y: 1,
      z: 1,
      duration: 500,
      autoplay: false,
    });

    //joining the cubes.
    const join = anime({
      targets: secondaryContainer.current.position,
      x: secondaryContainer.current.position.x - 2.6,
      y: 0,
      z: 0,
      duration: 500,
      autoplay: false,
    });

    //bring cubes to the clock position
    const cubesToClockPosition = anime({
      targets: mainContainer.current.position,
      x: -85,
      y: 10,
      z: 562,
      duration: 500,
      autoplay: false,
    });

    const subCubesToClockPosition = anime({
      targets: secondaryContainer.current.position,
      x: 0.5,
      y: 0,
      z: 0,
      duration: 500,
      autoplay: false,
    });

    //rotate cubes to show good clock animation
    const cubesToClockRotation = anime({
      targets: mainContainer.current.rotation,
      y: Math.PI / 3,
      duration: 500,
      autoplay: false,
    });

    //show timeDefinition
    const timeDefinitionShow = anime({
      targets: timeDefinition.current.style,
      opacity: 1,
      duration: 500,
      autoplay: false,
    });

    //hide timeDefinition
    const timeDefinitionClose = anime({
      targets: timeDefinition.current.style,
      opacity: 0,
      duration: 500,
      autoplay: false,
    });

    //bring cubes to the camel position
    const cubesToCamelPosition = anime({
      targets: mainContainer.current.position,
      x: 80,
      y: 5,
      z: 484,
      duration: 500,
      autoplay: false,
    });

    const subCubesToCamelPosition = anime({
      targets: secondaryContainer.current.position,
      x: 0.5,
      y: 0,
      z: 0,
      duration: 500,
      autoplay: false,
    });

    const rotateCubesForCamelAnim = anime({
      targets: mainContainer.current.rotation,
      y: -Math.PI / 3,
      duration: 500,
      autoplay: false,
    });

    //show patience definition
    const showPatienceDefinition = anime({
      targets: patienceDefintion.current.style,
      opacity: 1,
      duration: 500,
      autoplay: false,
    });

    //hide patience definition
    const hidePatienceDefinition = anime({
      targets: patienceDefintion.current.style,
      opacity: 0,
      duration: 500,
      autoplay: false,
    });

    //bring the cubes to android position
    const cubesToAndroidPosition = anime({
      targets: mainContainer.current.position,
      x: 48,
      y: 12,
      z: 450,
      duration: 500,
      autoplay: false,
    });

    const subCubesToAndroidPosition = anime({
      targets: secondaryContainer.current.position,
      x: 0.5,
      y: 0,
      z: 0,
      duration: 500,
      autoplay: false,
    });

    const rotateCubesForAndroidAnimation = anime({
      targets: mainContainer.current.rotation,
      y: Math.PI / 3,
      duration: 500,
      autoplay: false,
    });

    const {
      go,
      toClock,
      clockMove,
      toCamel,
      camelMove,
      toAndroid,
      androidMove,
    } = actions;
    const unsubscribeExperieneStore = useStore.subscribe(
      (state) => state.experience,
      ({
        initialJoinProgress,
        initialGoProgress,
        initialScaleProgress,
        lastChanged,
        experienceCubesToClockPositionProgress,
        toClockProgress,
        clockMoveProgress,
        timeDefinitionProgress,
        clockCloseProgress,
        timeDefinitionCloseProgress,
        cubesToCamelPositionProgress,
        toCamelProgress,
        patienceDefinitionProgress,
        camelMoveProgress,
        camelGoProgress,
        patienceDefitionCloseProgress,
        cubesToAndroidPositionProgress,
        toAndroidProgress,
      }) => {
        switch (lastChanged) {
          case "initialJoinProgress":
            join.seek(initialJoinProgress);
            break;

          case "initialScaleProgress":
            scaleDown.seek(initialScaleProgress);
            break;

          case "initialGoProgress":
            if (initialGoProgress > 90) {
              mainContainer.current.visible = false;
            } else {
              mainContainer.current.visible = true;
            }
            actionsPointer.current.transform = go;
            seekGltfAnimation(
              actionsPointer.current.transform,
              initialGoProgress,
              initialGoProgressChecker,
              1000,
              false
            );
            break;
          case "experienceCubesToClockPositionProgress":
            mainContainer.current.visible = true;
            cubesToClockPosition.seek(experienceCubesToClockPositionProgress);
            cubesToClockRotation.seek(experienceCubesToClockPositionProgress);
            subCubesToClockPosition.seek(
              experienceCubesToClockPositionProgress
            );
            break;
          case "toClockProgress":
            actionsPointer.current.transform = toClock;
            actionsPointer.current.transformTweak = 0.1;
            seekGltfAnimation(
              actionsPointer.current.transform,
              toClockProgress,
              toClockProgressChecker,
              2000,
              false,
              1
            );
            break;
          case "clockMoveProgress":
            actionsPointer.current.move = clockMove;
            actionsPointer.current.moveTweak = 0.05;
            seekGltfAnimation(
              actionsPointer.current.move,
              clockMoveProgress,
              clockMoveProgressChecker,
              30,
              false,
              3
            );
            break;
          case "timeDefinitionProgress":
            timeDefinitionShow.seek(timeDefinitionProgress);
            break;
          case "clockCloseProgress":
            actionsPointer.current.paused = true;
            actionsPointer.current.transform = go;
            if (clockCloseProgress > 90) {
              mainContainer.current.visible = false;
            } else {
              mainContainer.current.visible = true;
            }
            seekGltfAnimation(
              actionsPointer.current.transform,
              clockCloseProgress,
              clockCloseProgressChecker,
              1000,
              false,
              1
            );
            break;
          case "timeDefinitionCloseProgress":
            timeDefinitionClose.seek(timeDefinitionCloseProgress);
            break;
          case "cubesToCamelPositionProgress":
            mainContainer.current.visible = true;
            cubesToCamelPosition.seek(cubesToCamelPositionProgress);
            subCubesToCamelPosition.seek(cubesToCamelPositionProgress);
            rotateCubesForCamelAnim.seek(cubesToCamelPositionProgress);
            //point the animation object to the next one
            actionsPointer.current.transform = toCamel;
            actionsPointer.current.transformTweak = 0.0;

            break;
          case "toCamelProgress":
            seekGltfAnimation(
              actionsPointer.current.transform,
              toCamelProgress,
              toCamelProgressChecker,
              2000,
              false,
              0
            );
            break;
          case "patienceDefinitionProgress":
            showPatienceDefinition.seek(patienceDefinitionProgress);
            break;
          case "camelMoveProgress":
            actionsPointer.current.move = camelMove;
            actionsPointer.current.moveTweak = 0.06;
            seekGltfAnimation(
              actionsPointer.current.move,
              camelMoveProgress,
              camelMoveProgressChecker,
              30,
              false,
              3
            );
            break;
          case "camelGoProgress":
            actionsPointer.current.paused = true;
            actionsPointer.current.transform = go;
            if (camelGoProgress > 90) {
              mainContainer.current.visible = false;
            } else {
              mainContainer.current.visible = true;
            }
            seekGltfAnimation(
              actionsPointer.current.transform,
              camelGoProgress,
              camelGoProgressChecker,
              1000,
              false,
              1
            );
            break;
          case "patienceDefitionCloseProgress":
            hidePatienceDefinition.seek(patienceDefitionCloseProgress);
            break;
          case "cubesToAndroidPositionProgress":
            console.log(
              "cubesToAndroidPositionProgress: ",
              cubesToAndroidPositionProgress
            );
            mainContainer.current.visible = true;
            cubesToAndroidPosition.seek(cubesToAndroidPositionProgress);
            subCubesToAndroidPosition.seek(cubesToAndroidPositionProgress);
            rotateCubesForAndroidAnimation.seek(cubesToAndroidPositionProgress);

            //TODO ADD CORRECT TRANSFORM TWEAKS
            actionsPointer.current.transform = toAndroid;
            actionsPointer.current.transformTweak = 0.1;
            //TODO: animate color chages for cube materials and mabybe environment
            break;
          case "toAndroidProgress":
            seekGltfAnimation(
              actionsPointer.current.transform,
              toAndroidProgress,
              toAndroidProgressChecker,
              2000,
              true,
              1
            );
            break;

          default:
            break;
        }
      }
    );

    return () => {
      unsubscribeInitialAnimation();
      unsubscribeExperieneStore();
      for (let i = 0; i < timeouts.current.length; i++) {
        clearTimeout(timeouts[i]);
      }
    };
  }, [mainContainer.current]);

  useFrame(() => {
    // move anim fixes
    const moveAnimExists = actionsPointer?.current?.move?.time;
    if (!!moveAnimExists) {
      const moveAnimTime = actionsPointer.current.move.time;
      const moveAnimDuration = actionsPointer.current.move._clip.duration;
      const moveAnimTweak = actionsPointer.current.moveTweak;
      if (moveAnimTime >= moveAnimDuration - moveAnimTweak) {
        actionsPointer.current.move.time = moveAnimTweak;
      }
    }

    //transform anim fixes
    const transformAnimExists = actionsPointer?.current?.transform?.time;
    if (!!transformAnimExists) {
      const transformAnimTime = actionsPointer.current.transform.time;

      const transformAnimDuration =
        actionsPointer.current.transform._clip.duration;
      const transformAnimTweak = actionsPointer.current.transformTweak;

      if (transformAnimTime >= transformAnimDuration - transformAnimTweak) {
        actionsPointer.current.transform.paused = true;
      }
    }
  });

  return (
    <group
      position={[15.45, -0.6, 681.4]}
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
      <group
        ref={secondaryContainer}
        position={[3.25, -0.25, 0]}
        scale={[1.255, 1.255, 1.255]}
      >
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
      {/**Time paragraph */}
      <Paragraph ref={timeDefinition} />

      {/**Patience paragraph */}
      <Paragraph
        ref={patienceDefintion}
        position={[-22, 2, 0]}
        title="Patience"
        pronounciation="/ˈpeɪʃ(ə)ns/"
        definition="Sometimes I put myself in difficult circumstances 😤"
        sentence1="Just to endure them 💪"
        sentence2="Don't worry, I tend not to do this in work-related stuff"
        conclusion="If we don't train our patience, we cannot acomplish bigger things"
      />
    </group>
  );
}

useGLTF.preload(process.env.PUBLIC_URL + "/all.glb");

//700 lines and still going, do consider refactoring
