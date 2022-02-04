export function lerp(a, b, t) {
  return (1 - t) * a + t * b;
}

/**
 * this function handles gltf animation seeking, which are more complicated than the plain animation seeking from anime JS as they have their own time and mixer
 * @param {object} animation is a gltf action (animation) that's imported from gltf model that's imported from blender and converted to a jsx component using gltfjsx from https://github.com/pmndrs/gltfjsx
 * @param {number} progress is the value emited from the generic timeline from animHandler.js for the specific action
 * @param {object} playbackControllerRef is a ref that is used to check if the naimation is being played backwards
 * @param {number} adjustment is an optional value provided to avoid animation glitches
 * @param {number | null} customAnimationDuration is an optional value provided to change the animation duration default value
 */
export function seekGltfAnimation(
  animation,
  progress,
  playbackControllerRef,
  adjustment = 0.1,
  customAnimationDuration = null
) {
  if (!animation) return;
  animation.reset();
  animation.clampWhenFinished = true;
  animation.repetitions = 1;
  if (customAnimationDuration) {
    animation.setDuration(customAnimationDuration);
  }
  //check if animation is playing backwards
  if (playbackControllerRef.current > progress) {
    if (customAnimationDuration) {
      //TODO: delete the lines 34-38, set custom glt animation durations to 1000 and replace them with this new functionality (line 31)
      animation._mixer.setTime(progress * 100);
      return;
    }
    animation.timeScale = -1;
    animation.time = adjustment;
    animation.startAt(animation._clip.duration);
    //TODO: seek the animation when playing backwards too
    animation.play();
  } else {
    //animation is playing forward
    animation.timeScale = 1;
    animation.play();
    animation._mixer.setTime((animation._clip.duration * progress) / 100);
  }
  //very important
  playbackControllerRef.current = progress;
}
