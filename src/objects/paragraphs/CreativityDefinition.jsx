import { useRef, useEffect } from "react";
import { Html } from "@react-three/drei";

import useStore from "../../store";

function CreativityDefiniton() {
  const creativityDef = useRef();

  useEffect(() => {
    const unsubscribeProgress = useStore.subscribe(
      (state) => state.world,
      ({ progress }) => {
        if (progress > 27300 && progress < 33611) {
          if (creativityDef.current) {
            creativityDef.current.style.opacity = 1;
          }
        } else {
          if (creativityDef.current) {
            creativityDef.current.style.opacity = 0;
          }
        }
      }
    );

    return () => {
      unsubscribeProgress();
    };
  }, []);

  return (
    <Html
      ref={creativityDef}
      style={{ opacity: 0 }}
      transform
      position={[170, 12, 430]}
      scale={[3, 3, 3]}
    >
      <h1 style={{ color: "white" }}>Creativity</h1>
      <h2 style={{ color: "white" }}>/ˌkriːeɪˈtɪvɪti/</h2>
      <h3 style={{ color: "white" }}>
        The special ingredient to problem solving
      </h3>
      <p style={{ color: "white" }}>Providing solutions is good</p>
      <p style={{ color: "white" }}>
        But providing solutions in fashion is better
      </p>
      <p style={{ color: "white" }}>
        Being creative has helped me build and optimise
      </p>
      <p style={{ color: "white" }}>
        some of the projects that you're about to see
      </p>
      <p style={{ color: "white" }}>For more, keep scrolling</p>
      {/* <div style={{ width: "100%", height: 2, color: "white" }} />
      <p style={{ color: "white" }}>
        "Brain Model" (https://skfb.ly/WB6J) by likesenape is licensed under
        Creative Commons Attribution
        (http://creativecommons.org/licenses/by/4.0/).
      </p> */}
    </Html>
  );
}

export default CreativityDefiniton;
