//the lifesaver (source): https://codeburst.io/scroll-based-animate-timeline-with-easing-functions-on-a-webgl-scene-ef7c3f5a8d9b

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

  //these refs control animations to avoid emitting multiple times 0's and 100's progress from onUpdate(animation.progress) function from anime js

  //intitial animations
  const initialAnimationProgress = useRef(0);
  const initialScaleProgress = useRef(0);
  const initalCubeJoinProgress = useRef(0);
  const initalCubeGoProgress = useRef(0);
  const centerSheetProgress = useRef(0);
  const rotateSheetProgress = useRef(0);
  const toSheetProgress = useRef(0);
  const sheetBackRotateProgress = useRef(0);
  const planeAndSheetReverseOpacitiesProgress = useRef(0);

  //plane folding progress
  const planeFoldProgress = useRef(0);

  //plane to intial trajectory point progress
  const planeToInitialTrajectoryPointProgress = useRef(0);

  //to clock animations group progress
  const planeToClockProgress = useRef(0);
  const experienceCubesToClockPositionProgress = useRef(0);
  const toClockProgress = useRef(0);
  const clockMoveProgress = useRef(0);
  const timeDefinitionProgress = useRef(0);
  const clockGoProgress = useRef(0);
  const timeDefinitionCloseProgress = useRef(0);

  //camel animations group progress handlers
  const planeToCamelProgres = useRef(0);
  const experienceCubesToCamelPosition = useRef(0);
  const toCamelProgress = useRef(0);
  const camelMoveProgress = useRef(0);
  const patienceDefitionProgress = useRef(0);
  const camelGoProgress = useRef(0);
  const patienceDefitionCloseProgress = useRef(0);

  //android animations group progress
  const planeToAndroidProgress = useRef(0);
  const cubesToAndroidPositionProgress = useRef(0);
  const toAndroidProgress = useRef(0);
  const showAndroidParagraphProgress = useRef(0);
  const androidMoveProgress = useRef(0);
  const androidGoProgress = useRef(0);
  const androidParagraphCloseProgress = useRef(0);

  //apple animations group progress
  const planeToAppleProgress = useRef(0);
  const experienceCubesToApplePositionProgress = useRef(0);
  const toAppleProgress = useRef(0);
  const appleParagraphProgress = useRef(0);
  const appleMoveProgress = useRef(0);
  const appleGoProgress = useRef(0);
  const appleParagraphCloseProgress = useRef(0);

  //react animations group progress
  const planeToReactPositionProgress = useRef(0);
  const cubesToReactPositionProgress = useRef(0);

  //flower
  const flowerColorsProgress = useRef(0);
  const toFlowerProgress = useRef(0);
  const flowerParagraphProgress = useRef(0);
  const flowerParagraphCloseProgress = useRef(0);

  //pineapple
  const pineappleColorsProgress = useRef(0);
  const toPineAppleProgress = useRef(0);
  const pineappleParagraphProgress = useRef(0);
  const pineappleParagraphCloseProgress = useRef(0);

  //cannon
  const cannonColorsProgress = useRef(0);
  const toCannonProgress = useRef(0);
  const cannonParagraphProgress = useRef(0);
  const cannonParagraphCloseProgress = useRef(0);

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
      duration: 500,
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
      duration: 500,
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
      duration: 5000,
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

    //bring the cubes to clock position
    timeline.add({
      targets: empty,
      duration: 500,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          experienceCubesToClockPositionProgress,
          function progressSetter(anim) {
            useStore
              .getState()
              .experience.setExperienceCubesToClockPositionProgress(
                anim.progress
              );
          }
        );
      },
    });

    //convert to clock (GLTF)
    timeline.add({
      targets: empty,
      duration: 2000,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          toClockProgress,
          function progressSetter(anim) {
            useStore.getState().experience.setToClockProgress(anim.progress);
          }
        );
      },
    });

    //show time definition
    timeline.add({
      targets: empty,
      duration: 500,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          timeDefinitionProgress,
          function progressSetter(anim) {
            useStore
              .getState()
              .experience.setTimeDefinitionProgress(anim.progress);
          }
        );
      },
    });

    //clockMove (GLTF)
    timeline.add({
      targets: empty,
      duration: 300,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          clockMoveProgress,
          function progressSetter(anim) {
            useStore.getState().experience.setClockMoveProgress(anim.progress);
          }
        );
      },
    });

    //give it some time
    timeline.add({
      targets: empty,
      duration: 3000,
    });

    //clock go (GLTF)
    timeline.add({
      targets: empty,
      duration: 1000,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          clockGoProgress,
          function progressSetter(anim) {
            useStore.getState().experience.setClockCloseProgress(anim.progress);
          }
        );
      },
    });

    //remove timeDefinition
    timeline.add({
      targets: empty,
      duration: 500,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          timeDefinitionCloseProgress,
          function progressSetter(anim) {
            useStore
              .getState()
              .experience.setTimeDefintionCloseProgress(anim.progress);
          }
        );
      },
    });

    //move plane to camel position
    timeline.add({
      targets: empty,
      duration: 5000,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          planeToCamelProgres,
          function progressSetter(anim) {
            useStore
              .getState()
              .plane.setPlaneToCamelProgress(100 + anim.progress); //add +100 because plane has moved 100 units from the last position
          }
        );
      },
    });

    //bring the cubes to camel position
    timeline.add({
      targets: empty,
      duration: 500,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          experienceCubesToCamelPosition,
          function progressSetter(anim) {
            useStore
              .getState()
              .experience.setCubesToCamelPositionProgress(anim.progress);
          }
        );
      },
    });

    //transform cubes to camel (GLTF)
    timeline.add({
      targets: empty,
      duration: 2000,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          toCamelProgress,
          function progressSetter(anim) {
            useStore.getState().experience.setToCamelProgress(anim.progress);
          }
        );
      },
    });

    //show patienceDefinition
    timeline.add({
      targets: empty,
      duration: 500,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          patienceDefitionProgress,
          function progressSetter(anim) {
            useStore
              .getState()
              .experience.setPatienceDefinitonProgress(anim.progress);
          }
        );
      },
    });

    //play camel move animation (GLTF)
    timeline.add({
      targets: empty,
      duration: 300,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          camelMoveProgress,
          function progressSetter(anim) {
            useStore.getState().experience.setCamelMoveProgress(anim.progress);
          }
        );
      },
    });

    //give it some extra time
    timeline.add({
      targets: empty,
      duration: 3000,
    });

    //camel go (GLTF)
    timeline.add({
      targets: empty,
      duration: 1000,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          camelGoProgress,
          function progressSetter(anim) {
            useStore.getState().experience.setCamelGoProgress(anim.progress);
          }
        );
      },
    });

    //remove patience definition
    timeline.add({
      targets: empty,
      duration: 500,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          patienceDefitionCloseProgress,
          function progressSetter(anim) {
            useStore
              .getState()
              .experience.setPatinceDefinitionCloseProgres(anim.progress);
          }
        );
      },
    });

    //move the plane to android position
    timeline.add({
      targets: empty,
      duration: 5000,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          planeToAndroidProgress,
          function progressSetter(anim) {
            useStore
              .getState()
              .plane.setPlaneToAndroidProgress(200 + anim.progress); //+200 because of the two previous plane movements
          }
        );
      },
    });

    //bring the cubes to android position
    timeline.add({
      targets: empty,
      duration: 500,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          cubesToAndroidPositionProgress,
          function progressSetter(anim) {
            useStore
              .getState()
              .experience.setCubesToAndroidPositionProgress(anim.progress);
          }
        );
      },
    });

    //transform to android(GLTF)
    timeline.add({
      targets: empty,
      duration: 2000,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          toAndroidProgress,
          function progressSetter(anim) {
            useStore.getState().experience.setToAndroidProgress(anim.progress);
          }
        );
      },
    });

    //show android paragraph
    timeline.add({
      targets: empty,
      duration: 500,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          showAndroidParagraphProgress,
          function progressSetter(anim) {
            useStore
              .getState()
              .experience.setAndroidParagraphProgress(anim.progress);
          }
        );
      },
    });

    //android move (GLTF)
    timeline.add({
      targets: empty,
      duration: 300,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          androidMoveProgress,
          function progressSetter(anim) {
            useStore
              .getState()
              .experience.setAndroidMoveProgress(anim.progress);
          }
        );
      },
    });

    //TODO: check if it's waiting on backwars play too
    //wait some time
    timeline.add({
      targets: empty,
      duration: 3000,
    });

    //androd go (GLTF)
    timeline.add({
      targets: empty,
      duration: 1000,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          androidGoProgress,
          function progressSetter(anim) {
            useStore.getState().experience.setAndroidGoProgress(anim.progress);
          }
        );
      },
    });

    //hide android paragraph
    timeline.add({
      targets: empty,
      duration: 500,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          androidParagraphCloseProgress,
          function progressSetter(anim) {
            useStore
              .getState()
              .experience.setAndroidParagraphCloseProgress(anim.progress);
          }
        );
      },
    });

    //move the plane to apple position
    timeline.add({
      targets: empty,
      duration: 5000,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          planeToAppleProgress,
          function progressSetter(anim) {
            useStore
              .getState()
              .plane.setPlaneToAppleProgress(300 + anim.progress); //+300 for the plane to continue it's journey when it left off
          }
        );
      },
    });

    //bring the cubes to apple position
    timeline.add({
      targets: empty,
      duration: 500,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          experienceCubesToApplePositionProgress,
          function progressSetter(anim) {
            useStore
              .getState()
              .experience.setExperienceCubesToApplePositionProgress(
                anim.progress
              );
          }
        );
      },
    });

    //transform the cubes to apple
    timeline.add({
      targets: empty,
      duration: 2000,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          toAppleProgress,
          function progressSetter(anim) {
            useStore.getState().experience.setToAppleProgress(anim.progress);
          }
        );
      },
    });

    // show apple paragraph
    timeline.add({
      targets: empty,
      duration: 500,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          appleParagraphProgress,
          function progressSeter(anim) {
            useStore
              .getState()
              .experience.setAppleParagraphProgress(anim.progress);
          }
        );
      },
    });

    //move apple
    timeline.add({
      targets: empty,
      duration: 300,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          appleMoveProgress,
          function progressSetter(anim) {
            useStore.getState().experience.setAppleMoveProgress(anim.progress);
          }
        );
      },
    });

    //give it some extra time
    timeline.add({
      targets: empty,
      duration: 3000,
    });

    //apple go
    timeline.add({
      targets: empty,
      duration: 1000,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          appleGoProgress,
          function progressSetter(anim) {
            useStore.getState().experience.setAppleGoProgress(anim.progress);
          }
        );
      },
    });

    //remove apple paragraph
    timeline.add({
      targets: empty,
      duration: 500,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          appleParagraphCloseProgress,
          function progressSeter(anim) {
            useStore
              .getState()
              .experience.setAppleParagraphCloseProgress(anim.progress);
          }
        );
      },
    });

    //set plane to react position
    timeline.add({
      targets: empty,
      duration: 3000,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          planeToReactPositionProgress,
          function progressSetter(anim) {
            useStore
              .getState()
              .plane.setPlaneToReactPositionProgress(400 + anim.progress); //+400 in order for the plane to continue where it left of (in the trajectory)
          }
        );
      },
    });

    //bring cubes to react position
    timeline.add({
      targets: empty,
      duration: 500,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          cubesToReactPositionProgress,
          function progressSetter(anim) {
            useStore
              .getState()
              .experience.setCubesToReactPositionProgress(anim.progress);
          }
        );
      },
    });

    //set flower colors
    timeline.add({
      targets: empty,
      duration: 1000,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          flowerColorsProgress,
          function progressSetter(anim) {
            useStore
              .getState()
              .experience.setFlowerColorsProgress(anim.progress);
          }
        );
      },
    });

    //transform to flower
    timeline.add({
      targets: empty,
      duration: 2000,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          toFlowerProgress,
          function progressSetter(anim) {
            useStore.getState().experience.setToFLowerProgress(anim.progress);
          }
        );
      },
    });

    //TODO: try setting colors before animation???

    //show flowerParagraph
    timeline.add({
      targets: empty,
      duration: 500,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          flowerParagraphProgress,
          function progressSetter(anim) {
            useStore
              .getState()
              .experience.setFlowerParagraphProgress(anim.progress);
          }
        );
      },
    });

    //set pineAppleColors
    timeline.add({
      targets: empty,
      duration: 1000,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          pineappleColorsProgress,
          function progressSetter(anim) {
            useStore
              .getState()
              .experience.setPineappleColorsProgress(anim.progress);
          }
        );
      },
    });

    //hide flowerParagraph
    timeline.add({
      targets: empty,
      duration: 500,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          flowerParagraphCloseProgress,
          function progressSetter(anim) {
            useStore
              .getState()
              .experience.setFlowerParagraphCloseProgress(anim.progress);
          }
        );
      },
    });

    //transform to pineAPple
    timeline.add({
      targets: empty,
      duration: 2000,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          toPineAppleProgress,
          function progressSetter(anim) {
            useStore.getState().experience.setToPinappleProgress(anim.progress);
          }
        );
      },
    });

    //show pineapple paragraph
    timeline.add({
      targets: empty,
      duration: 500,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          pineappleParagraphProgress,
          function progressSetter(anim) {
            useStore
              .getState()
              .experience.setPineappleParagraphProgress(anim.progress);
          }
        );
      },
    });

    //hide pineapple paragraph
    timeline.add({
      targets: empty,
      duration: 500,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          pineappleParagraphCloseProgress,
          function progressSetter(anim) {
            useStore
              .getState()
              .experience.setPineappleParagraphCloseProgress(anim.progress);
          }
        );
      },
    });

    //set cannon colors
    timeline.add({
      targets: empty,
      duration: 1000,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          cannonColorsProgress,
          function progressSetter(anim) {
            useStore
              .getState()
              .experience.setCannonColorsProgress(anim.progress);
          }
        );
      },
    });

    //transform to Cannon
    timeline.add({
      targets: empty,
      duration: 2000,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          toCannonProgress,
          function progressSetter(anim) {
            useStore.getState().experience.setToCannonProgress(anim.progress);
          }
        );
      },
    });

    //show cannon paragraph
    timeline.add({
      targets: empty,
      duration: 500,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          cannonParagraphProgress,
          function progressSetter(anim) {
            useStore
              .getState()
              .experience.setCannonParagraphProgress(anim.progress);
          }
        );
      },
    });

    //hide cannon paragraph
    timeline.add({
      targets: empty,
      duration: 500,
      update: function (anim) {
        handleUpdateAnimation(
          anim,
          cannonParagraphCloseProgress,
          function progressSetter(anim) {
            useStore
              .getState()
              .experience.setCannonParagraphCloseProgress(anim.progress);
          }
        );
      },
    });

    //****************** just for fixing the timeline */
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

      //TODO: CHECK IF CAN CLEAR REF????
    };
  }, []);

  return null;
}
