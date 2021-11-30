import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { act, useFrame, useLoader } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useControls } from "leva";
import anime from "animejs/lib/anime.es.js";

import { lerp } from "../../helpers/animation";

const Plane = ({ ...props }) => {
  const topR = useRef();
  const m90R = useRef();
  const tieR = useRef();
  const straightR = useRef();
  const straightL = useRef();
  const tieL = useRef();
  const m90L = useRef();
  const topL = useRef();

  // useFrame(({ clock }) => {
  //   if (topR.current) {
  //     if (topR.current.material.map.offset.x < 1) {
  //       topR.current.material.map.offset.set(
  //         Math.sin(clock.getElapsedTime()) / -5,
  //         0
  //       );
  //     } else {
  //       topR.current.material.map.offset.set(
  //         Math.sin(clock.getElapsedTime()) / 5,
  //         0
  //       );
  //     }
  //   }
  // });

  // return (
  //   <group
  //     layers={2}
  //     scale={[scaleFactor, scaleFactor, scaleFactor]}
  //     position={[positionX, positionY, positionZ]}
  //     rotation={[rotationX, rotationY, rotationZ]}
  //     ref={plane}
  //     {...props}
  //     dispose={null}
  //   >
  //     {/**TOP RIGHT */}
  //     <mesh
  //       layers={2}
  //       layers={2}
  //       name="topR"
  //       translateX
  //       ref={topR}
  //       layers={2}
  //       geometry={nodes.topR.geometry}
  //       morphTargetDictionary={nodes.topR.morphTargetDictionary}
  //       morphTargetInfluences={nodes.topR.morphTargetInfluences}
  //     >
  //       <meshStandardMaterial
  //         {...nodes.topR.material}
  //         metalness={0}
  //         roughness={0.8}
  //         side={THREE.DoubleSide}
  //         map={hello}
  //         wireframe={wireframe}
  //         shadowSide={THREE.BackSide}
  //         emissive={color}
  //         emissiveIntensity={emissiveIntensity}
  //       />
  //     </mesh>
  //     <mesh
  //       layers={2}
  //       layers={2}
  //       name="topR"
  //       translateX={10}
  //       ref={topR}
  //       layers={2}
  //       geometry={nodes.topR.geometry}
  //       morphTargetDictionary={nodes.topR.morphTargetDictionary}
  //       morphTargetInfluences={nodes.topR.morphTargetInfluences}
  //     >
  //       <meshStandardMaterial
  //         {...nodes.topR.material}
  //         metalness={0}
  //         roughness={0.8}
  //         side={THREE.DoubleSide}
  //         map={test}
  //         wireframe={wireframe}
  //         shadowSide={THREE.FrontSide}
  //         emissive={color}
  //         emissiveIntensity={emissiveIntensity}
  //       />
  //     </mesh>
  //     {/**90 RIGHT */}
  //     <mesh
  //       layers={2}
  //       layers={2}
  //       layers={2}
  //       name="90R"
  //       ref={m90R}
  //       geometry={nodes["90R"].geometry}
  //       morphTargetDictionary={nodes["90R"].morphTargetDictionary}
  //       morphTargetInfluences={nodes["90R"].morphTargetInfluences}
  //     >
  //       <meshStandardMaterial
  //         {...nodes["90R"].material}
  //         metalness={0}
  //         roughness={0.8}
  //         wireframe={wireframe}
  //         side={THREE.DoubleSide}
  //         map={hello}
  //         polygonOffset={true}
  //         shadowSide={THREE.BackSide}
  //         emissive={color}
  //         emissiveIntensity={emissiveIntensity}
  //       />
  //     </mesh>
  //     <mesh
  //       layers={2}
  //       layers={2}
  //       layers={2}
  //       name="90R"
  //       ref={m90R}
  //       geometry={nodes["90R"].geometry}
  //       morphTargetDictionary={nodes["90R"].morphTargetDictionary}
  //       morphTargetInfluences={nodes["90R"].morphTargetInfluences}
  //     >
  //       <meshStandardMaterial
  //         {...nodes["90R"].material}
  //         metalness={0}
  //         roughness={0.8}
  //         side={THREE.DoubleSide}
  //         map={test}
  //         wireframe={wireframe}
  //         polygonOffset={true}
  //         shadowSide={THREE.FrontSide}
  //         emissive={color}
  //         emissiveIntensity={emissiveIntensity}
  //       />
  //     </mesh>
  //     {/**TIE RIGHT */}
  //     <mesh
  //       layers={2}
  //       layers={2}
  //       layers={2}
  //       name="tieR"
  //       ref={tieR}
  //       // geometry={nodes.tieR.geometry}
  //       morphTargetDictionary={nodes.tieR.morphTargetDictionary}
  //       morphTargetInfluences={nodes.tieR.morphTargetInfluences}
  //     >
  //       <bufferGeometry
  //         {...nodes.tieR.geometry}
  //         onUpdate={(self) => (self.verticesNeedUpdate = true)}
  //       />
  //       <meshStandardMaterial
  //         {...nodes.tieR.material}
  //         metalness={0}
  //         roughness={0.8}
  //         side={THREE.DoubleSide}
  //         map={hello}
  //         wireframe={wireframe}
  //         shadowSide={THREE.BackSide}
  //         emissiveIntensity={emissiveIntensity}
  //         emissive={color}
  //       />
  //     </mesh>
  //     <mesh
  //       layers={2}
  //       layers={2}
  //       layers={2}
  //       name="tieR"
  //       ref={tieR}
  //       geometry={nodes.tieR.geometry}
  //       matrixWorldNeedsUpdate={true}
  //       morphTargetDictionary={nodes.tieR.morphTargetDictionary}
  //       morphTargetInfluences={nodes.tieR.morphTargetInfluences}
  //     >
  //       <bufferGeometry
  //         {...nodes.tieR.geometry}
  //         onUpdate={(self) => (self.verticesNeedUpdate = true)}
  //       />
  //       <meshStandardMaterial
  //         {...nodes.tieR.material}
  //         metalness={0}
  //         roughness={0.8}
  //         side={THREE.DoubleSide}
  //         map={test}
  //         wireframe={wireframe}
  //         shadowSide={THREE.FrontSide}
  //         emissiveIntensity={emissiveIntensity}
  //         emissive={color}
  //       />
  //     </mesh>
  //     {/**STRAIGHT RIGHT */}
  //     <mesh
  //       layers={2}
  //       layers={2}
  //       layers={2}
  //       matrixAutoUpdate={false}
  //       name="straightR"
  //       ref={straightR}
  //       geometry={nodes.straightR.geometry}
  //       morphTargetDictionary={nodes.straightR.morphTargetDictionary}
  //       morphTargetInfluences={nodes.straightR.morphTargetInfluences}
  //     >
  //       <meshStandardMaterial
  //         {...nodes.straightR.material}
  //         metalness={0}
  //         side={THREE.DoubleSide}
  //         shadowSide={THREE.BackSide}
  //         map={hello}
  //         roughness={0.8}
  //         wireframe={wireframe}
  //         emissiveIntensity={emissiveIntensity}
  //         emissive={color}
  //       />
  //     </mesh>
  //     <mesh
  //       layers={2}
  //       layers={2}
  //       layers={2}
  //       name="straightR"
  //       ref={straightR}
  //       geometry={nodes.straightR.geometry}
  //       matrixAutoUpdate={false}
  //       morphTargetDictionary={nodes.straightR.morphTargetDictionary}
  //       morphTargetInfluences={nodes.straightR.morphTargetInfluences}
  //     >
  //       <meshStandardMaterial
  //         {...nodes.straightR.material}
  //         {...materials.Material}
  //         metalness={0}
  //         side={THREE.DoubleSide}
  //         map={test}
  //         shadowSide={THREE.BackSide}
  //         roughness={0.8}
  //         wireframe={wireframe}
  //         emissiveIntensity={emissiveIntensity}
  //         emissive={color}
  //       />
  //     </mesh>

  //     {/**STRAIGHT LEFT */}

  //     <mesh
  //       layers={2}
  //       layers={2}
  //       layers={2}
  //       name="straightL"
  //       ref={straightL}
  //       geometry={nodes.straightL.geometry}
  //       morphTargetDictionary={nodes.straightL.morphTargetDictionary}
  //       morphTargetInfluences={nodes.straightL.morphTargetInfluences}
  //     >
  //       <meshStandardMaterial
  //         {...nodes.straightL.material}
  //         metalness={0}
  //         roughness={0.8}
  //         wireframe={wireframe}
  //         side={THREE.DoubleSide}
  //         map={hello}
  //         shadowSide={THREE.BackSide}
  //         emissiveIntensity={emissiveIntensity}
  //         emissive={color}
  //       />
  //     </mesh>
  //     <mesh
  //       layers={2}
  //       layers={2}
  //       layers={2}
  //       name="straightL"
  //       ref={straightL}
  //       geometry={nodes.straightL.geometry}
  //       morphTargetDictionary={nodes.straightL.morphTargetDictionary}
  //       morphTargetInfluences={nodes.straightL.morphTargetInfluences}
  //     >
  //       <meshStandardMaterial
  //         {...nodes.straightL.material}
  //         metalness={0}
  //         roughness={0.8}
  //         wireframe={wireframe}
  //         side={THREE.DoubleSide}
  //         map={test}
  //         shadowSide={THREE.FrontSide}
  //         emissiveIntensity={emissiveIntensity}
  //         emissive={color}
  //       />
  //     </mesh>
  //     {/**TIE LEFT */}
  //     <mesh
  //       layers={2}
  //       layers={2}
  //       layers={2}
  //       name="tie"
  //       ref={tieL}
  //       geometry={nodes.tieL.geometry}
  //       morphTargetDictionary={nodes.tieL.morphTargetDictionary}
  //       morphTargetInfluences={nodes.tieL.morphTargetInfluences}
  //     >
  //       <meshStandardMaterial
  //         {...nodes.tieL.material}
  //         metalness={0}
  //         roughness={0.8}
  //         side={THREE.DoubleSide}
  //         map={hello}
  //         wireframe={wireframe}
  //         shadowSide={THREE.BackSide}
  //         emissiveIntensity={emissiveIntensity}
  //         emissive={color}
  //       />
  //     </mesh>
  //     <mesh
  //       layers={2}
  //       layers={2}
  //       layers={2}
  //       name="tieL"
  //       ref={tieL}
  //       geometry={nodes.tieL.geometry}
  //       morphTargetDictionary={nodes.tieL.morphTargetDictionary}
  //       morphTargetInfluences={nodes.tieL.morphTargetInfluences}
  //     >
  //       <meshStandardMaterial
  //         {...nodes.tieL.material}
  //         metalness={0}
  //         roughness={0.8}
  //         side={THREE.DoubleSide}
  //         map={test}
  //         wireframe={wireframe}
  //         shadowSide={THREE.FrontSide}
  //         emissiveIntensity={emissiveIntensity}
  //         emissive={color}
  //       />
  //     </mesh>
  //     {/**90 LEFT */}
  //     <mesh
  //       layers={2}
  //       layers={2}
  //       layers={2}
  //       name="90L"
  //       ref={m90L}
  //       geometry={nodes["90L"].geometry}
  //       morphTargetDictionary={nodes["90L"].morphTargetDictionary}
  //       morphTargetInfluences={nodes["90L"].morphTargetInfluences}
  //     >
  //       <meshStandardMaterial
  //         {...nodes["90L"].material}
  //         metalness={0}
  //         roughness={0.8}
  //         side={THREE.DoubleSide}
  //         map={hello}
  //         wireframe={wireframe}
  //         shadowSide={THREE.BackSide}
  //         emissiveIntensity={emissiveIntensity}
  //         emissive={color}
  //       />
  //     </mesh>
  //     <mesh
  //       layers={2}
  //       layers={2}
  //       layers={2}
  //       name="90L"
  //       ref={m90L}
  //       geometry={nodes["90L"].geometry}
  //       morphTargetDictionary={nodes["90L"].morphTargetDictionary}
  //       morphTargetInfluences={nodes["90L"].morphTargetInfluences}
  //     >
  //       <meshStandardMaterial
  //         {...nodes["90L"].material}
  //         metalness={0}
  //         roughness={0.8}
  //         side={THREE.DoubleSide}
  //         map={test}
  //         wireframe={wireframe}
  //         shadowSide={THREE.FrontSide}
  //         emissiveIntensity={emissiveIntensity}
  //         emissive={color}
  //       />
  //     </mesh>
  //     {/**TOP LEFT */}
  //     <mesh
  //       layers={2}
  //       layers={2}
  //       layers={2}
  //       name="topL"
  //       ref={topL}
  //       geometry={nodes.topL.geometry}
  //       morphTargetDictionary={nodes.topL.morphTargetDictionary}
  //       morphTargetInfluences={nodes.topL.morphTargetInfluences}
  //     >
  //       <meshStandardMaterial
  //         {...nodes.topL.material}
  //         metalness={0}
  //         roughness={0.8}
  //         side={THREE.DoubleSide}
  //         map={hello}
  //         wireframe={wireframe}
  //         shadowSide={THREE.BackSide}
  //         emissiveIntensity={emissiveIntensity}
  //         emissive={color}
  //       />
  //     </mesh>
  //     <mesh
  //       layers={2}
  //       layers={2}
  //       layers={2}
  //       name="topL"
  //       ref={topL}
  //       geometry={nodes.topL.geometry}
  //       morphTargetDictionary={nodes.topL.morphTargetDictionary}
  //       morphTargetInfluences={nodes.topL.morphTargetInfluences}
  //     >
  //       <meshStandardMaterial
  //         {...nodes.topL.material}
  //         metalness={0}
  //         roughness={0.8}
  //         side={THREE.DoubleSide}
  //         map={test}
  //         wireframe={wireframe}
  //         shadowSide={THREE.FrontSide}
  //         emissiveIntensity={emissiveIntensity}
  //         emissive={color}
  //       />
  //     </mesh>
  //   </group>
  // );

  return (
    <group
      ref={plane}
      layers={2}
      scale={[scaleFactor, scaleFactor, scaleFactor]}
      position={[positionX, positionY, positionZ]}
      rotation={[rotationX, rotationY, rotationZ]}
      {...props}
      dispose={null}
    >
      {/**TOP LEFT */}

      <mesh
        layers={2}
        name="topL"
        geometry={nodes.topL.geometry}
        morphTargetDictionary={nodes.topL.morphTargetDictionary}
        morphTargetInfluences={nodes.topL.morphTargetInfluences}
      >
        <meshStandardMaterial
          {...nodes.topL.material}
          metalness={0}
          roughness={0.8}
          side={THREE.BackSide}
          shadowSide={THREE.BackSide}
          emissive={color}
          color={color}
          emissiveIntensity={emissiveIntensity}
          map={test}
        />
      </mesh>
      <mesh
        layers={2}
        name="topL"
        geometry={nodes.topL.geometry}
        morphTargetDictionary={nodes.topL.morphTargetDictionary}
        morphTargetInfluences={nodes.topL.morphTargetInfluences}
      >
        <meshStandardMaterial
          {...nodes.topL.material}
          metalness={0}
          wireframe={wireframe}
          side={THREE.FrontSide}
          shadowSide={THREE.FrontSide}
          roughness={0.8}
          emissive={color}
          map={hello}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>

      {/**90 LEFT */}

      <mesh
        layers={2}
        name="90L"
        geometry={nodes["90L"].geometry}
        morphTargetDictionary={nodes["90L"].morphTargetDictionary}
        morphTargetInfluences={nodes["90L"].morphTargetInfluences}
      >
        <meshStandardMaterial
          {...nodes["90L"].material}
          metalness={0}
          roughness={0.8}
          side={THREE.FrontSide}
          map={hello}
          wireframe={wireframe}
          shadowSide={THREE.FrontSide}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      <mesh
        layers={2}
        name="90L"
        geometry={nodes["90L"].geometry}
        morphTargetDictionary={nodes["90L"].morphTargetDictionary}
        morphTargetInfluences={nodes["90L"].morphTargetInfluences}
      >
        <meshStandardMaterial
          {...nodes["90L"].material}
          metalness={0}
          roughness={0.8}
          side={THREE.BackSide}
          map={test}
          wireframe={wireframe}
          shadowSide={THREE.BackSide}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>

      {/** TIE LEFT */}

      <mesh
        layers={2}
        name="tieL"
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
          emissive={color}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      <mesh
        layers={2}
        name="tieL"
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
          map={hello}
          shadowSide={THREE.FrontSide}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>

      {/** STRAIGHT LEFT */}

      <mesh
        layers={2}
        name="sL"
        geometry={nodes.sL.geometry}
        morphTargetDictionary={nodes.sL.morphTargetDictionary}
        morphTargetInfluences={nodes.sL.morphTargetInfluences}
      >
        <meshStandardMaterial
          {...nodes.sL.material}
          metalness={0}
          roughness={0.8}
          wireframe={wireframe}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      <mesh
        layers={2}
        name="sL"
        geometry={nodes.sL.geometry}
        morphTargetDictionary={nodes.sL.morphTargetDictionary}
        morphTargetInfluences={nodes.sL.morphTargetInfluences}
      >
        <meshStandardMaterial
          {...nodes.sL.material}
          metalness={0}
          roughness={0.8}
          side={THREE.BackSide}
          map={test}
          wireframe={wireframe}
          shadowSide={THREE.BackSide}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>

      {/**STRAIGHT RIGHT */}

      <mesh
        layers={2}
        name="sR"
        geometry={nodes.sR.geometry}
        morphTargetDictionary={nodes.sR.morphTargetDictionary}
        morphTargetInfluences={nodes.sR.morphTargetInfluences}
      >
        <meshStandardMaterial
          {...nodes.sR.material}
          metalness={0}
          roughness={0.8}
          side={THREE.DoubleSide}
          map={hello}
          wireframe={wireframe}
          shadowSide={THREE.BackSide}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      <mesh
        layers={2}
        name="sR"
        geometry={nodes.sR.geometry}
        morphTargetDictionary={nodes.sR.morphTargetDictionary}
        morphTargetInfluences={nodes.sR.morphTargetInfluences}
      >
        <meshStandardMaterial
          {...nodes.sR.material}
          metalness={0}
          roughness={0.8}
          side={THREE.DoubleSide}
          wireframe={wireframe}
          shadowSide={THREE.FrontSide}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>

      {/**TIE R */}

      <mesh
        layers={2}
        name="tieR"
        geometry={nodes.tieR.geometry}
        morphTargetDictionary={nodes.tieR.morphTargetDictionary}
        morphTargetInfluences={nodes.tieR.morphTargetInfluences}
      >
        <meshStandardMaterial
          {...nodes.tieR.material}
          metalness={0}
          roughness={0.8}
          side={THREE.DoubleSide}
          map={hello}
          wireframe={wireframe}
          shadowSide={THREE.BackSide}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      <mesh
        layers={2}
        name="tieR"
        geometry={nodes.tieR.geometry}
        morphTargetDictionary={nodes.tieR.morphTargetDictionary}
        morphTargetInfluences={nodes.tieR.morphTargetInfluences}
      >
        <meshStandardMaterial
          {...nodes.tieR.material}
          metalness={0}
          roughness={0.8}
          side={THREE.DoubleSide}
          wireframe={wireframe}
          shadowSide={THREE.FrontSide}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>

      {/**90 RIGHt */}

      <mesh
        layers={2}
        name="90R"
        geometry={nodes["90R"].geometry}
        morphTargetDictionary={nodes["90R"].morphTargetDictionary}
        morphTargetInfluences={nodes["90R"].morphTargetInfluences}
      >
        <meshStandardMaterial
          {...nodes["90R"].material}
          metalness={0}
          roughness={0.8}
          side={THREE.DoubleSide}
          map={hello}
          wireframe={wireframe}
          shadowSide={THREE.BackSide}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      <mesh
        layers={2}
        name="90R"
        geometry={nodes["90R"].geometry}
        morphTargetDictionary={nodes["90R"].morphTargetDictionary}
        morphTargetInfluences={nodes["90R"].morphTargetInfluences}
      >
        <meshStandardMaterial
          {...nodes["90R"].material}
          metalness={0}
          roughness={0.8}
          side={THREE.DoubleSide}
          wireframe={wireframe}
          shadowSide={THREE.FrontSide}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>

      {/**TOP R */}

      <mesh
        layers={2}
        name="topR"
        geometry={nodes.topR.geometry}
        morphTargetDictionary={nodes.topR.morphTargetDictionary}
        morphTargetInfluences={nodes.topR.morphTargetInfluences}
      >
        <meshStandardMaterial
          {...nodes.topR.material}
          metalness={0}
          roughness={0.8}
          side={THREE.DoubleSide}
          wireframe={wireframe}
          shadowSide={THREE.BackSide}
          emissive={color}
          map={hello}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      <mesh
        layers={2}
        name="topR"
        geometry={nodes.topR.geometry}
        morphTargetDictionary={nodes.topR.morphTargetDictionary}
        morphTargetInfluences={nodes.topR.morphTargetInfluences}
      >
        <meshStandardMaterial
          {...nodes.topR.material}
          metalness={0}
          roughness={0.8}
          side={THREE.DoubleSide}
          wireframe={wireframe}
          shadowSide={THREE.FrontSide}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
    </group>
  );

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
      <mesh name="1" layers={2}>
        <bufferGeometry {...nodes.Plane.geometry} />
        <meshStandardMaterial
          {...nodes.Plane.material}
          metalness={0}
          roughness={0.8}
          side={THREE.BackSide}
          shadowSide={THREE.BackSide}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
          map={test}
        />
      </mesh>
      <mesh name="1" layers={2}>
        <bufferGeometry {...nodes.Plane.geometry} />
        <meshStandardMaterial
          {...nodes.Plane.material}
          side={THREE.FrontSide}
          metalness={0}
          roughness={0.8}
          emissive={color}
          shadowSide={THREE.FrontSide}
          emissiveIntensity={emissiveIntensity}
          map={hello}
        />
      </mesh>
    </group>
  );
};

export default Plane;

useGLTF.preload("/plane.glb");
