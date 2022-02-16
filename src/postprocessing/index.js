import { useEffect, useMemo } from "react";
import { WebGLRenderTarget, Vector2 } from "three";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { useControls } from "leva";

extend({ EffectComposer, ShaderPass, RenderPass });

function Effect() {
  const { gl, scene, camera, size } = useThree();

  useEffect(() => {}, []);

  // /**
  //  * Bloom Pass controls
  //  */
  // const { exposure, bloomThreshold, bloomRadius, bloomStrength } = useControls(
  //   "bloomPass",
  //   {
  //     exposure: {
  //       value: 1,
  //       min: 0,
  //       max: 5,
  //       step: 0.01,
  //     },
  //     bloomThreshold: {
  //       min: 0,
  //       max: 1,
  //       value: 0,
  //       step: 0.01,
  //     },
  //     bloomRadius: {
  //       min: 0,
  //       max: 5,
  //       step: 0.01,
  //       value: 1,
  //     },
  //     bloomStrength: {
  //       min: 0,
  //       max: 5,
  //       step: 0.01,
  //       value: 1,
  //     },
  //   }
  // );

  const effectComposer = useMemo(() => {
    const renderScene = new RenderPass(scene, camera);

    //renderer exposure
    gl.toneMappingExposure = Math.pow(1, 4.0);
    gl.autoClear = false;
    gl.antialias = true;

    const finalComposer = new EffectComposer(gl);
    const unrealBloomPass = new UnrealBloomPass(
      //resolution,
      //strength,
      //radius,
      //threshold
      new Vector2(size.width, size.height),
      1.5,
      1,
      0
    );
    finalComposer.addPass(renderScene);
    finalComposer.addPass(unrealBloomPass);
    return finalComposer;
  }, []);

  useEffect(() => {
    effectComposer.setSize(size.width, size.height);
  }, [effectComposer, size]);

  useFrame(() => {
    //APPLY EFFECTS TO A PARTICULAR LAYER.

    gl.autoClear = false;
    gl.clear();
    camera.layers.set(1);
    effectComposer.render();

    gl.clearDepth();
    camera.layers.set(2);
    gl.render(scene, camera);

    gl.clearDepth();
    camera.layers.set(3);
    gl.render(scene, camera);

    gl.clearDepth();
    camera.layers.set(0);
    gl.render(scene, camera);
  }, 1);

  return null;
}

export default Effect;
