const useObject = (set, get, key) => {
  return {
    [key]: {
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      rotationAngle: { axis: null, angle: null },
      move(position) {
        set((state) => ({
          [key]: {
            ...state[key],
            position,
          },
        }));
      },
      rotate(rotation) {
        set((state) => ({
          [key]: {
            ...state[key],
            rotation,
          },
        }));
      },
      setRotationAngle(axis, angle) {
        set((state) => ({
          [key]: {
            ...state[key],
            axis,
            angle,
          },
        }));
      },
    },
  };
};

export default useObject;
