import React from "react";
import { useControls } from "leva";

function DirectionalLight() {
  const { intensity, color } = useControls("DirectionalLight", {
    color: "#FFFFFF",
    intensity: {
      min: 0.1,
      max: 100,
      step: 0.1,
      value: 1,
    },
  });

  return <directionalLight color={color} intensity={intensity} />;
}

export default DirectionalLight;
