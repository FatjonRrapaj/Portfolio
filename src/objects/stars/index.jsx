import { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

function Stars() {
  const starTexture = useLoader(THREE.TextureLoader, "/star.png");

  const { particlesMaterial, particlesGeometry } = useMemo(() => {
    const count = 5000;
    const distance = 1000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.2) * distance;
      colors[i] = Math.random();
    }
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );
    // Material
    const particlesMaterial = new THREE.PointsMaterial();
    particlesMaterial.size = 1;
    particlesMaterial.color = new THREE.Color("#ff88cc");
    particlesMaterial.transparent = true;
    particlesMaterial.alphaMap = starTexture;
    particlesMaterial.alphaTest = 0.01;
    particlesMaterial.depthTest = false;
    particlesMaterial.depthWrite = false;
    particlesMaterial.blending = THREE.AdditiveBlending;
    particlesMaterial.vertexColors = true;
    return { particlesGeometry, particlesMaterial };
  });

  return (
    <points
      layers={1}
      material={particlesMaterial}
      geometry={particlesGeometry}
    />
  );
}

export default Stars;
