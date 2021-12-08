import React, { forwardRef, Suspense, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";

import Text from "../components/text";

import {
  visibleHeightAtZDepth,
  visibleWidthAtZDepth,
} from "../../helpers/camera";

function Welcome(_, ref) {
  const { camera } = useThree();

  useEffect(() => {
    if (ref.current) {
      ref.current.position.set([
        visibleWidthAtZDepth(0, camera) / 2,
        visibleHeightAtZDepth(0, camera) / 2,
        500,
      ]);
    }
  }, [ref.current]);

  useFrame(({ clock }) => {
    if (ref.current)
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.4);
  });
  return (
    <group ref={ref}>
      <Suspense fallback={null}>
        <Text hAlign="right" position={[-12, 6.5, 0]} children="HelloFatjon" />
        <Text
          hAlign="right"
          position={[-12, 0, 0]}
          children="React JS and React Native Developer"
        />
      </Suspense>
    </group>
  );
}

export default forwardRef(Welcome);
