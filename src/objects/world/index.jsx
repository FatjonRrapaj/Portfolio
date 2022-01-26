import { Suspense, useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree, extend } from "@react-three/fiber";
import { Stats } from "@react-three/drei";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { lerp } from "../../helpers/animation";
import createSpiralPathFromCoordinateWithRadius from "./createPath";
import anime from "animejs/lib/anime.es.js";

import Stars from "../stars";
import Everything from "../Starter";
import TestPlane from "../TestOnlyPlane";
import Sheet from "../Sheet";
import Text from "../Text";
import Effect from "../../postprocessing";

//Paragraphs

import useStore from "../../store";

extend({ OrbitControls });

const World = () => {
  const { camera, ...rest } = useThree();
  console.log("rest: ", rest);
  const lineRef = useRef();

  const controls = useRef();

  lineRef.current && lineRef.current.computeLineDistances();

  /** Line */
  const [points] = useState(() => {
    return [
      new THREE.Vector3(0, 0, 697),
      new THREE.Vector3(10, 2, 640.0),
      new THREE.Vector3(-10, -1, 600.0),
      new THREE.Vector3(-40, -5, 580),
      new THREE.Vector3(-100, 12, 550),
      ...createSpiralPathFromCoordinateWithRadius({
        coordinate: [-200, 15, 490],
        radius: 15,
        spirals: 3,
        heightDivider: 3,
      }),
      new THREE.Vector3(-185, 0, 505),
      new THREE.Vector3(-100, 2, 505),
      new THREE.Vector3(50, 0, 500),
      ...createSpiralPathFromCoordinateWithRadius({
        coordinate: [200, 4, 430],
        direction: 1,
        radius: 16,
        spirals: 3,
        heightDivider: 3,
      }),
      new THREE.Vector3(100, 4, 400),
      new THREE.Vector3(50, -4, 380),
      new THREE.Vector3(0, 4, 380),
      new THREE.Vector3(0, 0, 350),
      new THREE.Vector3(0, 10, 300),
      new THREE.Vector3(0, 20, 270),
      new THREE.Vector3(0, 30, 220),
      new THREE.Vector3(0, 40, 200),
      new THREE.Vector3(0, 40, 200),
      new THREE.Vector3(0, 40, 200),
      new THREE.Vector3(0, 30, 200),
      new THREE.Vector3(0, 30, 200),
      new THREE.Vector3(0, 30, 210),
      new THREE.Vector3(0, 30, 200),
      new THREE.Vector3(0, 30, 200),
      new THREE.Vector3(0, 30, 200),
      new THREE.Vector3(0, 90, 200),
      new THREE.Vector3(0, 90, 170),
      new THREE.Vector3(0, 90, 170),
      new THREE.Vector3(0, 90, 100),
      new THREE.Vector3(0, 130, 100),
      new THREE.Vector3(0, 130, 100),
      new THREE.Vector3(0, 130, 100),
      new THREE.Vector3(0, 180, 50),
      new THREE.Vector3(0, 180, 50),
      new THREE.Vector3(0, 180, 150),
      new THREE.Vector3(0, 180, 150),
      new THREE.Vector3(0, 180, 150),
      new THREE.Vector3(0, 1800, 100),
      new THREE.Vector3(0, 1800, 100),
    ];
  });

  const [line] = useState(() => {
    const c = new THREE.CatmullRomCurve3(points);
    c.tension = 1;
    c.arcLengthDivisions = 20000;
    c.curveType = "catmullrom";

    return c;
  });

  /** Window event listener handlers */
  const divContainer = document.getElementById("fold");
  var maxHeight = divContainer.clientHeight - window.innerHeight;
  var percentage = 0;
  var scrollY = 0;
  var touchStartY = 0;
  var event = {
    y: 0,
    deltaY: 0,
  };

  const onResize = () => {
    maxHeight = divContainer.clientHeight - window.innerHeight;
  };

  let isScrolling;

  function onWheel(e) {
    var evt = event;
    evt.deltaY = e.wheelDeltaY || e.deltaY * -1;
    evt.deltaY *= 0.5;
    clearTimeout(isScrolling);
    useStore.getState().world.setScrollingStopped(false);
    isScrolling = setTimeout(function () {
      useStore.getState().world.setScrollingStopped(true);
    }, 66);
    scroll(e);
  }

  function scroll() {
    var evt = event;
    if (evt.y + evt.deltaY > 0) {
      evt.y = 0;
    } else if (-(evt.y + evt.deltaY) >= maxHeight) {
      evt.y = -maxHeight;
    } else {
      evt.y += evt.deltaY;
    }
    scrollY = -evt.y;
    useStore.getState().world.setScrollY(scrollY);
    percentage = lerp(percentage, scrollY, 0.07);
    useStore.getState().world.setProgress(percentage);
  }

  function animatePlane(percentage) {
    useStore.getState().paperPlane.setAnimationTime(percentage);
  }

  function animatePlaneToInitialTrajectoryPoint(fraction) {
    useStore
      .getState()
      .paperPlane.setInitialTrajectoryPointAnimationTime(fraction);
  }

  const up = new THREE.Vector3(0, 0, -1);
  const axis = new THREE.Vector3();
  function movePlane({ fraction, isBackward, moveCamera }) {
    const point = line.getPoint(fraction);
    const { x, y, z } = point;
    useStore.getState().paperPlane.move([x, y, z]);
    if (isBackward) {
      up.z = 1;
    } else {
      up.z = -1;
    }

    const tangent = line.getTangent(fraction);
    axis.crossVectors(up, tangent).normalize();
    const radians = Math.acos(up.dot(tangent));
    useStore.getState().paperPlane.setRotationAngle({ axis, angle: radians });
    if (moveCamera) {
      camera.position.set(...[x, y + 3, z + 10]);
    }
  }

  let oldProgress = -Infinity;

  function handleProgress(progress) {
    // console.log("progress: ", progress);
    let isBackward = false;
    if (oldProgress > progress) {
      isBackward = true;
    } else {
      isBackward = false;
    }
    oldProgress = progress;

    if (progress <= 18000) {
      animatePlane(progress);
    } else if (progress > 18000 && progress <= 20000) {
      const fraction = progress - 18000;
      animatePlaneToInitialTrajectoryPoint(fraction);
    } else if (progress > 18000) {
      const localProgress = progress - 18000;
      const fraction = localProgress / 30000;
      let prevCameraPosition = camera.position;
      if (progress > 20760 && progress <= 26262) {
        //PLANE
        movePlane({
          fraction,
          isBackward,
          moveCamera: false,
        });
        const xFactor = isBackward ? 1 : -1;
        const zFactor = 1;
        let cameraX;
        let cameraY;
        let cameraZ;
        const zoomProgress = localProgress / 50000;
        if (isBackward) {
          cameraX = Math.min(
            -190,
            prevCameraPosition.x + zoomProgress * xFactor
          );
        } else {
          cameraX = Math.max(
            -190,
            prevCameraPosition.x + zoomProgress * xFactor
          );
        }
        cameraY = camera.position.y;
        cameraZ = Math.min(550, prevCameraPosition.z + zoomProgress * zFactor);
        camera.position.set(...[cameraX, cameraY, cameraZ]);
      } else if (progress > 26262 && progress <= 27300) {
        //PLANE TO BRAIN
        movePlane({
          fraction,
          isBackward,
          moveCamera: true,
        });
      } else if (progress > 27300 && progress <= 33611) {
        //BRAIN
        movePlane({
          fraction,
          isBackward,
          moveCamera: false,
        });
        const xFactor = isBackward ? 1 : -1;
        const zFactor = 1;
        let cameraX;
        let cameraY;
        let cameraZ;
        const zoomProgress = localProgress / 50000;
        if (isBackward) {
          cameraX = Math.min(
            190,
            prevCameraPosition.x + zoomProgress * xFactor
          );
        } else {
          cameraX = Math.max(
            190,
            prevCameraPosition.x + zoomProgress * xFactor
          );
        }
        cameraY = Math.min(8, prevCameraPosition.y + zoomProgress);
        if (isBackward) {
          cameraZ = Math.max(
            490,
            prevCameraPosition.z + zoomProgress * zFactor
          );
        }
        cameraZ = Math.min(490, prevCameraPosition.z + zoomProgress * zFactor);
        camera.position.set(...[cameraX, cameraY, cameraZ]);
      } else if (progress > 33611 && progress <= 34600) {
        //BRAIN TO WORLD
        movePlane({
          fraction,
          isBackward,
          moveCamera: true,
        });
      } else if (progress > 34600 && progress <= 42000) {
        movePlane({
          fraction,
          isBackward,
          moveCamera: true,
        });
      } else {
        movePlane({
          fraction,
          isBackward,
          moveCamera: true,
        });
      }
    }
  }

  function onTouchStart(e) {
    var t = e.targetTouches ? e.targetTouches[0] : e;
    touchStartY = t.pageY;
  }

  function onTouchMove(e) {
    var evt = event;
    var t = e.targetTouches ? e.targetTouches[0] : e;
    // the multiply factor on mobile must be about 10x the factor applied on the wheel
    evt.deltaY = (t.pageY - touchStartY) * 5;
    touchStartY = t.pageY;
    scroll(e);
  }

  useEffect(() => {
    //TODO: KEEP AN EYE ON THE PROGRESS WITH THIS.
    camera.position.z = 730;
    divContainer.scrollIntoView();
    //Scroll & resize event listeners
    divContainer.addEventListener("wheel", onWheel, false);
    window.addEventListener("resize", onResize, { passive: true });

    //Zustand store subscriptions
    const unSubscribeWorldChanges = useStore.subscribe(
      (state) => state.world,
      ({ progress, scrollingStopped }) => {
        handleProgress(progress, scrollingStopped);
      }
    );

    divContainer.addEventListener("touchstart", onTouchStart);
    divContainer.addEventListener("touchmove", onTouchMove);

    return () => {
      divContainer.removeEventListener("wheel", onWheel);

      window.removeEventListener("resize", onResize);
      divContainer.removeEventListener("touchstart", onTouchStart);
      divContainer.removeEventListener("touchmove", onTouchMove);
      useStore.getState().world.setProgress(0);
      useStore.getState().world.setScrollY(0);
      unSubscribeWorldChanges();
    };
  }, []);

  useFrame(() => {
    controls.current && controls.current.update();
  });

  return (
    <>
      <Effect />
      <Stats />

      <Suspense fallback={null}>
        <Text
          position={[0, 1, 688]}
          rotation={[0, Math.PI / 8, 0]}
          children="LOADING"
        />
        <Everything />
        <TestPlane />
        <Sheet />
      </Suspense>
      <directionalLight intensity={1} position={[2, 1, 697]} color="white" />
    </>
  );
};

export default World;
