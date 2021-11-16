import React, { useRef } from "react";
import { PointLightHelper } from "three";
import { useHelper } from "@react-three/drei";
import { useControls } from "leva";

function PointLight() {
  const pointLight = useRef();
  useHelper(pointLight, PointLightHelper, 10, "hotPink");

  /**
   * PointLight controls
   */
  const { positionX, positionY, positionZ, color, intensity, decay, distance } =
    useControls("pointLight", {
      color: "#f2eecb",
      intensity: {
        min: 0.01,
        value: 3,
        step: 0.01,
        max: 500,
      },
      decay: {
        min: 0,
        max: 2,
        step: 0.01,
        value: 2,
      },
      distance: {
        min: -500,
        max: 500,
        step: 1,
        value: 300,
      },
      positionX: {
        min: -500,
        max: 500,
        step: 10,
        value: -110,
      },
      positionY: {
        min: -500,
        max: 500,
        step: 10,
        value: 90,
      },
      positionZ: {
        min: -500,
        max: 500,
        step: 10,
        value: -30,
      },
    });

  return (
    <pointLight
      ref={pointLight}
      layers={2}
      position={[positionX, positionY, positionZ]}
      color={color}
      intensity={intensity}
      distance={distance}
      castShadow={true}
      decay={decay}
    />
  );
}

export default PointLight;
