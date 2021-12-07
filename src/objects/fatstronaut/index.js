/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

import useStore from "../../store";
import { nameOf } from "../../helpers/string";

export default function Fatstronaut({ ...props }) {
  useEffect(() => {
    const unsubscribeFatscronaut = useStore.subscribe(
      (state) => state.fatstronaut,
      ({ position, rotation, scaleFactor, lastChanged }) => {
        switch (lastChanged) {
          case nameOf(position):
            break;
          case nameOf(rotation):
            break;
          case nameOf(scaleFactor):
            break;

          default:
            break;
        }
      }
    );

    return () => {
      unsubscribeFatscronaut();
    };
  }, []);

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y -= 0.003;
    }
  });

  const group = useRef();
  const { nodes, materials } = useGLTF("/fatstronaut.glb");
  return (
    <group scale={[4, 4, 4]} ref={group} {...props} dispose={null}>
      <mesh
        layers={3}
        geometry={nodes.body.geometry}
        material={materials["Material.001"]}
      />
      <group
        position={[0.11, 3.19, -1.44]}
        rotation={[0.02, -0.01, 0.02]}
        scale={0.92}
      >
        <mesh
          layers={3}
          geometry={nodes.Sphere008.geometry}
          material={nodes.Sphere008.material}
        />
        <mesh
          layers={3}
          geometry={nodes.Sphere008_1.geometry}
          material={materials.specchio}
        />
      </group>
      <mesh
        layers={3}
        geometry={nodes.feet.geometry}
        material={nodes.feet.material}
      />
      <mesh
        layers={3}
        geometry={nodes._tubes.geometry}
        material={nodes._tubes.material}
        position={[0.63, 4.16, -0.09]}
        rotation={[0.14, -1.24, 0.7]}
        scale={0.36}
      />
      <mesh
        layers={3}
        geometry={nodes.wearableTubes.geometry}
        material={nodes.wearableTubes.material}
        position={[0.11, 3.31, -1.5]}
        rotation={[0.02, -0.01, 0.02]}
        scale={0.87}
      />
      <mesh
        layers={3}
        geometry={nodes.jet.geometry}
        material={nodes.jet.material}
        position={[0.1, 3.08, -2.15]}
        rotation={[1.59, 0.02, 0.01]}
        scale={[0.79, 1.01, 1.01]}
      />
      <mesh
        layers={3}
        geometry={nodes.triangulatedTubes.geometry}
        material={materials["tuta metallico.001"]}
        position={[0.63, 4.16, -0.09]}
        rotation={[0.14, -1.24, 0.7]}
        scale={0.36}
      />
      <mesh
        layers={3}
        geometry={nodes.leftHand.geometry}
        material={nodes.leftHand.material}
      />
    </group>
  );
}

useGLTF.preload("/fatstronaut.glb");
