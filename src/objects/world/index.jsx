import { Suspense, useState, useEffect, useRef } from "react";
import { Stats } from "@react-three/drei";
import anime from "animejs/lib/anime.es.js";

import { lerp } from "../../helpers/animation";
import DirectionalLight from "../components/directionalLight";
import Floor from "../floor";
import Sky from "../sky";
import PaperPlane from "../paperPlane";
import Effect from "../../postprocessing";

const World = () => {
  const floor = useRef();
  const plane = useRef();

  const divContainer = document.querySelector(".scrollContainer");
  var percentage = 0;
  var scrollY = 0;
  var event = {
    y: 0,
    deltaY: 0,
  };
  var maxHeight =
    (divContainer.clientHeight || divContainer.offsetHeight) -
    window.innerHeight;

  const [timeline] = useState(() =>
    anime.timeline({
      autoplay: false,
      duration: 22000,
      delay: 10000,
    })
  );

  useEffect(() => {
    if (floor.current != null) {
      timeline.add({
        targets: floor.current.position,
        x: 0,
        y: 25,
        z: 400,
        duration: 10000,
      });
      timeline.add({
        targets: floor.current.position,
        x: 0,
        y: 0,
        z: 800,
        duration: 10000,
      });
      console.log(timeline);
    }
  }, []);

  const onResize = () => {
    maxHeight =
      (divContainer.clientHeight || divContainer.offsetHeight) -
      window.innerHeight;
  };

  function onWheel(e) {
    e.stopImmediatePropagation();
    e.preventDefault();
    e.stopPropagation();
    var evt = event;
    evt.deltaY = e.wheelDeltaY || e.deltaY * -1;
    // reduce by half the delta amount otherwise it scroll too fast
    evt.deltaY *= 0.5;
    scroll(e);
  }

  function scroll(e) {
    console.log("Here");
    var evt = event;
    // limit scroll top
    if (evt.y + evt.deltaY > 0) {
      evt.y = 0;
      // limit scroll bottom
    } else if (-(evt.y + evt.deltaY) >= maxHeight) {
      evt.y = -maxHeight;
    } else {
      evt.y += evt.deltaY;
    }

    scrollY = -evt.y;

    percentage = lerp(percentage, scrollY, 0.08);

    timeline.seek(percentage * (32000 / maxHeight));
  }

  useEffect(() => {
    divContainer.addEventListener("wheel", onWheel, false);
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      divContainer.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <Floor ref={floor} />
      <Sky />
      <Suspense fallback={null}>
        <PaperPlane />
      </Suspense>
      <DirectionalLight />
      <Effect />
      <Stats />

      <axesHelper args={[1000000]} />
    </>
  );
};

export default World;
