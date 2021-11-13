import React, { useRef } from "react";
import * as THREE from "three";
import { useControls } from "leva";
import { Billboard } from "@react-three/drei";

import noiseShader from "../shaders/noiseShader";

function Plane({ wireframe = false, offset = 0 }) {
  /**
   * TestCubeControls
   */
  const floor = useRef();
  let materialShader = null;

  const {
    x,
    y,
    z,
    width,
    height,
    widthSegments,
    heightSegments,
    rotationX,
    rotationY,
    rotationZ,
    color,
    polygonOffsetFactor,
    polygonOffsetUnits,
    opacity,
    wireframeLinewidth,
    wireframeLinecap,
    wireframeLinejoin,
    roughness,
  } = useControls("plane", {
    noiseFactor: {
      value: 80.0,
      min: 0.0,
      max: 500.0,
      onChange: function onNoiseFactorChange(n) {
        if (materialShader) {
          materialShader.uniforms.uNoiseFactor.value = n.toFixed(1);
        }
      },
    },

    uPosotionNoiseFactor: {
      value: 0.0,
      min: 0.0,
      max: 500.0,
      onChange: function onPositionNoiseFactorChange(n) {
        if (materialShader) {
          materialShader.uniforms.uPosotionNoiseFactor.value = n.toFixed(1);
        }
      },
    },
    x: { value: 0, min: -500, max: 500, step: 20 },
    y: { value: 140, min: -500, max: 500, step: 20 },
    z: { value: 160, min: -500, max: window.innerHeight * 0.7, step: 20 },
    width: { min: 0, max: 1000, value: window.innerWidth, step: 1 },
    height: { min: 0, max: 1000, value: window.innerHeight, step: 1 },
    widthSegments: { min: 0, max: 500, value: 200, step: 1 },
    heightSegments: { min: 0, max: 500, value: 200, step: 1 },
    depthSegments: { min: 0, max: 500, value: 200, step: 1 },
    rotationX: {
      min: -100 * Math.PI,
      max: 100 * Math.PI,
      value: -17.28,
      step: Math.PI / 4,
    },
    rotationY: {
      min: -100 * Math.PI,
      max: 100 * Math.PI,
      value: 0,
      step: Math.PI / 4,
    },
    rotationZ: {
      min: -100 * Math.PI,
      max: 100 * Math.PI,
      value: 0,
      step: Math.PI / 4,
    },

    opacity: {
      value: 1,
      max: 1,
      min: 0,
      step: 0.01,
    },
    polygonOffsetFactor: {
      min: -100,
      max: 100,
      step: 1,
      value: 1,
    },
    polygonOffsetUnits: {
      min: -100,
      max: 100,
      step: 1,
      value: 1,
    },
    wireframeLinewidth: {
      min: -100,
      max: 100,
      step: 1,
      value: 1,
    },
    wireframeLinecap: {
      options: {
        butt: "butt",
        round: "round",
        square: "square",
      },
      value: "round",
    },
    wireframeLinejoin: {
      options: {
        bevel: "bevel",
        round: "round",
        miter: "miter",
      },
      value: "round",
    },
    roughness: {
      value: 0.8,
      min: 0,
      max: 1,
      step: 0.01,
    },
    color: "#FFFFFF",
  });

  return (
    <mesh
      ref={floor}
      position={[x, y + offset, z]}
      rotation={[rotationX, rotationY, rotationZ]}
    >
      <meshBasicMaterial side={THREE.DoubleSide} color={color} />
      {/* <meshStandardMaterial
        side={THREE.DoubleSide}
        color={color}
        flatShading={!wireframe}
        wireframe={wireframe}
        opacity={opacity}
        onBeforeCompile={(shader) => {
          console.log("SHADEr", shader);

          // The perlin noise code goes here, above the main() function in the shader.
          // Noise shader from https://github.com/ashima/webgl-noise.
          shader.vertexShader = shader.vertexShader.replace(
            "#include <uv_pars_vertex>",
            noiseShader
          );
           //Adding controls to existing glsl.
          shader.uniforms = {
            ...shader.uniforms,
            uNoiseFactor: {
              value: 80.0,
            },
            uPosotionNoiseFactor: {
              value: 80.0,
            },
          };

          shader.vertexShader =
            "uniform float uNoiseFactor;\n" +
            "uniform float uPosotionNoiseFactor;\n" +
            shader.vertexShader;

          // The vertex shader code that goes inside main() needs to be separate from the perlin noise code.
          shader.vertexShader = shader.vertexShader.replace(
            "#include <worldpos_vertex>",
            `vUv = uv;
                noise = uNoiseFactor * turbulence(normal);
                float b = uPosotionNoiseFactor * pnoise(0.01 * position, vec3(100.0));
                float displacement = noise + b;
                vec3 newPosition = position + normal * displacement;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);`
          );

          materialShader = shader;
        }}
        transparent={opacity < 1}
        polygonOffset={wireframe}
        polygonOffsetFactor={polygonOffsetFactor}
        polygonOffsetUnits={polygonOffsetUnits}
        wireframeLinewidth={wireframeLinewidth}
        wireframeLinecap={wireframeLinecap}
        wireframeLinejoin={wireframeLinejoin}
        emissive={color}
        emissiveIntensity={wireframe ? 1 : 0.1}
        roughness={roughness}
        side={THREE.DoubleSide}
        color="red"
      /> */}
      <planeBufferGeometry
        args={[width, height, widthSegments, heightSegments]}
      />
    </mesh>
  );
}

export default Plane;
