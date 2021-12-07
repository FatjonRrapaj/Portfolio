import React from "react";
import { useControls } from "leva";

function DirectionalLight({ layers = 2, name = "DirectionalLight" }) {
  const { intensity, color, x, y, z } = useControls(name, {
    color: "#FFFFFF",
    intensity: {
      min: 0.05,
      max: 100,
      step: 0.1,
      value: 1,
    },
    x: {
      min: -1000,
      max: 1000,
      value: 0,
      step: 0.1,
    },
    y: {
      min: -1000,
      max: 1000,
      value: 0,
      step: 0.1,
    },
    z: {
      min: -1000,
      max: 1000,
      value: 100,
      step: 0.1,
    },
  });

  return (
    <directionalLight
      position={[x, y, z]}
      color={color}
      castShadow={true}
      layers={layers}
      intensity={intensity}
    />
  );
}

export default DirectionalLight;
