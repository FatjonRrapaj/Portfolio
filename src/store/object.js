const useObject = (set, get, key) => {
  return {
    [key]: {
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
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
    },
  };
};

export default useObject;
