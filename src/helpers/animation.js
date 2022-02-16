import { LoopRepeat } from "three";

export function lerp(a, b, t) {
  return (1 - t) * a + t * b;
}

/**
 * this function handles gltf animation seeking, which are more complicated than the plain animation seeking from anime JS as they have their own time and mixer
 * @param {object} animation gltf action (animation) that's imported from gltf model that's imported from blender and converted to a jsx component using gltfjsx from https://github.com/pmndrs/gltfjsx
 * @param {number} progress  value emited from the generic timeline from animHandler.js for the specific action
 * @param {object} playbackControllerRef is a ref that is used to check if the naimation is being played backwards
 * @param {number | null} customAnimationDuration is an optional value provided to change the animation duration default value
 * @param {boolean} clampWhenFinished i optional value provided to set animation clampWhenFinished https://threejs.org/docs/#api/en/animation/AnimationAction.clampWhenFinished
 * @param {boolean} onlyOnce optional value provided if the animation should be played only once
 */
export function seekGltfAnimation(
  animation,
  progress,
  playbackControllerRef,
  customAnimationDuration = null,
  clampWhenFinished = true,
  repetitions = 1
) {
  if (!animation) return;
  animation.reset();

  animation.clampWhenFinished = clampWhenFinished;
  animation.repetitions = repetitions;

  if (customAnimationDuration) {
    animation.setDuration(customAnimationDuration);
  }

  //check if animation is playing backwards
  if (playbackControllerRef.current > progress) {
    const factor = customAnimationDuration / 100;
    animation._mixer.setTime(progress * factor);
  } else {
    //animation is playing forward
    animation.timeScale = 1;
    animation._mixer.setTime((animation._clip.duration * progress) / 100);
    animation.play();
  }
  //very important
  playbackControllerRef.current = progress;
}
