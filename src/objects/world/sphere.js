import React, { useEffect, useState, useRef, forwardRef } from "react";
import * as THREE from "three";
import { useControls } from "leva";
import noiseShader from "../shaders/noiseShader";

const Sphere = forwardRef(
  ({ name = "sphere", offset = 0, wireframe = false }, sphere) => {
    const material = useRef();

    let materialShader;

    /**
     * Sphere Controls
     */

    useEffect(() => {
      console.log("material", material.current);
    });

    const {
      radius,
      detail,
      color,
      polygonOffsetFactor,
      polygonOffsetUnits,
      opacity,
      positionX,
      positionY,
      positionZ,
      wireframeLinewidth,
      wireframeLinecap,
      wireframeLinejoin,
      roughness,
    } = useControls(`${name}`, {
      noiseFactor: {
        value: 0.0,
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
      radius: {
        value: 199,
        min: 1,
        max: 500,
        step: 10,
      },
      detail: {
        value: 160,
        min: 1,
        max: 500,
        step: 0.5,
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
      positionX: {
        value: 0,
        min: -100,
        max: 100,
        step: 0.01,
      },
      positionY: {
        value: 0,
        min: -100,
        max: 100,
        step: 0.01,
      },
      positionZ: {
        value: 10,
        min: -100,
        max: 100,
        step: 0.01,
      },
      rotationX: {
        value: 0,
        step: Math.PI / 4,
        min: -1000,
        max: 1000,
        onChange: (val) => sphere.current && sphere.current.rotateX(val),
      },
      rotationY: {
        value: 0,
        step: Math.PI / 4,
        min: -1000,
        max: 1000,
        onChange: (val) => sphere.current && sphere.current.rotateY(val),
      },
      rotationZ: {
        value: 0,
        step: Math.PI / 4,
        min: -1000,
        max: 1000,
        onChange: (val) => sphere.current && sphere.current.rotateZ(val),
      },
    });

    return (
      <mesh
        // receiveShadow={true}
        /**
          scale={(viewport.width / 5) * (active ? 1.5 : 1)} so it's scalable
        */
        position={[positionX, positionY, positionZ]}
        ref={sphere}
      >
        <icosahedronBufferGeometry args={[radius + offset, detail]} />
        <meshStandardMaterial
          ref={material}
          side={THREE.DoubleSide}
          color={color}
          flatShading={!wireframe}
          wireframe={wireframe}
          // map={texture}
          opacity={opacity}
          onBeforeCompile={(shader) => {
            console.log("SHADEr", shader);

            // The perlin noise code goes here, above the main() function in the shader.
            // Noise shader from https://github.com/ashima/webgl-noise.
            shader.vertexShader = shader.vertexShader.replace(
              "#include <uv_pars_vertex>",
              noiseShader
            );
            /**
             * Adding controls to existing glsl.
             */
            shader.uniforms = {
              ...shader.uniforms,
              uNoiseFactor: {
                //80.0
                value: 0,
              },
              uPosotionNoiseFactor: {
                //5.0
                value: 0,
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
        />
      </mesh>
    );
  }
);

export default Sphere;
