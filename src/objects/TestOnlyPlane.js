/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

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

export default function Model({ ...props }) {
  const { camera } = useThree();

  useControls("Camera", {
    x: {
      value: camera.position.x,
      min: -1000,
      max: 1000,

      onChange: (val) => {
        camera.position.x = val;
      },
    },
    y: {
      value: camera.position.y,
      min: -1000,
      max: 1000,
      onChange: (val) => {
        camera.position.y = val;
      },
    },
    z: {
      value: camera.position.z,
      min: -1000,
      max: 1000,
      onChange: (val) => {
        camera.position.z = val;
      },
    },
    a: {},
  });

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

  const moveCamera = useRef(false);

  const lineRef = useRef();

  lineRef.current && lineRef.current.computeLineDistances();

  /** Line */
  const [points] = useState(() => {
    return [
      new Vector3(15, -1.09, 682),
      new Vector3(100, 12, 550),
      ...createSpiralPathFromCoordinateWithRadius({
        coordinate: [-100, 15, 490],
        radius: 15,
        spirals: 2,
        heightDivider: 3,
      }).points,
      new Vector3(0, 0, 450),
      new Vector3(10, 2, 450),
      new Vector3(20, 4, 450),
      ...createSpiralPathFromCoordinateWithRadius({
        coordinate: [80, 4, 430],
        direction: 1,
        radius: 5,
        spirals: 2,
        heightDivider: 3,
      }).points,
      new Vector3(60, 10, 400),
      new Vector3(50, 12, 380),
      ...createSpiralPathFromCoordinateWithRadius({
        coordinate: [10, 4, 300],
        direction: 1,
        radius: 5,
        spirals: 2,
        heightDivider: 3,
      }).points,
      new Vector3(0, 4, 380),
      new Vector3(0, 0, 350),
      new Vector3(0, 10, 300),
      new Vector3(0, 20, 270),
      new Vector3(0, 30, 220),
      new Vector3(0, 40, 200),
      new Vector3(0, 40, 200),
      new Vector3(0, 40, 200),
      new Vector3(0, 30, 200),
      new Vector3(0, 30, 200),
      new Vector3(0, 90, 100),
      new Vector3(0, 130, 100),
      new Vector3(0, 130, 100),
      new Vector3(0, 130, 100),
      new Vector3(0, 180, 50),
      new Vector3(0, 180, 50),
      new Vector3(0, 180, 150),
      new Vector3(0, 180, 150),
      new Vector3(0, 180, 150),
      new Vector3(0, 1800, 100),
      new Vector3(0, 1800, 100),
    ];
  });

  const [line] = useState(() => {
    const c = new CatmullRomCurve3(points);
    c.tension = 1;
    c.arcLengthDivisions = 20000;
    c.curveType = "catmullrom";

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
    // group.current.position.copy(position);
    planePosition.current = { ...position };
    //rotate
    if (isBackward) {
      //TODO: take care of this when the all journey is completed.
      up.y = -1;
    } else {
      up.y = 1;
    }
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

    //TODO: fix this
    const planeToIntialPosition = anime({
      targets: group.current.position,
      x: 14.178674093594697,
      y: -0.560381565596393,
      z: 675.3947160427972,
      duration: 500,
      autoplay: false,
    });

    //TODO: fix this
    const planeToInitialRotation = anime({
      targets: group.current.quaternion,
      w: 0.823702215991931,
      x: 0.05006559194915403,
      y: 0.5648080168276323,
      z: 0,
      duration: 500,
      autoplay: false,
    });

    //TODO: fix or remove this
    const cameraToInitialPosition = anime({
      targets: camera.position,
      x: 14.178674093594697,
      y: -0.560381565596393,
      z: 690,
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
      }) => {
        switch (lastChanged) {
          case "planeFoldingProgress":
            if (!group.current.visible) group.current.visible = true;
            if (!lineRef.current.visible) lineRef.current.visible = true;

            seekGltfAnimation(
              fold,
              planeFoldingProgress,
              planeFoldingProgressChecker,
              10000
            );
            break;
          case "planeToInitialTrajectoryPointProgress":
            planeToIntialPosition.seek(planeToInitialTrajectoryPointProgress);
            planeToInitialRotation.seek(planeToInitialTrajectoryPointProgress);
            cameraToInitialPosition.seek(planeToInitialTrajectoryPointProgress);
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
      const fraction = progress / 700;
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
          y: planePosition.current.y + 3,
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
        // rotation={[0, 0, 0]}
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
