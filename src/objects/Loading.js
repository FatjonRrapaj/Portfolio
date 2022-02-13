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
    <group position={[2, 1, 686]} rotation={[0, Math.PI / 8, 0]}>
      <Text position={[-13, 0, 0]} ref={text} children="JUST" />
      <Text ref={text} children="SCROLL" />
    </group>
  );
}

export default forwardRef(LoadingText);
