import { Suspense, useState, useEffect, useRef, useMemo } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { Stats } from "@react-three/drei";
import anime from "animejs/lib/anime.es.js";

import { lerp } from "../../helpers/animation";
import DirectionalLight from "../components/directionalLight";
import Floor from "../floor";
import Sky from "../sky";
import PaperPlane from "../paperPlane";
import Fatstronaut from "../fatstronaut";
import Stars from "../stars";
import Effect from "../../postprocessing";

//Paragraphs
import TimeDefinition from "../paragraphs/TimeDefinition";

import useStore from "../../store";
import { timeline } from "animejs";

const World = () => {
  const { camera } = useThree();

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
  // useFrame(({ clock }) => {
  //   // mesh.current && mesh.current.position.set(...pos.current);
  //   // mesh.current && mesh.current.rotation.set(...rot.current);
  //   if (mesh.current) {
  //     position += 0.001;
  //     var point = line.getPoint(position);
  //     const { x, y, z } = point;
  //     mesh.current.position.set(...[x, y, z]);
  //     const angle = getAngle(position);
  //     camera.position.z = z + 2;
  //     mesh.current.quaternion.setFromAxisAngle(
  //       new THREE.Vector3(0, 0, 1),
  //       angle
  //     );
  //   }
  // });

  // const foldOffset = 15000 - window.innerHeight;
  // const foldDuration = 15000;

  // const initalTPOffset = 2000 - window.innerHeight;
  // const initialTPDuration = 1000;

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

  function createSpiralPathFromCoordinateWithRadius({
    coordinate = [0, 0, 0],
    radius = 1,
    spirals = 5,
    heightDivider = 2,
    direction = -1,
  }) {
    let vector3Array = [];

    const x = coordinate[0];
    const y = coordinate[1];
    const z = coordinate[2];

    for (let i = 0; i < spirals; i++) {
      const yCord = y + (radius / heightDivider) * direction * i;
      vector3Array.push(new THREE.Vector3(x, yCord, z));
      vector3Array.push(new THREE.Vector3(x - radius, yCord, z + radius));
      vector3Array.push(new THREE.Vector3(x, yCord, z + radius * 2));
      vector3Array.push(new THREE.Vector3(x + radius, yCord, z + radius));
    }
    return vector3Array;
  }

  const up = new THREE.Vector3(0, 0, -1);
  const axis = new THREE.Vector3();

  function animatePlane(percentage) {
    useStore.getState().paperPlane.setAnimationTime(percentage);
  }

  function animatePlaneToInitialTrajectoryPoint(fraction) {
    useStore
      .getState()
      .paperPlane.setInitialTrajectoryPointAnimationTime(fraction);
  }

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

  //position={[-200, 0, 500]}

  //   x: -170
  // y: 0
  // z: 510

  /** Line */
  const [points] = useState(() => {
    return [
      new THREE.Vector3(0, 0, 695.0),
      new THREE.Vector3(10, 5, 640.0),
      new THREE.Vector3(-40, -20, 580),
      new THREE.Vector3(-100, 5, 550),
      ...createSpiralPathFromCoordinateWithRadius({
        coordinate: [-200, 15, 490],
        radius: 15,
        spirals: 5,
        heightDivider: 5,
      }),

      new THREE.Vector3(-100, 0, 450),
      new THREE.Vector3(-50, 10, 400),

      // new THREE.Vector3(10, 0, 650),
      // new THREE.Vector3(-20, 5, 600),
      // new THREE.Vector3(-80, -10, 550),
      // new THREE.Vector3(-200, 50, 505),
    ];
  });

  const [line] = useState(() => {
    const c = new THREE.CatmullRomCurve3(points);
    c.tension = 1;
    c.arcLengthDivisions = 20000;
    c.curveType = "catmullrom";
    return c;
  });

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
    if (progress <= 15000) {
      animatePlane(progress);
    } else if (progress > 15000 && progress <= 17000) {
      const fraction = progress - 15000;
      animatePlaneToInitialTrajectoryPoint(fraction);
    } else if (progress > 17000) {
      const localProgress = progress - 17000;
      const fraction = localProgress / 20000;
      prevCameraPosition = camera.position;
      //FATSCRONAUT & TIME TEXT
      if (progress > 22000 && progress < 35000) {
        movePlane({
          fraction,
          isBackward,
          moveCamera: false,
        });

        const xFactor = isBackward ? 1 : -1;
        const yFactor = 1;
        const zFactor = 1;

        let cameraX;
        let cameraY;
        let cameraZ;

        if (isBackward) {
          cameraX = Math.min(
            -190,
            prevCameraPosition.x + (localProgress / 1000) * xFactor
          );
        } else {
          cameraX = Math.max(
            -190,
            prevCameraPosition.x + (localProgress / 1000) * xFactor
          );
        }
        cameraY = Math.min(
          13,
          prevCameraPosition.y + (localProgress / 1000) * yFactor
        );
        cameraZ = Math.min(
          550,
          prevCameraPosition.z + (localProgress / 1000) * zFactor
        );
        camera.position.set(...[cameraX, cameraY, cameraZ]);
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

  const floor = useRef();

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(
    line.getSpacedPoints(20000)
  );

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
        <Stars />
      </Suspense>

      <Effect />
      <Stats />

      <axesHelper args={[1000000]} />
    </>
  );
};

export default World;
