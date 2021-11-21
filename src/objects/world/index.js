import { Suspense, createRef, useState, useEffect } from "react";
import { Stats } from "@react-three/drei";
import anime from "animejs/lib/anime.es.js";

import { lerp } from "../../helpers/animation";

import DirectionalLight from "../components/directionalLight";
import Floor from "../floor";
import Sky from "../sky";
import PaperPlane from "../paperPlane";
import Hello from "../hello";

import Effect from "../../postprocessing";

const World = () => {
  const plane = createRef();
  const floor = createRef();
  const hello = createRef();

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
      duration: 4500,
      easing: "easeOutSine",
    })
  );

  useEffect(() => {
    if (plane.current !== null) {
      timeline.add({
        targets: plane.current.position,
        x: 100,
        y: 25,
        z: -500,
        duration: 2250,
      });
      timeline.add({
        targets: plane.current.position,
        x: 0,
        y: 0,
        z: 50,
        duration: 2250,
      });
    }
  }, [plane.current]);

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
    timeline.seek(percentage * (4500 / maxHeight));
  }

  useEffect(() => {
    divContainer.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", onResize, { passive: true });

    return function cleanUp() {
      divContainer.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <Floor ref={floor} />
      <Sky />
      <Suspense fallback={null}>
        <PaperPlane ref={plane} timeline={timeline} percentage={percentage} />
      </Suspense>
      <Hello ref={hello} />
      <DirectionalLight />
      <Effect />
      <Stats />

      <axesHelper args={[1000000]} />
    </>
  );
};

export default World;
