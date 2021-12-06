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
import Effect from "../../postprocessing";

import useStore from "../../store";

const World = () => {
  const { camera } = useThree();

  /** Window event listener handlers */
  const divContainer = document.getElementById("fly");
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
    evt.deltaY *= 0.0001;
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
    animatePlane(percentage);
  }

  let planeRotationAngle = 0;

  function createSpiralPathFromCoordinateWithRadius({
    coodinate = [0, 0, 0],
    radius = 1,
    spirals = 5,
  }) {
    let vector3Array = [];

    const x = coodinate[0];
    const y = coodinate[1];
    const z = coodinate[2];

    for (let i = 0; i < spirals; i++) {
      const yCord = y - (radius / 2) * i;
      vector3Array.push(new THREE.Vector3(x, yCord, z));
      vector3Array.push(new THREE.Vector3(x - radius, yCord, z + radius));
      vector3Array.push(new THREE.Vector3(x, yCord, z + radius * 2));
      vector3Array.push(new THREE.Vector3(x + radius, yCord, z + radius));
    }
    console.log(
      "LAST COORD CREATED FROM SPIRAL: ",
      vector3Array[vector3Array.length - 1]
    );
    return vector3Array;
  }

  const up = new THREE.Vector3(0, 0, -1);
  const axis = new THREE.Vector3();

  function animatePlane(percentage) {
    const point = line.getPoint(percentage);
    const { x, y, z } = point;
    useStore.getState().paperPlane.move([x, y, z]);

    const tangent = line.getTangent(percentage);
    axis.crossVectors(up, tangent).normalize();
    const radians = Math.acos(up.dot(tangent));

    useStore.getState().paperPlane.setRotationAngle(axis, radians);

    //move plane x,y,z
    //move camera z
    //move angle
    camera.position.set(...[x, y + 3, z + 10]);
  }

  function getAngle(percentage) {
    // get the 2Dtangent to the curve
    var tangent = line.getTangent(percentage).normalize();

    // change tangent to 3D
    planeRotationAngle = -Math.atan(tangent.x / tangent.y);

    return planeRotationAngle;
  }

  /** Line */
  const [points] = useState(() => {
    return [
      new THREE.Vector3(0, 0, 695.0),
      new THREE.Vector3(0, 0, 690),
      new THREE.Vector3(2, 1, 690),
      new THREE.Vector3(2, 2, 685),
      ...createSpiralPathFromCoordinateWithRadius({
        coodinate: [2, 2, 680],
        radius: 4,
        spirals: 10,
      }),
      new THREE.Vector3(2, -2, 595.0),
      new THREE.Vector3(2, 2, 195.0),
      new THREE.Vector3(-2, -2, 95.0),
      new THREE.Vector3(4, 1, 5.0),
    ];
  });

  const [line] = useState(() => {
    const c = new THREE.CatmullRomCurve3(points);
    c.tension = 1;
    c.arcLengthDivisions = 20000;
    c.curveType = "catmullrom";
    return c;
  });

  useEffect(() => {
    //Scroll & resize event listeners
    divContainer.addEventListener("wheel", onWheel, false);
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      divContainer.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  //   const [timeline] = useState(() =>
  //   anime.timeline({
  //     autoplay: false,
  //     duration: 1000,
  //   })
  // );

  //   useEffect(() => {
  //     timeline.add({
  //       targets: null,
  //       translateX: line.x,
  //       translateY: line.y,
  //       translateZ: line.z,
  //       onchange(e) {
  //         console.log("E", e);
  //       },
  //       duration: 1000,
  //     });
  //     console.log(timeline);
  //   }, []);

  const floor = useRef();

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(
    line.getSpacedPoints(20000)
  );

  return (
    <>
      <line geometry={lineGeometry}>
        <lineBasicMaterial
          attach="material"
          color={"#9c88ff"}
          linewidth={10}
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
      <Effect />
      <Stats />

      <axesHelper args={[1000000]} />
    </>
  );
};

export default World;
