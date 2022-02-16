import { Suspense } from "react";
import { Stats } from "@react-three/drei";

import Everything from "../Starter";
import TestPlane from "../TestOnlyPlane";
import Sheet from "../Sheet";
import Loading from "../Loading";
import Effect from "../../postprocessing";
import AnimHandler from "../animHandler";

const World = () => {
  return (
    <>
      <Effect />
      <Stats />
      <AnimHandler />
      <Suspense fallback={null}>
        <Loading />
        <Everything />
        <TestPlane />
        <Sheet />
      </Suspense>
      <directionalLight intensity={1} position={[2, 1, 697]} color="white" />
    </>
  );
};

export default World;
