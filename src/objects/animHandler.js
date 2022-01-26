//source: https://codeburst.io/scroll-based-animate-timeline-with-easing-functions-on-a-webgl-scene-ef7c3f5a8d9b

import { useEffect, useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import anime from "animejs/lib/anime.es.js";
import { useThree } from "@react-three/fiber";

export default function Animator() {
  const _event = useRef({
    y: 0,
    deltaY: 0,
  });
  var percentage = 0;
  var touchStartY = 0;

  // this is the container where we will attach the scroll event. For this example we will set its height to 1200vh.
  const divContainer = document.getElementById("fold");
  // container height - window height to limit the scroll at the top of the screen when we are at the bottom of the container
  var maxHeight =
    (divContainer.clientHeight || divContainer.offsetHeight) -
    window.innerHeight;

  function onWheel(e) {
    _event.current.deltaY = e.wheelDeltaY || e.deltaY * -1;
    // reduce by half the delta amount otherwise it scroll too fast (in a other way we could increase the height of the container too)
    _event.current.deltaY *= 0.5;
    scroll(e);
  }

  function scroll(e) {
    // limit scroll top
    if (_event.current.y + _event.current.deltaY > 0) {
      _event.current.y = 0;
      // limit scroll bottom
    } else if (-(_event.current.y + _event.current.deltaY) >= maxHeight) {
      _event.current.y = -maxHeight;
    } else {
      _event.current.y += _event.current.deltaY;
    }
  }

  function onTouchStart(e) {
    var t = e.targetTouches ? e.targetTouches[0] : e;
    touchStartY = t.pageY;
  }

  function onTouchMove(e) {
    var t = e.targetTouches ? e.targetTouches[0] : e;
    // the multiply factor on mobile must be about 10x the factor applied on the wheel
    _event.current.deltaY = (t.pageY - touchStartY) * 5;
    touchStartY = t.pageY;
    scroll(e);
  }

  function onResize() {
    maxHeight = divContainer.clientHeight - window.innerHeight;
  }

  function lerp(a, b, t) {
    return (1 - t) * a + t * b;
  }

  function render() {
    percentage = lerp(percentage, -_event.current.y, 0.07);
    console.log("percentage: ", percentage);

    timeline.seek(percentage * (1000 / maxHeight));
  }

  useFrame(() => {
    render();
  });

  const [timeline] = useState(() =>
    anime.timeline({
      autoplay: false,
      duration: 3000,
      easing: "easeOutSine",
    })
  );

  const { camera } = useThree();

  function addTimelineEvents() {
    timeline.add({
      targets: camera.position,
      x: 1,
      y: 0,
      z: 700,
      duration: 3000,
    });
  }

  useEffect(() => {
    camera.position.z = 730;

    divContainer.scrollIntoView();
    //Scroll & resize event listeners
    divContainer.addEventListener("wheel", onWheel, false);
    window.addEventListener("resize", onResize, { passive: true });
    divContainer.addEventListener("touchstart", onTouchStart);
    divContainer.addEventListener("touchmove", onTouchMove);

    addTimelineEvents();

    //animate camera to look at 3 cubes
    //bring the cubes to straight position
    //join the 2 everything cubes together
    //play the go animation for everything cubes
    //set the cubes to the clock position
    //play the toSheetAnim for the sheet cube
    //replace the sheet cube with the plane cube on the same position
    //play the fold plane animation
    //move the plane to clock position
    //play the come animation for cubes
    //play the to clock position
    //render the text for clock
    //play the clock move & keep rendering text
    //...

    return () => {
      divContainer.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
      divContainer.removeEventListener("touchstart", onTouchStart);
      divContainer.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return null;
}
