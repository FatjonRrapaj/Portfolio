import React from "react";
import { useControls } from "leva";

function DirectionalLight() {
  const { intensity, color, x, y, z } = useControls("DirectionalLight", {
    color: "#FFFFFF",
    intensity: {
      min: 0.05,
      max: 100,
      step: 0.1,
      value: 2,
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
      layers={2}
      intensity={intensity}
    />
  );
}

export default DirectionalLight;
