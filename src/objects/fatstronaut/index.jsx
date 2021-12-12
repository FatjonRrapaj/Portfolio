/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export default function Fatstronaut({ ...props }) {
  const group = useRef();

  const { nodes, materials, scene } = useGLTF("fatstronaut.glb");

  useEffect(() => {
    //center gltf
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());

    scene.position.x += scene.position.x - center.x;
    scene.position.y += scene.position.y - center.y;
    scene.position.z += scene.position.z - center.z;
  }, []);

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = group.current.rotation.z =
        Math.sin(clock.getElapsedTime() * 0.07) * 0.7;
    }
  });

  return (
    <group
      position={[-200, 0, 500]}
      scale={[4, 4, 4]}
      ref={group}
      {...props}
      dispose={null}
    >
      <mesh
        layers={2}
        geometry={nodes.body.geometry}
        material={materials["Material.001"]}
      />
      <group
        position={[0.11, 3.19, -1.44]}
        rotation={[0.02, -0.01, 0.02]}
        scale={0.92}
      >
        <mesh
          layers={2}
          geometry={nodes.Sphere008.geometry}
          material={nodes.Sphere008.material}
        />
        <mesh
          layers={2}
          geometry={nodes.Sphere008_1.geometry}
          material={materials.specchio}
        />
      </group>
      <mesh
        layers={2}
        geometry={nodes.feet.geometry}
        material={nodes.feet.material}
      />
      <mesh
        layers={2}
        geometry={nodes._tubes.geometry}
        material={nodes._tubes.material}
        position={[0.63, 4.16, -0.09]}
        rotation={[0.14, -1.24, 0.7]}
        scale={0.36}
      />
      <mesh
        layers={2}
        geometry={nodes.wearableTubes.geometry}
        material={nodes.wearableTubes.material}
        position={[0.11, 3.31, -1.5]}
        rotation={[0.02, -0.01, 0.02]}
        scale={0.87}
      />
      <mesh
        layers={2}
        geometry={nodes.jet.geometry}
        material={nodes.jet.material}
        position={[0.1, 3.08, -2.15]}
        rotation={[1.59, 0.02, 0.01]}
        scale={[0.79, 1.01, 1.01]}
      />
      <mesh
        layers={2}
        geometry={nodes.triangulatedTubes.geometry}
        material={materials["tuta metallico.001"]}
        position={[0.63, 4.16, -0.09]}
        rotation={[0.14, -1.24, 0.7]}
        scale={0.36}
      />
      <mesh
        layers={2}
        geometry={nodes.leftHand.geometry}
        material={nodes.leftHand.material}
      />
    </group>
  );
}

useGLTF.preload("fatstronaut.glb");
