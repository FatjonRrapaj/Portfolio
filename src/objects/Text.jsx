import { Vector3 } from "three";
import React, { useMemo, useRef, useLayoutEffect } from "react";
import { extend, useLoader } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import boldUrl from "../fonts/bold.blob";

extend({ TextGeometry });

export default function Text({
  children,
  vAlign = "center",
  hAlign = "center",
  size = 1.5,
  color = "#000000",
  ...props
}) {
  const font = useLoader(FontLoader, boldUrl);
  const config = useMemo(
    () => ({
      font,
      size: 40,
      height: 10,
      curveSegments: 32,
      bevelEnabled: true,
      bevelThickness: 6,
      bevelSize: 2,
      bevelOffset: -0.1,
      bevelSegments: 8,
    }),
    [font]
  );
  const mesh = useRef();
  useLayoutEffect(() => {
    const size = new Vector3();
    mesh.current.geometry.computeBoundingBox();
    mesh.current.geometry.boundingBox.getSize(size);
    mesh.current.position.x =
      hAlign === "center" ? -size.x / 2 : hAlign === "right" ? 0 : -size.x;
    mesh.current.position.y =
      vAlign === "center" ? -size.y / 2 : vAlign === "top" ? 0 : -size.y;
  }, [children]);
  return (
    <group {...props} scale={[0.05 * size, 0.05 * size, 0.05]}>
      <mesh ref={mesh}>
        <textGeometry args={[children, config]} />
        <meshNormalMaterial />
      </mesh>
    </group>
  );
}
