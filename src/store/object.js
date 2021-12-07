import { nameOf } from "../helpers/string";

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
      move(position) {
        set((state) => ({
          [key]: {
            ...state[key],
            lastChanged: nameOf(position),
            position,
          },
        }));
      },
      rotate(rotation) {
        set((state) => ({
          [key]: {
            ...state[key],
            lastChanged: nameOf(rotation),
            rotation,
          },
        }));
      },
      setRotationAngle(rotationAngle) {
        set((state) => ({
          [key]: {
            ...state[key],
            lastChanged: nameOf(rotationAngle),
            rotationAngle,
          },
        }));
      },
      setScaleFactor(scaleFactor) {
        set((state) => ({
          [key]: {
            ...state[key],
            lastChanged: nameOf(scaleFactor),
            scaleFactor,
          },
        }));
      },
      setAnimationTime(animationTime) {
        set((state) => ({
          [key]: {
            ...state[key],
            lastChanged: nameOf(animationTime),
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
            lastChanged: nameOf(initialTrajectoryPointAnimationTime),
            initialTrajectoryPointAnimationTime,
          },
        }));
      },
      setProgress(progress) {
        set((state) => ({
          [key]: {
            ...state[key],
            lastChanged: nameOf(progress),
            progress,
          },
        }));
      },
    },
  };
};

export default useObject;
