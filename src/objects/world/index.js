import {
  Suspense,
  createRef,
  useRef,
  useState,
  useEffect,
  useReducer,
} from "react";
import { Html, Stats } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import anime from "animejs/lib/anime.es";

import DirectionalLight from "../directionalLight";
import Floor from "../floor";
import Sky from "../sky";
import PaperPlane from "../paperPlane";

import Effect from "../../postprocessing";

const World = () => {
  const { camera, scene, gl } = useThree();

  const [timeline] = useState(() =>
    anime.timeline({
      autoplay: false,
      duration: 4500,
      easing: "easeOutSine",
    })
  );
  console.log("timeline: ", timeline);

  var percentage = 0;
  var scrollY = 0;
  var event = {
    y: 0,
    deltaY: 0,
  };

  const divContainer = document.querySelector(".scrollContainer");

  // let maxHeight =
  //   (divContainer.clientHeight || divContainer.offsetHeight) -
  //   window.innerHeight;
  // console.log("maxHeight", divContainer, maxHeight);
  let maxHeight = 0;

  const plane = createRef();
  const floor = createRef();

  useEffect(() => {
    if (plane.current !== null) {
      timeline.add({
        targets: plane.current.position,
        x: 100,
        y: 25,
        z: -500,
        duration: 2250,
        update: camera.updateProjectionMatrix(),
      });
      timeline.add({
        targets: plane.current.position,
        x: 0,
        y: 0,
        z: 50,
        duration: 2250,
        update: camera.updateProjectionMatrix(),
      });
    }
  }, [plane.current]);

  // linear interpolation function
  function lerp(a, b, t) {
    return (1 - t) * a + t * b;
  }

  const onResize = () => {
    maxHeight =
      (divContainer.clientHeight || divContainer.offsetHeight) -
      window.innerHeight;
    camera.updateProjectionMatrix();
  };

  function onWheel(e) {
    // for embedded demo
    e.stopImmediatePropagation();
    e.cancelable && e.preventDefault();
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
    onResize();

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

      <DirectionalLight />
      {/* <PointLight /> */}
      <Effect />
      <Stats />
      <axesHelper args={[1000000]} />
    </>
  );
};

export default World;
