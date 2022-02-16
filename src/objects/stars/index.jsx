import { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import {
  TextureLoader,
  BufferGeometry,
  BufferAttribute,
  PointsMaterial,
  Color,
  AdditiveBlending,
} from "three";
function Stars() {
  const starTexture = useLoader(
    TextureLoader,
    process.env.PUBLIC_URL + "/star.png"
  );

  const { particlesMaterial, particlesGeometry } = useMemo(() => {
    const count = 10000;
    const distance = 1000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.3) * distance;
      colors[i] = Math.random();
    }
    const particlesGeometry = new BufferGeometry();
    particlesGeometry.setAttribute(
      "position",
      new BufferAttribute(positions, 3)
    );
    particlesGeometry.setAttribute("color", new BufferAttribute(colors, 3));
    // Material
    const particlesMaterial = new PointsMaterial();
    particlesMaterial.size = 1;
    particlesMaterial.color = new Color("#ff88cc");
    particlesMaterial.transparent = true;
    particlesMaterial.alphaMap = starTexture;
    particlesMaterial.alphaTest = 0.01;
    particlesMaterial.depthTest = false;
    particlesMaterial.depthWrite = false;
    particlesMaterial.blending = AdditiveBlending;
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
