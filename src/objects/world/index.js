import { Suspense, createRef } from "react";
import { Stats } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

import DirectionalLight from "../directionalLight";
import PointLight from "../pointLight";
import Floor from "../floor";
import Sky from "../sky";
import PaperPlane from "../paperPlane";

import Effect from "../../postprocessing";
import { useEffect } from "react/cjs/react.development";

const World = () => {
  const { camera } = useThree();

  const plane = createRef();
  const floor = createRef();

  const upadtePositions = () => {
    console.log("Updated");
    if (plane.current) {
      plane.current.position.x = 0;
    }
  };

  const onResize = () => {
    camera.updateProjectionMatrix();
    upadtePositions();
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <Floor ref={floor} />
      <Sky />
      <Suspense
        fallback={
          // <div
          //   style={{
          //     width: 50,
          //     height: 50,
          //     backgroundColor: "white",
          //     color: "black",
          //   }}
          // >
          //   Let's FLYYY
          // </div>
          null
        }
      >
        <PaperPlane ref={plane} />
      </Suspense>

      <DirectionalLight />
      {/* <PointLight /> */}
      <Effect />
      <Stats />
      <axesHelper args={[1000000]} />
    </>
  );
};

export default World;
