import { Vector3 } from "three";

function createSpiralPathFromCoordinateWithRadius({
  coordinate = [0, 0, 0],
  radius = 1,
  spirals = 5,
  heightDivider = 2,
  direction = -1,
  type = null,
}) {
  let vector3Array = [];
  const x = coordinate[0];
  const y = coordinate[1];
  const z = coordinate[2];
  for (let i = 0; i < spirals; i++) {
    const yCord = y + (radius / heightDivider) * direction * i;
    const v1 = new Vector3(x, yCord, z);
    const v2 = new Vector3(x - radius, yCord, z + radius);
    const v3 = new Vector3(x, yCord, z + radius * 2);
    const v4 = new Vector3(x + radius, yCord, z + radius);

    vector3Array.push(v1);
    if (type === "double") vector3Array.push(v1);
    if (type === "twisted")
      vector3Array.push(new Vector3(v1.x + 2, v1.y + 2, v1.z + 2));
    if (type === "twistedDown")
      vector3Array.push(new Vector3(v1.x - 2, v1.y - 2, v1.z - 2));

    // vector3Array.push(new Vector3(x +2, yCord +2, z +2));
    vector3Array.push(v2);
    if (type === "double") vector3Array.push(v2);
    if (type === "twisted")
      vector3Array.push(new Vector3(v2.x + 2, v2.y + 2, v2.z + 2));
    if (type === "twistedDown")
      vector3Array.push(new Vector3(v2.x - 2, v2.y - 2, v2.z - 2));

    // vector3Array.push(new Vector3(x - radius +2, yCord +2, z + radius +2));
    vector3Array.push(v3);
    if (type === "double") vector3Array.push(v3);
    if (type === "twisted")
      vector3Array.push(new Vector3(v3.x + 2, v3.y + 2, v3.z + 2));
    if (type === "twistedDown")
      vector3Array.push(new Vector3(v3.x - 2, v3.y - 2, v3.z - 2));

    // vector3Array.push(new Vector3(x +2, yCord +2, z + radius * 2 +2));
    vector3Array.push(v4);
    if (type === "double") vector3Array.push(v4);
    if (type === "twisted")
      vector3Array.push(new Vector3(v4.x + 2, v4.y + 2, v4.z + 2));
    if (type === "twistedDown")
      vector3Array.push(new Vector3(v4.x - 2, v4.y - 2, v4.z - 2));
  }

  const lastPosition = vector3Array[vector3Array.length - 1];

  return { points: vector3Array, lastPosition };
}

export default createSpiralPathFromCoordinateWithRadius;
