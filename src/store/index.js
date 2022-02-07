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
      toClockProgress: null,
      visible: false,
      clockMoveProgress: null,
      timeDefinitionProgress: null,
      clockCloseProgress: null,
      timeDefinitionCloseProgress: null,
      cubesToCamelPositionProgress: null,
      toCamelProgress: null,
      camelMoveProgress: null,
      patienceDefinitionProgress: null,
      camelGoProgress: null,
      patienceDefitionCloseProgress: null,
      cubesToAndroidPositionProgress: null,
      toAndroidProgress: null,
      androidParagraphProgress: null,
      androidMoveProgress: null,
      androidGoProgress: null,
      androidParagraphCloseProgress: null,

      hide() {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              visible: false,
              lastChanged: "visible",
            },
          };
        });
      },
      show() {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              visible: true,
              lastChanged: "visible",
            },
          };
        });
      },
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
      setToClockProgress(toClockProgress) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              toClockProgress,
              lastChanged: "toClockProgress",
            },
          };
        });
      },
      setClockMoveProgress(clockMoveProgress) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              clockMoveProgress,
              lastChanged: "clockMoveProgress",
            },
          };
        });
      },
      setTimeDefinitionProgress(timeDefinitionProgress) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              timeDefinitionProgress,
              lastChanged: "timeDefinitionProgress",
            },
          };
        });
      },
      setClockCloseProgress(clockCloseProgress) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              clockCloseProgress,
              lastChanged: "clockCloseProgress",
            },
          };
        });
      },
      setTimeDefintionCloseProgress(timeDefinitionCloseProgress) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              timeDefinitionCloseProgress,
              lastChanged: "timeDefinitionCloseProgress",
            },
          };
        });
      },
      setCubesToCamelPositionProgress(cubesToCamelPositionProgress) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              cubesToCamelPositionProgress,
              lastChanged: "cubesToCamelPositionProgress",
            },
          };
        });
      },
      setToCamelProgress(toCamelProgress) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              toCamelProgress,
              lastChanged: "toCamelProgress",
            },
          };
        });
      },
      setCamelMoveProgress(camelMoveProgress) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              camelMoveProgress,
              lastChanged: "camelMoveProgress",
            },
          };
        });
      },
      setPatienceDefinitonProgress(patienceDefinitionProgress) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              patienceDefinitionProgress,
              lastChanged: "patienceDefinitionProgress",
            },
          };
        });
      },
      setCamelGoProgress(camelGoProgress) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              camelGoProgress,
              lastChanged: "camelGoProgress",
            },
          };
        });
      },
      setPatinceDefinitionCloseProgres(patienceDefitionCloseProgress) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              patienceDefitionCloseProgress,
              lastChanged: "patienceDefitionCloseProgress",
            },
          };
        });
      },
      setCubesToAndroidPositionProgress(cubesToAndroidPositionProgress) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              cubesToAndroidPositionProgress,
              lastChanged: "cubesToAndroidPositionProgress",
            },
          };
        });
      },
      setToAndroidProgress(toAndroidProgress) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              toAndroidProgress,
              lastChanged: "toAndroidProgress",
            },
          };
        });
      },
      setAndroidParagraphProgress(androidParagraphProgress) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              androidParagraphProgress,
              lastChanged: "androidParagraphProgress",
            },
          };
        });
      },
      setAndroidMoveProgress(androidMoveProgress) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              androidMoveProgress,
              lastChanged: "androidMoveProgress",
            },
          };
        });
      },
      setAndroidGoProgress(androidGoProgress) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              androidGoProgress,
              lastChanged: "androidGoProgress",
            },
          };
        });
      },
      setAndroidParagraphCloseProgress(androidParagraphCloseProgress) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              androidParagraphCloseProgress,
              lastChanged: "androidParagraphCloseProgress",
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
      planeToCamelProgres: null,
      planeToAndroidProgress: null,
      planeToAppleProgress: null,
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
      setPlaneToCamelProgress(planeToCamelProgres) {
        set((state) => {
          return {
            plane: {
              ...state.plane,
              planeToCamelProgres,
              lastChanged: "planeToCamelProgres",
            },
          };
        });
      },
      setPlaneToAndroidProgress(planeToAndroidProgress) {
        set((state) => {
          return {
            plane: {
              ...state.plane,
              planeToAndroidProgress,
              lastChanged: "planeToAndroidProgress",
            },
          };
        });
      },
      setPlaneToAppleProgress(planeToAppleProgress) {
        set((state) => {
          return {
            plane: {
              ...state.plane,
              planeToAppleProgress,
              lastChanged: "planeToAppleProgress",
            },
          };
        });
      },
    },
  }))
);

export default useStore;
