import React, { forwardRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";

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
      value: Math.PI,
      step: Math.PI / 10,
      min: -1000,
      max: 1000,
    },
    wireframe: false,
  });

  useEffect(() => {
    if (plane.current !== null) {
      // plane.current.position.z = camera.position.z;

      const { fold } = actions;
      console.log("FOLD", fold);
      fold.repetitions = 1;
      fold.clampWhenFinished = true;

      fold.setDuration(3);
    }
  }, [plane.current]);

  const { nodes, materials, animations } = useGLTF("/plane.glb");
  const { actions } = useAnimations(animations, plane);

  useFrame(({ clock }) => {
    if (plane.current) {
      plane.current.rotation.z = Math.sin(clock.getElapsedTime()) * 0.2;
    }
  });

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
      <mesh
        name="topR"
        layers={2}
        geometry={nodes.topR.geometry}
        material={nodes.topR.material}
        morphTargetDictionary={nodes.topR.morphTargetDictionary}
        morphTargetInfluences={nodes.topR.morphTargetInfluences}
      >
        <meshStandardMaterial
          {...materials.Material}
          side={THREE.DoubleSide}
          wireframe={wireframe}
          shadowSide={THREE.DoubleSide}
          color={color}
          emissiveIntensity={emissiveIntensity}
          emissive={color}
        />
      </mesh>
      <mesh
        layers={2}
        name="90R"
        geometry={nodes["90R"].geometry}
        material={nodes["90R"].material}
        morphTargetDictionary={nodes["90R"].morphTargetDictionary}
        morphTargetInfluences={nodes["90R"].morphTargetInfluences}
      >
        <meshStandardMaterial
          {...materials.Material}
          side={THREE.DoubleSide}
          wireframe={wireframe}
          shadowSide={THREE.DoubleSide}
          color={color}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      <mesh
        layers={2}
        name="tieR"
        geometry={nodes.tieR.geometry}
        material={nodes.tieR.material}
        morphTargetDictionary={nodes.tieR.morphTargetDictionary}
        morphTargetInfluences={nodes.tieR.morphTargetInfluences}
      >
        <meshStandardMaterial
          {...materials.Material}
          side={THREE.DoubleSide}
          wireframe={wireframe}
          shadowSide={THREE.DoubleSide}
          color={color}
          emissiveIntensity={emissiveIntensity}
          emissive={color}
        />
      </mesh>
      <mesh
        layers={2}
        name="straightR"
        geometry={nodes.straightR.geometry}
        material={nodes.straightR.material}
        morphTargetDictionary={nodes.straightR.morphTargetDictionary}
        morphTargetInfluences={nodes.straightR.morphTargetInfluences}
      >
        <meshStandardMaterial
          {...materials.Material}
          side={THREE.DoubleSide}
          wireframe={wireframe}
          shadowSide={THREE.DoubleSide}
          color={color}
          emissiveIntensity={emissiveIntensity}
          emissive={color}
        />
      </mesh>
      <mesh
        layers={2}
        name="straightL"
        geometry={nodes.straightL.geometry}
        material={nodes.straightL.material}
        morphTargetDictionary={nodes.straightL.morphTargetDictionary}
        morphTargetInfluences={nodes.straightL.morphTargetInfluences}
      >
        <meshStandardMaterial
          {...materials.Material}
          side={THREE.DoubleSide}
          wireframe={wireframe}
          shadowSide={THREE.DoubleSide}
          color={color}
          emissiveIntensity={emissiveIntensity}
          emissive={color}
        />
      </mesh>
      <mesh
        layers={2}
        name="tieL"
        geometry={nodes.tieL.geometry}
        material={nodes.tieL.material}
        morphTargetDictionary={nodes.tieL.morphTargetDictionary}
        morphTargetInfluences={nodes.tieL.morphTargetInfluences}
      >
        <meshStandardMaterial
          {...materials.Material}
          side={THREE.DoubleSide}
          wireframe={wireframe}
          shadowSide={THREE.DoubleSide}
          color={color}
          emissiveIntensity={emissiveIntensity}
          emissive={color}
        />
      </mesh>
      <mesh
        layers={2}
        name="90L"
        geometry={nodes["90L"].geometry}
        material={nodes["90L"].material}
        morphTargetDictionary={nodes["90L"].morphTargetDictionary}
        morphTargetInfluences={nodes["90L"].morphTargetInfluences}
      >
        <meshStandardMaterial
          {...materials.Material}
          side={THREE.DoubleSide}
          wireframe={wireframe}
          shadowSide={THREE.DoubleSide}
          color={color}
          emissiveIntensity={emissiveIntensity}
          emissive={color}
        />
      </mesh>
      <mesh
        layers={2}
        name="topL"
        geometry={nodes.topL.geometry}
        material={nodes.topL.material}
        morphTargetDictionary={nodes.topL.morphTargetDictionary}
        morphTargetInfluences={nodes.topL.morphTargetInfluences}
      >
        <meshStandardMaterial
          {...materials.Material}
          side={THREE.DoubleSide}
          wireframe={wireframe}
          shadowSide={THREE.DoubleSide}
          color={color}
          emissiveIntensity={emissiveIntensity}
          emissive={color}
        />
      </mesh>
    </group>
  );
});

useGLTF.preload("/plane.glb");
