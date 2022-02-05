//source: https://codeburst.io/scroll-based-animate-timeline-with-easing-functions-on-a-webgl-scene-ef7c3f5a8d9b

import { useEffect, useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import anime from "animejs/lib/anime.es.js";
import { useThree } from "@react-three/fiber";
import useStore from "../store";

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

  let scrollTimeout = null;

  const isScrolling = useRef(false);

  function onWheel(e) {
    e.preventDefault();

    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(() => {
      scrollTimeout = null;
      useStore.getState().scrollStatus.setIsSCrolling(false);
      isScrolling.current = false;
    }, 100);
    if (!isScrolling.current) {
      isScrolling.current = true;
      useStore.getState().scrollStatus.setIsSCrolling(true);
    }

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
    timeline.seek(percentage * (timeline.duration / maxHeight));
  }

  useFrame(() => {
    render();
  });

  const [timeline] = useState(() =>
    anime.timeline({
      autoplay: false,
      easing: "easeOutSine",
    })
  );

  /**
   * Taken from actions, exported from blender. //TODO: check for automatization
   */
  const animationTimes = {
    //experience
    androidMove: 1.5833333730697632,
    appleMove: 1.25,
    camelMove: 1,
    clockMove: 0.875,
    come: 1.2916666269302368,
    go: 1.5,
    join: 1.7083333730697632,
    toAndroid: 2.5416667461395264,
    toApple: 3.375,
    toCamel: 3.375,
    toCannon: 2.4166667461395264,
    toClock: 3.375,
    toFlower: 2.5416667461395264,
    toPineapple: 3.8333332538604736,
    //sheet
    toSheet: 2,
  };

  const { camera } = useThree();

  const empty = {};

  const initialAnimationProgress = useRef(0);
  const initialScaleProgress = useRef(0);
  const initalCubeJoinProgress = useRef(0);
  const initalCubeGoProgress = useRef(0);
  const centerSheetProgress = useRef(0);
  const rotateSheetProgress = useRef(0);
  const toSheetProgress = useRef(0);
  const sheetBackRotateProgress = useRef(0);
  const planeAndSheetReverseOpacitiesProgress = useRef(0);
  const planeFoldProgress = useRef(0);
  const planeToInitialTrajectoryPointProgress = useRef(0);
  const planeToClockProgress = useRef(0);

  /**
   * handles the animation updates, making sure to play the animation even when going backwards
   * @param {object} anim the animation received from update function on animeJS timeline
   * @param {object} progressTracker a ref for each animation that prevents emiting unnecessary values
   * @param {function} progressSetter a function with the logic that modifies the state for each animation
   */
  function handleUpdateAnimation(anim, progressTracker, progressSetter) {
    if (!anim.completed) {
      if (progressTracker.current !== 0) {
        progressSetter(anim);
      }
      progressTracker.current = anim.progress;
    } else {
      if (anim.progress < 100) {
        anim.completed = false;
      }
    }
  }

  function addTimelineEvents() {
    //set camera to middle of 3 cubes
    timeline.add({
      targets: camera.position,
      x: 15,
      y: 0,
      z: 710,
      duration: 200,
    });

    //rotate cubes & remove loading text from screen animation control
    timeline.add({
      //target is empty because we just control the timing, animation happens on other files via animation.seek()
      targets: empty,
      duration: 500,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          initialAnimationProgress,
          function progresSetter(anim) {
            useStore.getState().initialAnimation.setProgress(anim.progress);
          }
        );
      },
    });

    //scale down experience helper cubes
    timeline.add({
      targets: empty,
      duration: 400,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          initialScaleProgress,
          function progressSetter(anim) {
            useStore
              .getState()
              .experience.setInitialScaleProgress(anim.progress);
          }
        );
      },
    });

    //join experience cubes animation control
    timeline.add({
      targets: empty,
      duration: 400,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          initalCubeJoinProgress,
          function progresSetter(anim) {
            useStore
              .getState()
              .experience.setInitialJoinProgress(anim.progress);
          }
        );
      },
    });

    //initial go (experience cubes) animation control (GLTF anim)
    timeline.add({
      targets: empty,
      duration: 2000, //TO MILLISECONDS
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          initalCubeGoProgress,
          function progresSetter(anim) {
            useStore.getState().experience.setInitialGoProgress(anim.progress);
          }
        );
      },
    });

    // set sheet to center animation control
    timeline.add({
      targets: empty,
      duration: 500,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          centerSheetProgress,
          function progresSetter(anim) {
            useStore.getState().sheet.setMoveToCenterProgress(anim.progress);
          }
        );
      },
    });

    //zoom into sheet cube
    timeline.add({
      targets: camera.position,
      x: 15,
      y: 0,
      z: 688,
      duration: 500,
    });

    //rotate the sheet cube
    timeline.add({
      targets: empty,
      duration: 500,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          rotateSheetProgress,
          function progresSetter(anim) {
            useStore.getState().sheet.setRotateToSheetProgress(anim.progress);
          }
        );
      },
    });

    //to sheet animation controler (GLTF ANIM)
    timeline.add({
      targets: empty,
      duration: 2000,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          toSheetProgress,
          function progresSetter(anim) {
            useStore.getState().sheet.setSheetProgress(anim.progress);
          }
        );
      },
    });

    //rotate sheet back to place controller
    timeline.add({
      targets: empty,
      duration: 500,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          sheetBackRotateProgress,
          function progresSetter(anim) {
            useStore.getState().sheet.setBackRotateProgress(anim.progress);
          }
        );
      },
    });

    //change sheet to plane
    timeline.add({
      targets: empty,
      duration: 100,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          planeAndSheetReverseOpacitiesProgress,
          function progressSetter(anim) {
            useStore
              .getState()
              .initialAnimation.setPlaneAndSheetReverseOpacitiesProgress(
                anim.progress
              );
          }
        );
      },
    });

    //the coolest plane folding animation ever
    timeline.add({
      targets: empty,
      duration: 10000,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          planeFoldProgress,
          function progressSetter(anim) {
            useStore.getState().plane.setPlaneFoldingProgress(anim.progress);
          }
        );
      },
    });

    //move plane to the initial trajectory point
    //todo: this
    timeline.add({
      targets: empty,
      duration: 500,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          planeToInitialTrajectoryPointProgress,
          function progressSetter(anim) {
            useStore
              .getState()
              .plane.setPlaneToInitialTrajectoryPointProgress(anim.progress);
          }
        );
      },
    });

    //move plane from intial point to the clock position
    //from here the plane movement anim progress will be each time increased with +100 in order to be consistent with the line progress.
    timeline.add({
      targets: empty,
      duration: 10000,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          planeToClockProgress,
          function progressSetter(anim) {
            useStore.getState().plane.setPlaneToClockProgress(anim.progress);
            //todo: add on finish function:  increase Plane movement along lines total progress by 100 each time mabe
          }
        );
      },
    });

    timeline.add({
      targets: empty,
      duration: 200,
    });
  }

  useEffect(() => {
    camera.position.z = 725;
    camera.position.y = 8;

    divContainer.scroll({ top: 0, left: 0 });
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

    //the above tasks are completed

    //0. set up the path points
    //1. move the plane to the initial trajectory point
    //2. make the points path visible
    //animate plane to the path points

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