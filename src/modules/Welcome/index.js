import React from "react";
import { Html } from "@react-three/drei";
import { useControls } from "leva";

import { Comment, Text } from "../components";

function Welcome() {
  /**
   * Landing Text Controls
   */

  const { x, y, z, rX, rY, rZ } = useControls("Landing TXT", {
    x: {
      min: -100,
      max: 100,
      value: 0,
      step: 0.1,
    },
    y: {
      min: -100,
      max: 100,
      value: 0,
      step: 0.1,
    },
    z: {
      min: -100,
      max: 100,
      value: 100,
      step: 0.1,
    },
    rX: {
      min: -100,
      max: 100,
      value: 0,
      step: Math.PI / 4,
    },
    rY: {
      min: -100,
      max: 100,
      value: 0,
      step: Math.PI / 4,
    },
    rZ: {
      min: -100,
      max: 100,
      value: 0,
      step: Math.PI / 4,
    },
  });

  return (
    <Html
      prepend
      transform
      position={[-window.innerWidth, y, z]}
      scale={[100, 100, 100]}
      rotation={[rX, rY, rZ]}
    >
      <Comment>&emsp;//Intro</Comment>
      <br />
      <Text>
        &ensp;`Hello,I'm Fatjon
        <br />
        &ensp; A Web and Mobile developer
        <br />
        &ensp; with 4+ years of experience`
      </Text>
    </Html>
  );
}

export default Welcome;
