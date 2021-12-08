import { useRef, useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import anime from "animejs/lib/anime.es.js";

import useStore from "../../store";

function TimeDefinition() {
  const timeDef = useRef();

  useEffect(() => {
    const unsubscribeProgress = useStore.subscribe(
      (state) => state.world,
      ({ progress }) => {
        if (progress > 22000 && progress < 35000) {
          if (timeDef.current) {
            timeDef.current.style.opacity = 1;
          }
        } else {
          if (timeDef.current) {
            timeDef.current.style.opacity = 0;
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
      ref={timeDef}
      style={{ opacity: 0 }}
      calculatePosition={() => [
        window.innerWidth * 0.6,
        window.innerHeight * 0.4,
        500,
      ]}
    >
      <h1 style={{ color: "white" }}>Time</h1>
      <h2 style={{ color: "white" }}>/tʌɪm/</h2>
      <h3 style={{ color: "white" }}>Time is valuable</h3>
      <p style={{ color: "white" }}>
        With time we grow smarter, or fatter (or both)
      </p>
      <p style={{ color: "white" }}>
        If you just want to download my resume, press [SPACE]
      </p>

      <p style={{ color: "white" }}>Otherwise, keep scrolling</p>
      <div style={{ width: "100%", height: 2, color: "white" }} />
      <p style={{ color: "white" }}>
        "Spaceman Model" (https://skfb.ly/WB6J) by likesenape is licensed under
        Creative Commons Attribution
        (http://creativecommons.org/licenses/by/4.0/).
      </p>
    </Html>
  );
}

export default TimeDefinition;
