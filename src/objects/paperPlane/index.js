import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { act, useFrame, useLoader } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useControls } from "leva";
import anime from "animejs/lib/anime.es.js";

import { lerp } from "../../helpers/animation";

const Plane = ({ ...props }) => {
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
      step: 0.1,
      min: -1000,
      max: 1000,
    },
    wireframe: false,
  });

  const plane = useRef();

  const divContainer = document.querySelector(".scrollContainer");
  var percentage = 0;
  var scrollY = 0;
  var event = {
    y: 0,
    deltaY: 0,
  };
  var maxHeight =
    (divContainer.clientHeight || divContainer.offsetHeight) -
    window.innerHeight;

  const { nodes, materials, animations } = useGLTF("/plane.glb");
  console.log("nodes: ", nodes);
  const { actions } = useAnimations(animations, plane);

  useEffect(() => {
    actions?.fold.setDuration(3000);
    actions.fold.clampWhenFinished = true;
    actions?.fold.play();
  });

  function onWheel2(e) {
    e.stopImmediatePropagation();
    e.preventDefault();
    e.stopPropagation();
    var evt = event;
    evt.deltaY = e.wheelDeltaY || e.deltaY * -1;
    // reduce by half the delta amount otherwise it scroll too fast
    evt.deltaY *= 0.5;
    scroll(e);
  }

  function scroll(e) {
    var evt = event;
    // limit scroll top
    if (evt.y + evt.deltaY > 0) {
      evt.y = 0;
      // limit scroll bottom
    } else if (-(evt.y + evt.deltaY) >= maxHeight) {
      evt.y = -maxHeight;
    } else {
      evt.y += evt.deltaY;
    }

    scrollY = -evt.y;

    percentage = lerp(percentage, scrollY, 0.08);
    actions?.fold?._mixer.setTime(percentage / 2);
  }

  useEffect(() => {
    divContainer.addEventListener("wheel", onWheel2, true);
  }, []);

  const hello = useLoader(THREE.TextureLoader, "/test.jpg");
  hello.flipY = false;
  hello.offset.x = -0.1;
  hello.offset.y = 0.1;

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
        layers={2}
        name="topR"
        translateX
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
          emissive={color}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      <mesh
        layers={2}
        name="topR"
        translateX={10}
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
          emissive={color}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      {/**90 RIGHT */}
      <mesh
        layers={2}
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
          polygonOffset={true}
          shadowSide={THREE.BackSide}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      <mesh
        layers={2}
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
          polygonOffset={true}
          shadowSide={THREE.FrontSide}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      {/**TIE RIGHT */}
      <mesh
        layers={2}
        layers={2}
        name="tieR"
        ref={tieR}
        // geometry={nodes.tieR.geometry}
        morphTargetDictionary={nodes.tieR.morphTargetDictionary}
        morphTargetInfluences={nodes.tieR.morphTargetInfluences}
      >
        <bufferGeometry
          {...nodes.tieR.geometry}
          onUpdate={(self) => (self.verticesNeedUpdate = true)}
        />
        <meshStandardMaterial
          {...nodes.tieR.material}
          metalness={0}
          roughness={0.8}
          side={THREE.BackSide}
          map={hello}
          wireframe={wireframe}
          shadowSide={THREE.BackSide}
          emissiveIntensity={emissiveIntensity}
          emissive={color}
        />
      </mesh>
      <mesh
        layers={2}
        layers={2}
        name="tieR"
        ref={tieR}
        geometry={nodes.tieR.geometry}
        matrixWorldNeedsUpdate={true}
        morphTargetDictionary={nodes.tieR.morphTargetDictionary}
        morphTargetInfluences={nodes.tieR.morphTargetInfluences}
      >
        <bufferGeometry
          {...nodes.tieR.geometry}
          onUpdate={(self) => (self.verticesNeedUpdate = true)}
        />
        <meshStandardMaterial
          {...nodes.tieR.material}
          metalness={0}
          roughness={0.8}
          side={THREE.FrontSide}
          wireframe={wireframe}
          shadowSide={THREE.FrontSide}
          emissiveIntensity={emissiveIntensity}
          emissive={color}
        />
      </mesh>
      {/**STRAIGHT RIGHT */}
      <mesh
        layers={2}
        layers={2}
        matrixAutoUpdate={false}
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
          emissiveIntensity={emissiveIntensity}
          emissive={color}
        />
      </mesh>
      <mesh
        layers={2}
        layers={2}
        name="straightR"
        ref={straightR}
        geometry={nodes.straightR.geometry}
        matrixAutoUpdate={false}
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
          emissiveIntensity={emissiveIntensity}
          emissive={color}
        />
      </mesh>

      {/**STRAIGHT LEFT */}

      <mesh
        layers={2}
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
          emissiveIntensity={emissiveIntensity}
          emissive={color}
        />
      </mesh>
      <mesh
        layers={2}
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
          emissiveIntensity={emissiveIntensity}
          emissive={color}
        />
      </mesh>
      {/**TIE LEFT */}
      <mesh
        layers={2}
        layers={2}
        name="tie"
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
          emissiveIntensity={emissiveIntensity}
          emissive={color}
        />
      </mesh>
      <mesh
        layers={2}
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
          emissiveIntensity={emissiveIntensity}
          emissive={color}
        />
      </mesh>
      {/**90 LEFT */}
      <mesh
        layers={2}
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
          emissiveIntensity={emissiveIntensity}
          emissive={color}
        />
      </mesh>
      <mesh
        layers={2}
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
          emissiveIntensity={emissiveIntensity}
          emissive={color}
        />
      </mesh>
      {/**TOP LEFT */}
      <mesh
        layers={2}
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
          emissiveIntensity={emissiveIntensity}
          emissive={color}
        />
      </mesh>
      <mesh
        layers={2}
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
          emissiveIntensity={emissiveIntensity}
          emissive={color}
        />
      </mesh>
    </group>
  );
  // return (
  //   <group
  //     ref={plane}
  //     {...props}
  //     dispose={null}
  //     scale={[scaleFactor, scaleFactor, scaleFactor]}
  //     position={[positionX, positionY, positionZ]}
  //     rotation={[rotationX, rotationY, rotationZ]}
  //   >
  //     <mesh
  //       layers={2}
  //       name="tORF001"
  //       geometry={nodes.tORF001.geometry}
  //       material={nodes.tORF001.material}
  //       morphTargetDictionary={nodes.tORF001.morphTargetDictionary}
  //       morphTargetInfluences={nodes.tORF001.morphTargetInfluences}
  //     />
  //     <mesh
  //       layers={2}
  //       name="90RF001"
  //       geometry={nodes["90RF001"].geometry}
  //       material={nodes["90RF001"].material}
  //       morphTargetDictionary={nodes["90RF001"].morphTargetDictionary}
  //       morphTargetInfluences={nodes["90RF001"].morphTargetInfluences}
  //     />
  //     <mesh
  //       layers={2}
  //       name="tRF001"
  //       geometry={nodes.tRF001.geometry}
  //       material={nodes.tRF001.material}
  //       morphTargetDictionary={nodes.tRF001.morphTargetDictionary}
  //       morphTargetInfluences={nodes.tRF001.morphTargetInfluences}
  //     />
  //     <mesh
  //       layers={2}
  //       name="sRF001"
  //       geometry={nodes.sRF001.geometry}
  //       material={nodes.sRF001.material}
  //       morphTargetDictionary={nodes.sRF001.morphTargetDictionary}
  //       morphTargetInfluences={nodes.sRF001.morphTargetInfluences}
  //     />
  //     <mesh
  //       layers={2}
  //       name="sLF001"
  //       geometry={nodes.sLF001.geometry}
  //       material={nodes.sLF001.material}
  //       morphTargetDictionary={nodes.sLF001.morphTargetDictionary}
  //       morphTargetInfluences={nodes.sLF001.morphTargetInfluences}
  //     />
  //     <mesh
  //       layers={2}
  //       name="tLF001"
  //       geometry={nodes.tLF001.geometry}
  //       material={nodes.tLF001.material}
  //       morphTargetDictionary={nodes.tLF001.morphTargetDictionary}
  //       morphTargetInfluences={nodes.tLF001.morphTargetInfluences}
  //     />
  //     <mesh
  //       layers={2}
  //       name="90LF001"
  //       geometry={nodes["90LF001"].geometry}
  //       material={nodes["90LF001"].material}
  //       morphTargetDictionary={nodes["90LF001"].morphTargetDictionary}
  //       morphTargetInfluences={nodes["90LF001"].morphTargetInfluences}
  //     />
  //     <mesh
  //       layers={2}
  //       name="tOLF001"
  //       geometry={nodes.tOLF001.geometry}
  //       material={nodes.tOLF001.material}
  //       morphTargetDictionary={nodes.tOLF001.morphTargetDictionary}
  //       morphTargetInfluences={nodes.tOLF001.morphTargetInfluences}
  //     />
  //     <mesh
  //       layers={2}
  //       name="tORB001"
  //       geometry={nodes.tORB001.geometry}
  //       material={nodes.tORB001.material}
  //       morphTargetDictionary={nodes.tORB001.morphTargetDictionary}
  //       morphTargetInfluences={nodes.tORB001.morphTargetInfluences}
  //     />
  //     <mesh
  //       layers={2}
  //       name="90RB001"
  //       geometry={nodes["90RB001"].geometry}
  //       material={nodes["90RB001"].material}
  //       morphTargetDictionary={nodes["90RB001"].morphTargetDictionary}
  //       morphTargetInfluences={nodes["90RB001"].morphTargetInfluences}
  //     />
  //     <mesh
  //       layers={2}
  //       name="tRB001"
  //       geometry={nodes.tRB001.geometry}
  //       material={nodes.tRB001.material}
  //       morphTargetDictionary={nodes.tRB001.morphTargetDictionary}
  //       morphTargetInfluences={nodes.tRB001.morphTargetInfluences}
  //     />
  //     <mesh
  //       layers={2}
  //       name="sRB001"
  //       geometry={nodes.sRB001.geometry}
  //       material={nodes.sRB001.material}
  //       morphTargetDictionary={nodes.sRB001.morphTargetDictionary}
  //       morphTargetInfluences={nodes.sRB001.morphTargetInfluences}
  //     />
  //     <mesh
  //       layers={2}
  //       name="sLB001"
  //       geometry={nodes.sLB001.geometry}
  //       material={nodes.sLB001.material}
  //       morphTargetDictionary={nodes.sLB001.morphTargetDictionary}
  //       morphTargetInfluences={nodes.sLB001.morphTargetInfluences}
  //     />
  //     <mesh
  //       layers={2}
  //       name="tLB001"
  //       geometry={nodes.tLB001.geometry}
  //       material={nodes.tLB001.material}
  //       morphTargetDictionary={nodes.tLB001.morphTargetDictionary}
  //       morphTargetInfluences={nodes.tLB001.morphTargetInfluences}
  //     />
  //     <mesh
  //       layers={2}
  //       name="90LB001"
  //       geometry={nodes["90LB001"].geometry}
  //       material={nodes["90LB001"].material}
  //       morphTargetDictionary={nodes["90LB001"].morphTargetDictionary}
  //       morphTargetInfluences={nodes["90LB001"].morphTargetInfluences}
  //     />
  //     <mesh
  //       layers={2}
  //       name="tOLB001"
  //       geometry={nodes.tOLB001.geometry}
  //       material={nodes.tOLB001.material}
  //       morphTargetDictionary={nodes.tOLB001.morphTargetDictionary}
  //       morphTargetInfluences={nodes.tOLB001.morphTargetInfluences}
  //     />
  //   </group>
  // );
};

export default Plane;

useGLTF.preload("/plane.glb");
