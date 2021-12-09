import * as THREE from "three";

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

export default createSpiralPathFromCoordinateWithRadius;