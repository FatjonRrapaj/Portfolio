import { Suspense, useState, useEffect, useRef, useMemo } from "react";
import * as THREE from "three";
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
  const floor = useRef();

  const divContainer = document.getElementById("fly");

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
    console.log("PLANE FLY SCROLL CONTAINER: ", e);
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

  /** Line */

  const points = useMemo(() => {
    return [
      new THREE.Vector3(4, 1, 0.2),
      new THREE.Vector3(3, 0.5, 0.5),
      new THREE.Vector3(0, 2, 0),
      new THREE.Vector3(2, -2, -8),
      new THREE.Vector3(-3, -2, -10),
    ];
  });

  let linePosition = 0;
  let lineAnlge = 0;

  const line = useMemo(() => {
    const c = new THREE.CatmullRomCurve3(points);
    c.tension = 1;
    c.arcLengthDivisions = 2000;
    c.curveType = "catmullrom";
    return c;
  });

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(
    line.getSpacedPoints(2000)
  );

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

  function getAngle(position) {
    // get the 2Dtangent to the curve
    var tangent = line.getTangent(position).normalize();

    // change tangent to 3D
    lineAnlge = -Math.atan(tangent.x / tangent.y);

    return lineAnlge;
  }

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
