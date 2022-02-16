const useObject = (set, get, key) => {
  return {
    [key]: {
      position: null,
      rotation: null,
      rotationAngle: null,
      animationTime: null,
      initialTrajectoryPointAnimationTime: null,
      lastChanged: null,
      progress: null,
      scaleFactor: null,
      scrollY: null,
      scrollingStopped: null,

      move(position) {
        set((state) => ({
          [key]: {
            ...state[key],
            lastChanged: "position",
            position,
          },
        }));
      },
      rotate(rotation) {
        set((state) => ({
          [key]: {
            ...state[key],
            lastChanged: "rotation",
            rotation,
          },
        }));
      },
      setRotationAngle(rotationAngle) {
        set((state) => ({
          [key]: {
            ...state[key],
            lastChanged: "rotationAngle",
            rotationAngle,
          },
        }));
      },
      setScaleFactor(scaleFactor) {
        set((state) => ({
          [key]: {
            ...state[key],
            lastChanged: "scaleFactor",
            scaleFactor,
          },
        }));
      },
      setAnimationTime(animationTime) {
        set((state) => ({
          [key]: {
            ...state[key],
            lastChanged: "animationTime",
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
            lastChanged: "initialTrajectoryPointAnimationTime",
            initialTrajectoryPointAnimationTime,
          },
        }));
      },
      setScrollY(scrollY) {
        set((state) => ({
          [key]: {
            ...state[key],
            lastChanged: "scrollY",
            scrollY,
          },
        }));
      },
      setProgress(progress) {
        set((state) => ({
          [key]: {
            ...state[key],
            lastChanged: "progress",
            sameProgress: state.progress === progress,
            progress,
          },
        }));
      },
      setScrollingStopped(scrollingStopped) {
        set((state) => ({
          [key]: {
            ...state[key],
            lastChanged: "scrollingStopped",
            scrollingStopped,
          },
        }));
      },
    },
  };
};

export default useObject;
