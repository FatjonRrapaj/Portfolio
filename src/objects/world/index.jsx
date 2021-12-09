import { Suspense, useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { Stats } from "@react-three/drei";

import { lerp } from "../../helpers/animation";
import createSpiralPathFromCoordinateWithRadius from "./createPath";

import DirectionalLight from "../components/directionalLight";
import Floor from "../floor";
import Sky from "../sky";
import PaperPlane from "../paperPlane";
import Fatstronaut from "../fatstronaut";
import Brain from "../brain";
import Stars from "../stars";
import Effect from "../../postprocessing";

//Paragraphs
import TimeDefinition from "../paragraphs/TimeDefinition";

import useStore from "../../store";

const World = () => {
  const { camera } = useThree();

  const floor = useRef();

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
        spirals: 4,
        heightDivider: 5,
      }),
      new THREE.Vector3(-100, 3, 500),
      new THREE.Vector3(50, -3, 450),
      ...createSpiralPathFromCoordinateWithRadius({
        coordinate: [200, 4, 430],
        direction: 1,
        radius: 18,
        spirals: 3,
        heightDivider: 3,
      }),
      new THREE.Vector3(100, 4, 400),
      new THREE.Vector3(50, 0, 300),
    ];
  });

  const [line] = useState(() => {
    const c = new THREE.CatmullRomCurve3(points);
    c.tension = 1;
    c.arcLengthDivisions = 20000;
    c.curveType = "catmullrom";
    return c;
  });

  const [lineGeometry] = useState(() =>
    new THREE.BufferGeometry().setFromPoints(line.getSpacedPoints(20000))
  );

  /** Window event listener handlers */
  const divContainer = document.getElementById("fold");
  var maxHeight = divContainer.clientHeight - window.innerHeight;
  var percentage = 0;
  var scrollY = 0;
  var event = {
    y: 0,
    deltaY: 0,
  };

  const onResize = () => {
    maxHeight = divContainer.clientHeight - window.innerHeight;
  };

  function onWheel(e) {
    var evt = event;
    evt.deltaY = e.wheelDeltaY || e.deltaY * -1;
    evt.deltaY *= 0.5;
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
  let prevCameraPosition = camera.position;
  function handleProgress(progress) {
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
    } else if (progress > 20000) {
      const localProgress = progress - 20000;
      const fraction = localProgress / 20000;
      prevCameraPosition = camera.position;
      //FATSCRONAUT & TIME TEXT
      if (progress > 21000 && progress < 30000) {
        movePlane({
          fraction,
          isBackward,
          moveCamera: true,
        });

        //COMMENTED OUT FOR NOW, DO NOT DELETE

        // const xFactor = isBackward ? 1 : -1;
        // // const yFactor = 1;
        // const zFactor = 1;
        // let cameraX;
        // let cameraY;
        // let cameraZ;
        // const zoomProgress = localProgress / 50000;
        // if (isBackward) {
        //   cameraX = Math.min(
        //     -190,
        //     prevCameraPosition.x + zoomProgress * xFactor
        //   );
        // } else {
        //   cameraX = Math.max(
        //     -190,
        //     prevCameraPosition.x + zoomProgress * xFactor
        //   );
        // }
        // cameraY = camera.position.y;
        // cameraZ = Math.min(550, prevCameraPosition.z + zoomProgress * zFactor);
        // camera.position.set(...[cameraX, cameraY, cameraZ]);
      } else {
        prevCameraPosition = camera.position;
        movePlane({
          fraction,
          isBackward,
          moveCamera: true,
        });
      }
    }
  }

  useEffect(() => {
    //TODO: KEEP AN EYE ON THE PROGRESS WITH THIS.
    divContainer.scrollIntoView();
    //Scroll & resize event listeners
    divContainer.addEventListener("wheel", onWheel, false);
    window.addEventListener("resize", onResize, { passive: true });

    //Scroll Progress Subscription
    const unsubscribeProgress = useStore.subscribe(
      (state) => state.world,
      ({ progress }) => {
        handleProgress(progress);
      }
    );
    return () => {
      divContainer.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
      useStore.getState().world.setProgress(0);
      unsubscribeProgress();
    };
  }, []);

  return (
    <>
      <line geometry={lineGeometry}>
        <lineBasicMaterial
          attach="material"
          color="red"
          linecap={"round"}
          linejoin={"round"}
        />
      </line>
      <Floor ref={floor} />
      <Sky />
      <Suspense fallback={null}>
        <PaperPlane />
      </Suspense>
      <DirectionalLight />

      <Suspense fallback={null}>
        <Fatstronaut />
      </Suspense>

      <TimeDefinition />

      <Suspense fallback={null}>
        <Brain />
      </Suspense>

      <Suspense fallback={null}>
        <Stars />
      </Suspense>

      <Effect />
      <Stats />

      <axesHelper args={[1000000]} />
    </>
  );
};

export default World;
