const useObject = (set, get, key) => {
  return {
    [key]: {
      position: null,
      rotation: null,
      rotationAngle: { axis: null, angle: null },
      animationTime: null,
      initialTrajectoryPointAnimationTime: null,
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
      setAnimationTime(animationTime) {
        set((state) => ({
          [key]: {
            ...state[key],
            animationTime,
          },
        }));
      },
      setInitialTrajectoryPointAnimationTime(
        initialTrajectoryPointAnimationTime
      ) {
        set((state) => ({
          [key]: {
            ...state[key],
            initialTrajectoryPointAnimationTime,
          },
        }));
      },
    },
  };
};

export default useObject;
