import anime from "animejs/lib/anime.es";
import { useEffect, forwardRef, createRef } from "react";
import useStore from "../store";
import Text from "./Text";

function LoadingText() {
  const text = createRef();

  useEffect(() => {
    if (!text.current) return;
    const positionChange = anime({
      duration: 400,
      autoplay: false,
      targets: text.current.position,
      x: -10,
      y: 1,
      z: 688,
    });

    const unsubscribeStore = useStore.subscribe(
      (state) => state.initialAnimation,
      ({ progress }) => {
        positionChange.seek(progress);
      }
    );

    return () => {
      unsubscribeStore();
    };
  }, [text.current]);

  return (
    <Text
      ref={text}
      position={[0, 1, 688]}
      rotation={[0, Math.PI / 8, 0]}
      children="LOADING"
    />
  );
}

export default forwardRef(LoadingText);
