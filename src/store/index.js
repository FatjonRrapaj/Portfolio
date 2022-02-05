import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

import useObject from "./object";

const useStore = create(
  subscribeWithSelector((set, get) => ({
    ...useObject(set, get, "world"),
    ...useObject(set, get, "paperPlane"),
    ...useObject(set, get, "fatstronaut"),
    ...useObject(set, get, "sky"),
    ...useObject(set, get, "camera"),

    scrollStatus: {
      isScrolling: false,
      setIsSCrolling(isScrolling) {
        set((state) => ({
          scrollStatus: {
            ...state.scrollStatus,
            isScrolling,
          },
        }));
      },
    },

    //todo: change name to mutual animations
    initialAnimation: {
      //todo: change name to intial animations progress
      progress: null,
      planeAndSheetReverseOpacitiesProgress: null,
      lastChanged: null,
      setProgress(progress) {
        set((state) => {
          return {
            initialAnimation: {
              ...state.initialAnimation,
              progress,
              lastChanged: "progress",
            },
          };
        });
      },
      setPlaneAndSheetReverseOpacitiesProgress(
        planeAndSheetReverseOpacitiesProgress
      ) {
        set((state) => {
          return {
            initialAnimation: {
              ...state.initialAnimation,
              planeAndSheetReverseOpacitiesProgress,
              lastChanged: "planeAndSheetReverseOpacitiesProgress",
            },
          };
        });
      },
    },
    experience: {
      initialJoinProgress: null,
      initialGoProgress: null,
      lastChanged: null,
      initialScaleProgress: null,
      experienceCubesToClockPositionProgress: null,
      setInitialJoinProgress(initialJoinProgress) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              initialJoinProgress,
              lastChanged: "initialJoinProgress",
            },
          };
        });
      },
      setInitialScaleProgress(initialScaleProgress) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              initialScaleProgress,
              lastChanged: "initialScaleProgress",
            },
          };
        });
      },
      setInitialGoProgress(initialGoProgress) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              initialGoProgress,
              lastChanged: "initialGoProgress",
            },
          };
        });
      },
      setExperienceCubesToClockPositionProgress(
        experienceCubesToClockPositionProgress
      ) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              experienceCubesToClockPositionProgress,
              lastChanged: "experienceCubesToClockPositionProgress",
            },
          };
        });
      },
    },
    sheet: {
      moveToCenterProgress: null,
      rotateToSheetProgress: null,
      sheetProgress: null,
      backRotateProgress: null,
      fixSheetPositonbeforeConvertingToSheetProgress: null,
      lastChanged: null,
      setMoveToCenterProgress(moveToCenterProgress) {
        set((state) => {
          return {
            sheet: {
              ...state.sheet,
              moveToCenterProgress,
              lastChanged: "moveToCenterProgress",
            },
          };
        });
      },
      setRotateToSheetProgress(rotateToSheetProgress) {
        set((state) => {
          return {
            sheet: {
              ...state.sheet,
              rotateToSheetProgress,
              lastChanged: "rotateToSheetProgress",
            },
          };
        });
      },
      setSheetProgress(sheetProgress) {
        set((state) => {
          return {
            sheet: {
              ...state.sheet,
              sheetProgress,
              lastChanged: "sheetProgress",
            },
          };
        });
      },
      setBackRotateProgress(backRotateProgress) {
        set((state) => {
          return {
            sheet: {
              ...state.sheet,
              backRotateProgress,
              lastChanged: "backRotateProgress",
            },
          };
        });
      },
      setFixSheetPositonbeforeConvertingToSheetProgress(
        fixSheetPositonbeforeConvertingToSheetProgress
      ) {
        set((state) => {
          return {
            sheet: {
              ...state.sheet,
              fixSheetPositonbeforeConvertingToSheetProgress,
              lastChanged: "fixSheetPositonbeforeConvertingToSheet",
            },
          };
        });
      },
    },
    plane: {
      planeFoldingProgress: null,
      planeToInitialTrajectoryPointProgress: null,
      planeToClockProgress: null,
      lastChanged: null,
      setPlaneFoldingProgress(planeFoldingProgress) {
        set((state) => {
          return {
            plane: {
              ...state.plane,
              planeFoldingProgress,
              lastChanged: "planeFoldingProgress",
            },
          };
        });
      },
      setPlaneToInitialTrajectoryPointProgress(
        planeToInitialTrajectoryPointProgress
      ) {
        set((state) => {
          return {
            plane: {
              ...state.plane,
              planeToInitialTrajectoryPointProgress,
              lastChanged: "planeToInitialTrajectoryPointProgress",
            },
          };
        });
      },
      setPlaneToClockProgress(planeToClockProgress) {
        set((state) => {
          return {
            plane: {
              ...state.plane,
              planeToClockProgress,
              lastChanged: "planeToClockProgress",
            },
          };
        });
      },
    },
  }))
);

export default useStore;
