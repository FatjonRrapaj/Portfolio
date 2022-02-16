import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

const useStore = create(
  subscribeWithSelector((set, get) => ({
    //TODO: set scrollstatus checks before each update.
    //TODO: separate initialAnimation,experience,shet,plane to different files
    //TODO: create state modifier function with key string as arguments (or don't do that)
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
      visible: false,
      //initial animations progress values
      initialJoinProgress: null,
      initialGoProgress: null,
      lastChanged: null,
      initialScaleProgress: null,
      experienceCubesToClockPositionProgress: null,
      experienceCubesToClockRotationProgress: null,

      //clock animation progress values
      toClockProgress: null,
      clockMoveProgress: null,
      timeDefinitionProgress: null,
      clockCloseProgress: null,
      timeDefinitionCloseProgress: null,

      //camel animation progress values
      cubesToCamelPositionProgress: null,
      cubesToCamelRotationProgress: null,
      toCamelProgress: null,
      camelMoveProgress: null,
      patienceDefinitionProgress: null,
      camelGoProgress: null,
      patienceDefitionCloseProgress: null,

      //android animation progress values
      cubesToAndroidPositionProgress: null,
      cubesToAndroidRotationProgress: null,
      toAndroidProgress: null,
      androidParagraphProgress: null,
      androidMoveProgress: null,
      androidGoProgress: null,
      androidParagraphCloseProgress: null,

      //apple animation progress values
      experienceCubesToApplePositionProgress: null,
      experienceCubesToAppleRotationProgress: null,
      toAppleProgress: null,
      appleParagraphProgress: null,
      appleParagraphCloseProgress: null,
      appleMoveProgress: null,
      appleGoProgress: null,

      //react animation progress values
      cubesToReactPositionProgress: null,
      cubesToReactRotationProgress: null,

      //flower
      flowerColorsProgress: null,
      toFlowerProgress: null,
      flowerParagraphProgress: null,
      flowerParagraphCloseProgress: null,

      //pineapple
      pineappleColorsProgress: null,
      toPineAppleProgress: null,
      pineappleParagraphProgress: null,
      pineappleParagraphCloseProgress: null,

      //cannon
      cannonColorsProgress: null,
      toCannonProgress: null,
      cannonParagraphProgress: null,
      cannonParagraphCloseProgress: null,

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

      setExperienceCubesToClockRotationProgress(
        experienceCubesToClockRotationProgress
      ) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              experienceCubesToClockRotationProgress,
              lastChanged: "experienceCubesToClockRotationProgress",
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
      setCubesToCamelRotationProgress(cubesToCamelRotationProgress) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              cubesToCamelRotationProgress,
              lastChanged: "cubesToCamelRotationProgress",
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
      setCubesToAndroidRotationProgress(cubesToAndroidRotationProgress) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              cubesToAndroidRotationProgress,
              lastChanged: "cubesToAndroidRotationProgress",
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
      setExperienceCubesToApplePositionProgress(
        experienceCubesToApplePositionProgress
      ) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              experienceCubesToApplePositionProgress,
              lastChanged: "experienceCubesToApplePositionProgress",
            },
          };
        });
      },
      setExperienceCubesToAppleRotationProgress(
        experienceCubesToAppleRotationProgress
      ) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              experienceCubesToAppleRotationProgress,
              lastChanged: "experienceCubesToAppleRotationProgress",
            },
          };
        });
      },
      setToAppleProgress(toAppleProgress) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              toAppleProgress,
              lastChanged: "toAppleProgress",
            },
          };
        });
      },
      setAppleParagraphProgress(appleParagraphProgress) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              appleParagraphProgress,
              lastChanged: "appleParagraphProgress",
            },
          };
        });
      },
      setAppleMoveProgress(appleMoveProgress) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              appleMoveProgress,
              lastChanged: "appleMoveProgress",
            },
          };
        });
      },
      setAppleGoProgress(appleGoProgress) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              appleGoProgress,
              lastChanged: "appleGoProgress",
            },
          };
        });
      },
      setAppleParagraphCloseProgress(appleParagraphCloseProgress) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              appleParagraphCloseProgress,
              lastChanged: "appleParagraphCloseProgress",
            },
          };
        });
      },
      setCubesToReactPositionProgress(cubesToReactPositionProgress) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              cubesToReactPositionProgress,
              lastChanged: "cubesToReactPositionProgress",
            },
          };
        });
      },
      setCubesToReactRotationProgress(cubesToReactRotationProgress) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              cubesToReactRotationProgress,
              lastChanged: "cubesToReactRotationProgress",
            },
          };
        });
      },
      setFlowerColorsProgress(flowerColorsProgress) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              flowerColorsProgress,
              lastChanged: "flowerColorsProgress",
            },
          };
        });
      },
      setToFLowerProgress(toFlowerProgress) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              toFlowerProgress,
              lastChanged: "toFlowerProgress",
            },
          };
        });
      },
      setFlowerParagraphProgress(flowerParagraphProgress) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              flowerParagraphProgress,
              lastChanged: "flowerParagraphProgress",
            },
          };
        });
      },
      setFlowerParagraphCloseProgress(flowerParagraphCloseProgress) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              flowerParagraphCloseProgress,
              lastChanged: "flowerParagraphCloseProgress",
            },
          };
        });
      },
      setPineappleColorsProgress(pineappleColorsProgress) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              pineappleColorsProgress,
              lastChanged: "pineappleColorsProgress",
            },
          };
        });
      },
      setToPinappleProgress(toPineAppleProgress) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              toPineAppleProgress,
              lastChanged: "toPineAppleProgress",
            },
          };
        });
      },
      setPineappleParagraphProgress(pineappleParagraphProgress) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              pineappleParagraphProgress,
              lastChanged: "pineappleParagraphProgress",
            },
          };
        });
      },
      setPineappleParagraphCloseProgress(pineappleParagraphCloseProgress) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              pineappleParagraphCloseProgress,
              lastChanged: "pineappleParagraphCloseProgress",
            },
          };
        });
      },
      setCannonColorsProgress(cannonColorsProgress) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              cannonColorsProgress,
              lastChanged: "cannonColorsProgress",
            },
          };
        });
      },
      setToCannonProgress(toCannonProgress) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              toCannonProgress,
              lastChanged: "toCannonProgress",
            },
          };
        });
      },
      setCannonParagraphProgress(cannonParagraphProgress) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              cannonParagraphProgress,
              lastChanged: "cannonParagraphProgress",
            },
          };
        });
      },
      setCannonParagraphCloseProgress(cannonParagraphCloseProgress) {
        set((state) => {
          return {
            experience: {
              ...state.experience,
              cannonParagraphCloseProgress,
              lastChanged: "cannonParagraphCloseProgress",
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
      planeToReactPositionProgress: null,
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
      setPlaneToReactPositionProgress(planeToReactPositionProgress) {
        set((state) => {
          return {
            plane: {
              ...state.plane,
              planeToReactPositionProgress,
              lastChanged: "planeToReactPositionProgress",
            },
          };
        });
      },
    },
  }))
);

export default useStore;
