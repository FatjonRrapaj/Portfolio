/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

//the lifesaver (source):https://observablehq.com/@rveciana/three-js-object-moving-object-along-path

import React, { useRef, useState } from "react";
import { Vector3, BufferGeometry, CatmullRomCurve3 } from "three";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect } from "react/cjs/react.development";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import anime from "animejs/lib/anime.es";
import { FrontSide, TextureLoader } from "three";
import { useControls } from "leva";

import useStore from "../store";
import { seekGltfAnimation } from "../helpers/animation";
import createSpiralPathFromCoordinateWithRadius from "./world/createPath";
import { objectPositionsInSpace } from "./constants";

export default function Model({ ...props }) {
  const { camera } = useThree();

  // useControls("Camera", {
  //   x: {
  //     value: camera.position.x,
  //     min: -1000,
  //     max: 1000,

  //     onChange: (val) => {
  //       camera.position.x = val;
  //     },
  //   },
  //   y: {
  //     value: camera.position.y,
  //     min: -1000,
  //     max: 1000,
  //     onChange: (val) => {
  //       camera.position.y = val;
  //     },
  //   },
  //   z: {
  //     value: camera.position.z,
  //     min: -1000,
  //     max: 1000,
  //     onChange: (val) => {
  //       camera.position.z = val;
  //     },
  //   },
  //   a: {},
  // });

  const group = useRef();
  const { nodes, animations } = useGLTF(
    process.env.PUBLIC_URL + "/testOnlyPlane.glb"
  );
  const { actions } = useAnimations(animations, group);

  const front = useLoader(TextureLoader, process.env.PUBLIC_URL + "/front.jpg");
  front.flipY = false;
  const back = useLoader(TextureLoader, process.env.PUBLIC_URL + "/back.jpg");
  back.flipY = false;

  //animation progress checkers for handling going backwards
  const planeFoldingProgressChecker = useRef(0);
  const planeToClockProgressChecker = useRef(0);
  const planeToCamelProgressChecker = useRef(0);
  const planeToAndroidProgressChecker = useRef(0);
  const planeToAppleProgressChecker = useRef(0);
  const planeToReactPositionProgressChecker = useRef(0);
  const moveCamera = useRef(false);

  const lineRef = useRef();

  lineRef.current && lineRef.current.computeLineDistances();

  const {
    planeInitialPosition: p,
    clock,
    camel,
    android,
    ios,
    react,
  } = objectPositionsInSpace;

  /** Line */
  const [points] = useState(() => {
    return [
      new Vector3(p.x, p.y, p.z),
      //clock
      ...createSpiralPathFromCoordinateWithRadius({
        coordinate: [clock.x, clock.y, clock.z],
        radius: 10,
        direction: 1,
        spirals: 4,
        heightDivider: 4,
      }).points,
      //camel
      ...createSpiralPathFromCoordinateWithRadius({
        coordinate: [camel.x, camel.y, camel.z],
        direction: 1,
        radius: 10,
        spirals: 2,
        type: "twisted",
        heightDivider: 3,
      }).points,
      //android
      ...createSpiralPathFromCoordinateWithRadius({
        coordinate: [android.x, android.y, android.z],
        direction: -1,
        radius: 10,
        spirals: 2,
        heightDivider: 3,
        type: "double",
      }).points,
      //ios
      ...createSpiralPathFromCoordinateWithRadius({
        coordinate: [ios.x, ios.y, ios.z],
        direction: -1,
        radius: 10,
        spirals: 2,
        heightDivider: 4,
        type: "twistedDown",
      }).points,
      //react
      ...createSpiralPathFromCoordinateWithRadius({
        coordinate: [react.x, react.y, react.z],
        direction: 1,
        radius: 10,
        spirals: 2,
        heightDivider: 5,
      }).points,
      new Vector3(0, 0, 0),
    ];
  });

  const [line] = useState(() => {
    const c = new CatmullRomCurve3(points);
    c.tension = 0.65;
    c.arcLengthDivisions = 20000;
    c.curveType = "catmullrom";
    c.closed = false;
    return c;
  });

  const [lineGeometry] = useState(() =>
    new BufferGeometry().setFromPoints(line.getSpacedPoints(20000))
  );

  const planePosition = useRef(null);
  const planeRotation = useRef(null);

  const up = new Vector3(0, 1, 0);
  const axis = new Vector3();

  function movePlane({ fraction, isBackward, moveCamera }) {
    if (!group.current) return;
    //move
    const position = line.getPoint(fraction);
    planePosition.current = { ...position };
    if (isBackward) {
      //TODO: take care of this when the all journey is completed.
      up.y = -1;
    } else {
      up.y = 1;
    }
    //rotate
    const tangent = line.getTangent(fraction);
    axis.crossVectors(up, tangent).normalize();
    const angle = Math.acos(up.dot(tangent));
    planeRotation.current = { axis, angle };
  }

  useEffect(() => {
    if (!group.current) return;

    //switch between plane & sheet visibilities
    const unsubscribeFromSheetListener = useStore.subscribe(
      (state) => state.sheet,
      ({ lastChanged }) => {
        if (lastChanged === "sheetProgress") {
          if (group.current.visible) group.current.visible = false;
          if (lineRef.current.visible) lineRef.current.visible = false;
        }
      }
    );

    // position={[15, -1.09, 682]}

    //TODO: fix this
    const planeToIntialPosition = anime({
      targets: group.current.position,
      x: [15, 12.949322347666651],
      y: [-1.09, -0.9357873478198813],
      z: [682, 656.1792166619816],
      duration: 500,
      autoplay: false,
    });

    //TODO: fix this
    const planeToInitialRotation = anime({
      targets: group.current.quaternion,
      w: [1, 0.709238017607531],
      x: [0, -0.701731634510443],
      y: [0, 0],
      z: [0, 0.06748442418396647],
      duration: 500,
      autoplay: false,
    });

    const { fold } = actions;
    const unsubcribeFromPlaneAnimationListener = useStore.subscribe(
      (state) => state.plane,
      ({
        planeFoldingProgress,
        lastChanged,
        planeToInitialTrajectoryPointProgress,
        planeToClockProgress,
        planeToCamelProgres,
        planeToAndroidProgress,
        planeToAppleProgress,
        planeToReactPositionProgress,
      }) => {
        switch (lastChanged) {
          case "planeFoldingProgress":
            if (!group.current.visible) group.current.visible = true;
            if (!lineRef.current.visible) lineRef.current.visible = true;
            group.current.quaternion.setFromAxisAngle(new Vector3(0, 0, 0), 0);
            camera.position.z = group.current.position.z + 3;
            camera.position.y = group.current.position.y + 0.6;
            seekGltfAnimation(
              fold,
              planeFoldingProgress,
              planeFoldingProgressChecker,
              10000,
              true,
              1,
              true
            );
            break;
          case "planeToInitialTrajectoryPointProgress":
            planeToIntialPosition.seek(planeToInitialTrajectoryPointProgress);
            planeToInitialRotation.seek(planeToInitialTrajectoryPointProgress);
            break;
          case "planeToClockProgress":
            handleMovePlane(
              planeToClockProgress,
              planeToClockProgressChecker,
              true
            );
            break;
          case "planeToCamelProgres":
            handleMovePlane(
              planeToCamelProgres,
              planeToCamelProgressChecker,
              true
            );
            break;
          case "planeToAndroidProgress":
            handleMovePlane(
              planeToAndroidProgress,
              planeToAndroidProgressChecker,
              true
            );
            break;
          case "planeToAppleProgress":
            handleMovePlane(
              planeToAppleProgress,
              planeToAppleProgressChecker,
              true
            );
            break;
          case "planeToReactPositionProgress":
            handleMovePlane(
              planeToReactPositionProgress,
              planeToReactPositionProgressChecker,
              true
            );
            break;
          default:
            break;
        }
      }
    );

    function handleMovePlane(
      progress,
      sheetProgressCheckerRef,
      shouldCameraMove
    ) {
      const fraction = progress / 550;
      const isBackward = sheetProgressCheckerRef.current > progress;
      movePlane({
        fraction,
        isBackward,
      });
      moveCamera.current = shouldCameraMove;
      sheetProgressCheckerRef.current = progress;
    }

    return () => {
      unsubcribeFromPlaneAnimationListener();
      unsubscribeFromSheetListener();
    };
  }, [group.current]);

  useFrame(() => {
    if (group.current && planePosition.current && planeRotation.current) {
      group.current.position.copy(planePosition.current);
      group.current.quaternion.setFromAxisAngle(
        planeRotation.current.axis,
        planeRotation.current.angle
      );
      if (moveCamera.current) {
        camera.position.copy({
          x: planePosition.current.x,
          y: planePosition.current.y + 3.5,
          z: planePosition.current.z + 30,
        });
      }
    }
  }, 1);

  return (
    <>
      <line ref={lineRef} geometry={lineGeometry}>
        <lineDashedMaterial
          emissive="white"
          emissiveIntensity={10}
          scale={1}
          dashSize={0.5}
          gapSize={0.5}
          color="white"
        />
      </line>
      <group
        //it's a very very very absolutley bad idea to change the position, only if you match it with the seet position, as they swap visibilies. incopetent blender trick just to save some time, please don't be judge too much :/
        position={[15, -1.09, 682]}
        rotation={[0, 0, 0]}
        ref={group}
        {...props}
        visible={false}
        dispose={null}
      >
        <mesh
          name="material"
          geometry={nodes.material.geometry}
          material={nodes.material.material}
          morphTargetDictionary={nodes.material.morphTargetDictionary}
          morphTargetInfluences={nodes.material.morphTargetInfluences}
        >
          <meshStandardMaterial
            {...nodes.material.material}
            map={back}
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
          material={nodes.material_1.material}
          morphTargetDictionary={nodes.material_1.morphTargetDictionary}
          morphTargetInfluences={nodes.material_1.morphTargetInfluences}
        >
          <meshStandardMaterial
            {...nodes.material_1.material}
            map={front}
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
          material={nodes.material_2.material}
          morphTargetDictionary={nodes.material_2.morphTargetDictionary}
          morphTargetInfluences={nodes.material_2.morphTargetInfluences}
        >
          <meshStandardMaterial
            {...nodes.material_2.material}
            color="#fff"
            emissive="#fff"
          />
        </mesh>
      </group>
    </>
  );
}

useGLTF.preload(process.env.PUBLIC_URL + "/testOnlyPlane.glb");
