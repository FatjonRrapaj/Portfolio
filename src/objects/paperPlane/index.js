import React, { createRef, forwardRef, useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { useGLTF, useAnimations, Html } from "@react-three/drei";

import { useControls } from "leva";

export default forwardRef(({ ...props }, plane) => {
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
      value: 8,
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
    color: "#006f6f",
    positionX: {
      value: 0,
      min: -1000,
      max: 1000,
      step: 0.01,
    },
    positionY: {
      value: 34.8,
      min: -1000,
      max: 1000,
      step: 0.1,
    },
    positionZ: {
      value: 575.3,
      min: -1000,
      max: 1000,
      step: 0.1,
    },
    rotationX: {
      value: Math.PI / 2,
      step: Math.PI / 2,
      min: -1000,
      max: 1000,
    },
    rotationY: {
      value: 0,
      step: Math.PI / 10,
      min: -1000,
      max: 1000,
    },
    rotationZ: {
      value: Math.PI * 2,
      step: Math.PI / 10,
      min: -1000,
      max: 1000,
    },
    wireframe: false,
  });

  const { nodes, materials, animations, ...rest } = useGLTF("/plane.glb");
  const { actions } = useAnimations(animations, plane);

  const hello = useLoader(THREE.TextureLoader, "/hello.jpeg");
  hello.flipY = false;

  hello.rotation = -0.2;

  const topR = useRef();
  const m90R = useRef();
  const tieR = useRef();
  const straightR = useRef();
  const straightL = useRef();
  const tieL = useRef();
  const m90L = useRef();
  const topL = useRef();

  // useFrame(({ clock }) => {
  //   if (plane.current) {
  //     // plane.current.rotation.z += 0.01;
  //   }
  // });

  useEffect(() => {
    const { fold } = actions;
    fold.repetitions = 1;
    fold.clampWhenFinished = true;
    setTimeout(() => {
      fold.play();
    }, 1000);
  }, []);

  return (
    <group
      layers={2}
      scale={[scaleFactor, scaleFactor, scaleFactor]}
      position={[positionX, positionY, positionZ]}
      rotation={[rotationX, rotationY, rotationZ]}
      ref={plane}
      {...props}
      dispose={null}
    >
      {/**TOP RIGHT */}
      <mesh
        name="topR"
        ref={topR}
        layers={2}
        geometry={nodes.topR.geometry}
        morphTargetDictionary={nodes.topR.morphTargetDictionary}
        morphTargetInfluences={nodes.topR.morphTargetInfluences}
      >
        <meshStandardMaterial
          {...nodes.topR.material}
          metalness={0}
          roughness={0.8}
          side={THREE.BackSide}
          map={hello}
          wireframe={wireframe}
          shadowSide={THREE.BackSide}
          color={color}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      <mesh
        name="topR"
        ref={topR}
        layers={2}
        geometry={nodes.topR.geometry}
        morphTargetDictionary={nodes.topR.morphTargetDictionary}
        morphTargetInfluences={nodes.topR.morphTargetInfluences}
      >
        <meshStandardMaterial
          {...nodes.topR.material}
          metalness={0}
          roughness={0.8}
          side={THREE.FrontSide}
          wireframe={wireframe}
          shadowSide={THREE.FrontSide}
          color={color}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      {/**90 RIGHT */}
      <mesh
        layers={2}
        name="90R"
        ref={m90R}
        geometry={nodes["90R"].geometry}
        morphTargetDictionary={nodes["90R"].morphTargetDictionary}
        morphTargetInfluences={nodes["90R"].morphTargetInfluences}
      >
        <meshStandardMaterial
          {...nodes["90R"].material}
          metalness={0}
          roughness={0.8}
          wireframe={wireframe}
          side={THREE.BackSide}
          map={hello}
          shadowSide={THREE.BackSide}
          color={color}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      <mesh
        layers={2}
        name="90R"
        ref={m90R}
        geometry={nodes["90R"].geometry}
        morphTargetDictionary={nodes["90R"].morphTargetDictionary}
        morphTargetInfluences={nodes["90R"].morphTargetInfluences}
      >
        <meshStandardMaterial
          {...nodes["90R"].material}
          metalness={0}
          roughness={0.8}
          side={THREE.FrontSide}
          wireframe={wireframe}
          shadowSide={THREE.FrontSide}
          color={color}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      {/**TIE RIGHT */}
      <mesh
        layers={2}
        name="tieR"
        ref={tieR}
        geometry={nodes.tieR.geometry}
        morphTargetDictionary={nodes.tieR.morphTargetDictionary}
        morphTargetInfluences={nodes.tieR.morphTargetInfluences}
      >
        <meshStandardMaterial
          {...nodes.tieR.material}
          metalness={0}
          roughness={0.8}
          side={THREE.BackSide}
          map={hello}
          wireframe={wireframe}
          shadowSide={THREE.BackSide}
          color={color}
          emissiveIntensity={emissiveIntensity}
          emissive={color}
        />
      </mesh>
      <mesh
        layers={2}
        name="tieR"
        ref={tieR}
        geometry={nodes.tieR.geometry}
        morphTargetDictionary={nodes.tieR.morphTargetDictionary}
        morphTargetInfluences={nodes.tieR.morphTargetInfluences}
      >
        <meshStandardMaterial
          {...nodes.tieR.material}
          metalness={0}
          roughness={0.8}
          side={THREE.FrontSide}
          wireframe={wireframe}
          shadowSide={THREE.FrontSide}
          color={color}
          emissiveIntensity={emissiveIntensity}
          emissive={color}
        />
      </mesh>
      {/**STRAIGHT RIGHT */}
      <mesh
        layers={2}
        name="straightR"
        ref={straightR}
        geometry={nodes.straightR.geometry}
        morphTargetDictionary={nodes.straightR.morphTargetDictionary}
        morphTargetInfluences={nodes.straightR.morphTargetInfluences}
      >
        <meshStandardMaterial
          {...nodes.straightR.material}
          metalness={0}
          side={THREE.BackSide}
          shadowSide={THREE.BackSide}
          map={hello}
          roughness={0.8}
          wireframe={wireframe}
          color={color}
          emissiveIntensity={emissiveIntensity}
          emissive={color}
        />
      </mesh>
      <mesh
        layers={2}
        name="straightR"
        ref={straightR}
        geometry={nodes.straightR.geometry}
        morphTargetDictionary={nodes.straightR.morphTargetDictionary}
        morphTargetInfluences={nodes.straightR.morphTargetInfluences}
      >
        <meshStandardMaterial
          {...nodes.straightR.material}
          {...materials.Material}
          metalness={0}
          side={THREE.FrontSide}
          shadowSide={THREE.BackSide}
          roughness={0.8}
          wireframe={wireframe}
          color={color}
          emissiveIntensity={emissiveIntensity}
          emissive={color}
        />
      </mesh>

      {/**STRAIGHT LEFT */}

      <mesh
        layers={2}
        name="straightL"
        ref={straightL}
        geometry={nodes.straightL.geometry}
        morphTargetDictionary={nodes.straightL.morphTargetDictionary}
        morphTargetInfluences={nodes.straightL.morphTargetInfluences}
      >
        <meshStandardMaterial
          {...nodes.straightL.material}
          metalness={0}
          roughness={0.8}
          wireframe={wireframe}
          side={THREE.BackSide}
          map={hello}
          shadowSide={THREE.BackSide}
          color={color}
          emissiveIntensity={emissiveIntensity}
          emissive={color}
        />
      </mesh>
      <mesh
        layers={2}
        name="straightL"
        ref={straightL}
        geometry={nodes.straightL.geometry}
        morphTargetDictionary={nodes.straightL.morphTargetDictionary}
        morphTargetInfluences={nodes.straightL.morphTargetInfluences}
      >
        <meshStandardMaterial
          {...nodes.straightL.material}
          metalness={0}
          roughness={0.8}
          wireframe={wireframe}
          side={THREE.FrontSide}
          shadowSide={THREE.FrontSide}
          color={color}
          emissiveIntensity={emissiveIntensity}
          emissive={color}
        />
      </mesh>
      {/**TIE LEFT */}
      <mesh
        layers={2}
        name="tieL"
        ref={tieL}
        geometry={nodes.tieL.geometry}
        morphTargetDictionary={nodes.tieL.morphTargetDictionary}
        morphTargetInfluences={nodes.tieL.morphTargetInfluences}
      >
        <meshStandardMaterial
          {...nodes.tieL.material}
          metalness={0}
          roughness={0.8}
          side={THREE.BackSide}
          map={hello}
          wireframe={wireframe}
          shadowSide={THREE.BackSide}
          color={color}
          emissiveIntensity={emissiveIntensity}
          emissive={color}
        />
      </mesh>
      <mesh
        layers={2}
        name="tieL"
        ref={tieL}
        geometry={nodes.tieL.geometry}
        morphTargetDictionary={nodes.tieL.morphTargetDictionary}
        morphTargetInfluences={nodes.tieL.morphTargetInfluences}
      >
        <meshStandardMaterial
          {...nodes.tieL.material}
          metalness={0}
          roughness={0.8}
          side={THREE.FrontSide}
          wireframe={wireframe}
          shadowSide={THREE.FrontSide}
          color={color}
          emissiveIntensity={emissiveIntensity}
          emissive={color}
        />
      </mesh>
      {/**90 LEFT */}
      <mesh
        layers={2}
        name="90L"
        ref={m90L}
        geometry={nodes["90L"].geometry}
        morphTargetDictionary={nodes["90L"].morphTargetDictionary}
        morphTargetInfluences={nodes["90L"].morphTargetInfluences}
      >
        <meshStandardMaterial
          {...nodes["90L"].material}
          metalness={0}
          roughness={0.8}
          side={THREE.BackSide}
          map={hello}
          wireframe={wireframe}
          shadowSide={THREE.BackSide}
          color={color}
          emissiveIntensity={emissiveIntensity}
          emissive={color}
        />
      </mesh>
      <mesh
        layers={2}
        name="90L"
        ref={m90L}
        geometry={nodes["90L"].geometry}
        morphTargetDictionary={nodes["90L"].morphTargetDictionary}
        morphTargetInfluences={nodes["90L"].morphTargetInfluences}
      >
        <meshStandardMaterial
          {...nodes["90L"].material}
          metalness={0}
          roughness={0.8}
          side={THREE.FrontSide}
          wireframe={wireframe}
          shadowSide={THREE.FrontSide}
          color={color}
          emissiveIntensity={emissiveIntensity}
          emissive={color}
        />
      </mesh>
      {/**TOP LEFT */}
      <mesh
        layers={2}
        name="topL"
        ref={topL}
        geometry={nodes.topL.geometry}
        morphTargetDictionary={nodes.topL.morphTargetDictionary}
        morphTargetInfluences={nodes.topL.morphTargetInfluences}
      >
        <meshStandardMaterial
          {...nodes.topL.material}
          metalness={0}
          roughness={0.8}
          side={THREE.BackSide}
          map={hello}
          wireframe={wireframe}
          shadowSide={THREE.BackSide}
          color={color}
          emissiveIntensity={emissiveIntensity}
          emissive={color}
        />
      </mesh>
      <mesh
        layers={2}
        name="topL"
        ref={topL}
        geometry={nodes.topL.geometry}
        morphTargetDictionary={nodes.topL.morphTargetDictionary}
        morphTargetInfluences={nodes.topL.morphTargetInfluences}
      >
        <meshStandardMaterial
          {...nodes.topL.material}
          metalness={0}
          roughness={0.8}
          side={THREE.FrontSide}
          wireframe={wireframe}
          shadowSide={THREE.FrontSide}
          color={color}
          emissiveIntensity={emissiveIntensity}
          emissive={color}
        />
      </mesh>
    </group>
  );
});

useGLTF.preload("/plane.glb");
