import { useEffect, useState, useRef } from "react";
import anime from "animejs/lib/anime.es.js";

import Sky from "./sky";
import Floor from "./floor";

import useStore from "../../store";
import { useFrame } from "@react-three/fiber";

function Planet() {
  const planetRef = useRef();

  const [timeline] = useState(() =>
    anime.timeline({
      autoplay: false,
      duration: 2000,
      easing: "easeOutSine",
    })
  );

  useEffect(() => {
    if (planetRef.current) {
      timeline.add({
        targets: planetRef.current.scale,
        x: 1,
        y: 1,
        z: 1,
        duration: 2000,
      });

      const unsubscribeStore = useStore.subscribe(
        (state) => state.world,
        ({ progress }) => {
          if (progress >= 34600) {
            let localProgress = progress - 34600;
            const scaleFator = localProgress / 7;
            if (timeline.began && timeline.completed) {
              timeline.completed = false;
            }
            timeline.seek(scaleFator);
          }
        }
      );

      return () => {
        unsubscribeStore();
      };
    }
  }, [planetRef.current]);

  return (
    <group position={[0, 0, -100]} ref={planetRef} scale={[0.1, 0.1, 0.1]}>
      <Sky />
      <Floor />
    </group>
  );
}

export default Planet;
