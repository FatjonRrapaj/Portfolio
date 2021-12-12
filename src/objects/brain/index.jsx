/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export default function Brain({ ...props }) {
  const brain = useRef();
  const brainMesh = useRef();
  const brainMeshWireframe = useRef();
  const { nodes, materials, scene } = useGLTF(
    process.env.PUBLIC_URL + "/brain.glb"
  );

  useEffect(() => {
    //center gltf
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());

    scene.position.x += scene.position.x - center.x;
    scene.position.y += scene.position.y - center.y;
    scene.position.z += scene.position.z - center.z;
  }, []);

  // let prevTime;
  useFrame(({ clock }) => {
    if (brain.current) {
      brain.current.rotation.y += 0.003;
      brain.current.position.y = Math.sin(clock.getElapsedTime() * 0.5);
    }
    // if (brainMesh.current && brainMeshWireframe.current) {
    //   let roundedTime = Math.round(clock.getElapsedTime());
    //   if (roundedTime % 2 === 0) {
    //     if (prevTime !== roundedTime) {
    //       const r = Math.floor(Math.random() * 255);
    //       const g = Math.floor(Math.random() * 255);
    //       const b = Math.floor(Math.random() * 255);
    //       const r1 = Math.floor(Math.random() * 255);
    //       const g1 = Math.floor(Math.random() * 255);
    //       const b1 = Math.floor(Math.random() * 255);
    //       const brainColor = new THREE.Color(`rgb(${r},${g},${b})`);
    //       console.log("brainColor: ", brainColor);
    //       const wireColor = new THREE.Color(`rgb(${r1},${g1},${b1})`);
    //       console.log("wireColor: ", wireColor);

    //       brainMesh.current.material.emissive = brainColor;
    //       brainMesh.current.material.color = brainColor;

    //       brainMeshWireframe.current.material.emissive = wireColor;
    //       brainMeshWireframe.current.material.color = wireColor;
    //     }
    //     prevTime = roundedTime;
    //   }
    // }
  });

  return (
    <group
      ref={brain}
      position={[200, 0, 450]}
      scale={[5, 5, 5]}
      {...props}
      dispose={null}
    >
      <mesh
        layers={1}
        scale={[1.001, 1.001, 1.001]}
        ref={brainMeshWireframe}
        geometry={nodes.brain.geometry}
      >
        <meshPhysicalMaterial
          {...materials.material}
          wireframe={true}
          roughness={0.2}
          metalness={0.2}
          color="#D98BB6"
          emissive="#D98BB6"
          emissiveIntensity={0.8}
        />
      </mesh>

      <mesh layers={1} ref={brainMesh} geometry={nodes.brain.geometry}>
        <meshPhysicalMaterial
          {...materials.material}
          transparent={false}
          wireframe={false}
          roughness={0.2}
          metalness={0.2}
          color="#071540"
          emissive="#071540"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload(process.env.PUBLIC_URL + "/brain.glb");
