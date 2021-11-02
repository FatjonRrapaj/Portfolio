import React, { useEffect, useState, useRef } from "react";
import { useControls } from "leva";

function Floor() {
  const floor = useRef();

  /**
   * Floor Controls
   */
  const {
    width,
    height,
    depth,
    color,
    positionX,
    positionY,
    positionZ,
    wireframe,
  } = useControls("floor", {
    width: {
      value: 1,
      min: 0,
      max: 100,
      step: 1,
    },
    height: {
      value: 1,
      min: 0,
      max: 100,
      step: 1,
    },
    depth: {
      value: 1,
      min: 0,
      max: 100,
      step: 1,
    },
    color: "#00FF00",
    positionX: {
      value: 0,
      min: -100,
      max: 100,
      step: 0.1,
    },
    positionY: {
      value: 0,
      min: -100,
      max: 100,
      step: 0.1,
    },
    positionZ: {
      value: 0,
      min: -100,
      max: 100,
      step: 0.1,
    },
    rotationX: {
      value: 0,
      step: Math.PI / 4,
      min: -1000,
      max: 1000,
      onChange: (val) => floor.current && floor.current.rotateX(val),
    },
    rotationY: {
      value: 0,
      step: Math.PI / 4,
      min: -1000,
      max: 1000,
      onChange: (val) => floor.current && floor.current.rotateY(val),
    },
    rotationZ: {
      value: 0,
      step: Math.PI / 4,
      min: -1000,
      max: 1000,
      onChange: (val) => floor.current && floor.current.rotateZ(val),
    },
    wireframe: false,
  });

  return (
    <mesh position={[positionX, positionY, positionZ]} ref={floor}>
      <boxGeometry attach="geometry" args={[width, height, depth]} />
      <meshBasicMaterial wireframe={wireframe} color={color} />
    </mesh>
  );
}

export default Floor;

//NEWFLOOOR
import "./styles.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import noiseShader from "./noiseShader";
console.log(noiseShader);

//Canvas
const canvas = document.querySelector("canvas.webgl");

//Scene
const scene = new THREE.Scene();

/**
 * THE SPHERE
 */
const sphere = addSphere({
  radius: 199,
  color: 0x00d0ff,
  opacity: 1,
  wireframe: false,
});

/**
 * Wireframe Sphere
 */

const sphere2 = addSphere({
  radius: 199.05,
  color: 0x6600ff,
  opacity: 1,
  wireframe: true,
  emissive: true,
});

// const material = new THREE.MeshBasicMaterial({
//   color: "green",
//   wireframe: true
// });
// const geometry = new THREE.SphereBufferGeometry(1, 20, 20);
// const sphere = new THREE.Mesh(geometry, material);
// scene.add(sphere);

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.01,
  1500
);
camera.position.set(0, 11, 1);
camera.rotation.x = -0.3;
/**
 * Light
 */

let light = new THREE.PointLight(0xffffff, 1, 500);
light.position.set(100, 100, 100);
scene.add(light);

/**
 * OrbitControls
 */
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

//Clock
const clock = new THREE.Clock();

//addSphere

function addSkySphere() {
  let geometry = new THREE.IcosahedronGeometry(500, 50);
  let material = new THREE.MeshStandardMaterial({
    color: 0xfb00ff,
    flatShading: false,
    wireframe: true,
    emissive: 0xfb00ff,
    emissiveIntensity: 100,
  });
  material.side = THREE.DoubleSide;

  let mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 0, 0);
  scene.add(mesh);
  return mesh;
}

function addSphere({
  radius,
  detail = 150,
  color,
  opacity,
  emissive = false,
  wireframe = false,
}) {
  let geometry = new THREE.IcosahedronGeometry(radius, detail);
  let material = new THREE.MeshStandardMaterial({
    color,
    flatShading: !wireframe,
    opacity,
    transparent: opacity < 1,
    polygonOffset: wireframe,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
    wireframe,
    wireframeLinewidth: 1,
    emissive: color,
    emissiveIntensity: wireframe ? 1 : 0.1,
    roughness: 0.8,
  });

  material.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader.replace(
      "#include <uv_pars_vertex>",
      noiseShader
    );
    shader.vertexShader = shader.vertexShader.replace(
      "#include <worldpos_vertex>",
      `vUv = uv;
        noise = 80.0 * turbulence(normal);
        float b = 5.0 * pnoise(0.01 * position, vec3(100.0));
        float displacement = noise + b;
        vec3 newPosition = position + normal * displacement;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);`
    );
  };

  let mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, -195, -20);
  mesh.rotation.z = Math.PI;
  scene.add(mesh);
  return mesh;
}

let tick = 0;

//Animation function
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
  tick += 0.01;
  sphere.rotation.x += 0.002;
  sphere2.rotation.x += 0.002;
}

animate();
