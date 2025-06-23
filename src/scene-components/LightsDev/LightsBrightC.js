import React, { useRef, useEffect } from "react";
import { SpotLightHelper } from "three";
import { useHelper } from "@react-three/drei";
import { useControls } from "leva";

export const LightsBrightC = ({ lightColor }) => {
  // Create refs for spotlights
  const spotLightRef1 = useRef();
  const spotLightRef2 = useRef();
  const spotLightRef3 = useRef();
  const spotLightRef4 = useRef();
  const spotLightRef5 = useRef();

  // Add helpers for each spotlight if enabled
  const useSpotLightHelper = (ref, enabled) => {
    useHelper(enabled ? ref : null, SpotLightHelper);
  };

  // Define controls for each spotlight
  const spotlight1 = useControls("Spotlight 1", {
    enabled: true,
    castShadow: true,
    helper: false,
    position: { value: [0.31, 1.98, 2.90], step: 0.01 },
    target: { value: [0, 0.95, 0], step: 0.01 },
    angle: { value: 0.4, min: 0, max: Math.PI / 2, step: 0.01 },
    penumbra: { value:  0.9, min: 0, max: 1, step: 0.01 },
    intensity: { value:11.0 , min: 0, max: 100, step: 0.01 },
    decay: { value: 1.8, min: 0, max: 2, step: 0.01 },
    distance: { value: 5.93, min: 0, max: 100, step: 0.01 },
    shadowMapWidth: { value: 1080, min: 256, max: 4096, step: 1 },
    shadowMapHeight: { value: 1080, min: 256, max: 4096, step: 1 },
    shadowCameraNear: { value: 1, min: 0.1, max: 10, step: 0.1 },
    shadowCameraFar: { value: 10, min: 1, max: 100, step: 1 },
    shadowBias: {
      value: -0.0006000000000000001,
      min: -0.01,
      max: 0.01,
      step: 0.0001,
    },
  });

  const spotlight2 = useControls("Spotlight 2", {
    enabled: true,
    castShadow: true,
    helper: false,
    position: { value: [0.06, 11.66, 0.4], step: 0.01 },
    target: { value:  [0, -14.21, 0], step: 0.01 },
    angle: { value: 1.57, min: 0, max: Math.PI / 2, step: 0.01 },
    penumbra: { value: 1, min: 0, max: 1, step: 0.01 },
    intensity: { value: 1.5, min: 0, max: 100, step: 0.01 },
    decay: { value: 0.75, min: 0, max: 2, step: 0.01 },
    distance: { value: 50.79, min: 0, max: 100, step: 0.01 },
    shadowMapWidth: { value: 1080, min: 256, max: 4096, step: 1 },
    shadowMapHeight: { value: 1080, min: 256, max: 4096, step: 1 },
    shadowCameraNear: { value: 0.1, min: 0.1, max: 10, step: 0.1 },
    shadowCameraFar: { value: 1, min: 1, max: 100, step: 1 },
    shadowBias: {
      value: -0.0006000000000000001,
      min: -0.01,
      max: 0.01,
      step: 0.0001,
    },
  });

  const spotlight3 = useControls("Spotlight 3", {
    enabled: true,
    castShadow: true,
    helper: false,
    position: { value: [0.0, 1.51, -5.21], step: 0.01 },
    target: { value:  [0, 0.40, 0], step: 0.01 },
    angle: { value: 0.41, min: 0, max: Math.PI / 2, step: 0.01 },
    penumbra: { value: 0.9, min: 0, max: 1, step: 0.01 },
    intensity: { value: 29.63, min: 0, max: 100, step: 0.01 },
    decay: { value:  1.10, min: 0, max: 2, step: 0.01 },
    distance: { value: 6.5, min: 0, max: 100, step: 0.1 },
    shadowMapWidth: { value: 1080, min: 256, max: 4096, step: 1 },
    shadowMapHeight: { value: 1080, min: 256, max: 4096, step: 1 },
    shadowCameraNear: { value: 1, min: 0.1, max: 10, step: 0.1 },
    shadowCameraFar: { value: 12, min: 1, max: 100, step: 1 },
    shadowBias: { value: -0.01, min: -0.01, max: 0.01, step: 0.0001 },
  });

  const spotlight4 = useControls("Spotlight 4", {
    enabled: true,
    castShadow: true,
    helper: false,
    position: { value: [2.47, 1.26, 1.11], step: 0.01 },
    target: { value: [-62.46, -22.00, -33.6], step: 0.01 },
    angle: { value: 0.58, min: 0, max: Math.PI / 2, step: 0.01 },
    penumbra: { value: 0.9, min: 0, max: 1, step: 0.01 },
    intensity: { value: 16.0, min: 0, max: 100, step: 0.01 },
    decay: { value:0.12, min: 0, max: 2, step: 0.01 },
    distance: { value: 3, min: 0, max: 100, step: 0.01 },
    shadowMapWidth: { value: 1080, min: 256, max: 4096, step: 1 },
    shadowMapHeight: { value: 1080, min: 256, max: 4096, step: 1 },
    shadowCameraNear: { value: 1, min: 0.1, max: 10, step: 0.1 },
    shadowCameraFar: { value: 10, min: 1, max: 100, step: 1 },
    shadowBias: { value: -0.001, min: -0.01, max: 0.01, step: 0.0001 },
  });

  const spotlight5 = useControls("Spotlight 5", {
    enabled: true,
    castShadow: true,
    helper: false,
    position: { value: [-3.21, 1.03, 2.97], step: 0.01 },
    target: { value: [0.1, 0.33, -0.18], step: 0.01 },
    angle: { value: 0.41, min: 0, max: Math.PI / 2, step: 0.01 },
    penumbra: { value: 0.9, min: 0, max: 1, step: 0.01 },
    intensity: { value: 16.0, min: 0, max: 100, step: 0.01 },
    decay: { value: 1.10, min: 0, max: 2, step: 0.01 },
    distance: { value: 6, min: 0, max: 100, step: 0.01 },
    shadowMapWidth: { value: 1080, min: 256, max: 4096, step: 1 },
    shadowMapHeight: { value: 1080, min: 256, max: 4096, step: 1 },
    shadowCameraNear: { value: 1, min: 0.1, max: 10, step: 0.1 },
    shadowCameraFar: { value: 10, min: 1, max: 100, step: 1 },
    shadowBias: { value: -0.0015, min: -0.01, max: 0.01, step: 0.0001 },
  });

  useEffect(() => {
    if (spotLightRef1.current?.target) {
      const [x, y, z] = spotlight1.target;
      spotLightRef1.current.target.position.set(x, y, z);
      spotLightRef1.current.target.updateMatrixWorld(); // Ensure the target updates in the scene
    }
    if (spotLightRef2.current?.target) {
      const [x, y, z] = spotlight2.target;
      spotLightRef2.current.target.position.set(x, y, z);
      spotLightRef2.current.target.updateMatrixWorld(); // Ensure the target updates in the scene
    }
    if (spotLightRef3.current?.target) {
      const [x, y, z] = spotlight3.target;
      spotLightRef3.current.target.position.set(x, y, z);
      spotLightRef3.current.target.updateMatrixWorld(); // Ensure the target updates in the scene
    }
    if (spotLightRef4.current?.target) {
      const [x, y, z] = spotlight4.target;
      spotLightRef4.current.target.position.set(x, y, z);
      spotLightRef4.current.target.updateMatrixWorld(); // Ensure the target updates in the scene
    }

    if (spotLightRef5.current?.target) {
      const [x, y, z] = spotlight5.target;
      spotLightRef5.current.target.position.set(x, y, z);
      spotLightRef5.current.target.updateMatrixWorld(); // Ensure the target updates in the scene
    }
  }, [
    spotLightRef1,
    spotlight1?.target,
    spotLightRef2,
    spotlight2?.target,
    spotLightRef3,
    spotlight3?.target,
    spotLightRef4,
    spotlight4?.target,
    spotLightRef5,
    spotlight5?.target,
  ]);

  useSpotLightHelper(spotLightRef1, spotlight1.helper);
  useSpotLightHelper(spotLightRef2, spotlight2.helper);

  useSpotLightHelper(spotLightRef3, spotlight3.helper);
  useSpotLightHelper(spotLightRef4, spotlight4.helper);

  useSpotLightHelper(spotLightRef5, spotlight5.helper);

  return (
    <>
      {spotlight1.enabled && (
        <spotLight
          ref={spotLightRef1}
          position={spotlight1.position}
          angle={spotlight1.angle}
          penumbra={spotlight1.penumbra}
          color={lightColor}
          decay={spotlight1.decay}
          distance={spotlight1.distance}
          intensity={spotlight1.intensity}
          castShadow={spotlight1.castShadow}
          shadow-mapSize-width={spotlight1.shadowMapWidth}
          shadow-mapSize-height={spotlight1.shadowMapHeight}
          shadow-camera-near={spotlight1.shadowCameraNear}
          shadow-camera-far={spotlight1.shadowCameraFar}
          shadow-bias={spotlight1.shadowBias}
        />
      )}

      {spotlight2.enabled && (
        <spotLight
          ref={spotLightRef2}
          position={spotlight2.position}
          angle={spotlight2.angle}
          penumbra={spotlight2.penumbra}
          color={lightColor}
          decay={spotlight2.decay}
          distance={spotlight2.distance}
          intensity={spotlight2.intensity}
          castShadow={spotlight2.castShadow}
          shadow-mapSize-width={spotlight2.shadowMapWidth}
          shadow-mapSize-height={spotlight2.shadowMapHeight}
          shadow-camera-near={spotlight2.shadowCameraNear}
          shadow-camera-far={spotlight2.shadowCameraFar}
          shadow-bias={spotlight2.shadowBias}
        />
      )}

      {spotlight3.enabled && (
        <spotLight
          ref={spotLightRef3}
          position={spotlight3.position}
          angle={spotlight3.angle}
          penumbra={spotlight3.penumbra}
          color={lightColor}
          decay={spotlight3.decay}
          distance={spotlight3.distance}
          intensity={spotlight3.intensity}
          castShadow={spotlight3.castShadow}
          shadow-mapSize-width={spotlight3.shadowMapWidth}
          shadow-mapSize-height={spotlight3.shadowMapHeight}
          shadow-camera-near={spotlight3.shadowCameraNear}
          shadow-camera-far={spotlight3.shadowCameraFar}
          shadow-bias={spotlight3.shadowBias}
        />
      )}
      {spotlight4.enabled && (
        <spotLight
          ref={spotLightRef4}
          position={spotlight4.position}
          angle={spotlight4.angle}
          penumbra={spotlight4.penumbra}
          color={lightColor}
          decay={spotlight4.decay}
          distance={spotlight4.distance}
          intensity={spotlight4.intensity}
          castShadow={spotlight4.castShadow}
          shadow-mapSize-width={spotlight4.shadowMapWidth}
          shadow-mapSize-height={spotlight4.shadowMapHeight}
          shadow-camera-near={spotlight4.shadowCameraNear}
          shadow-camera-far={spotlight4.shadowCameraFar}
          shadow-bias={spotlight4.shadowBias}
        />
      )}
      {spotlight5.enabled && (
        <spotLight
          ref={spotLightRef5}
          position={spotlight5.position}
          angle={spotlight5.angle}
          penumbra={spotlight5.penumbra}
          shadow-radius={5}
          color={lightColor}
          decay={spotlight5.decay}
          distance={spotlight5.distance}
          intensity={spotlight5.intensity}
          castShadow={spotlight5.castShadow}
          shadow-mapSize-width={spotlight5.shadowMapWidth}
          shadow-mapSize-height={spotlight5.shadowMapHeight}
          shadow-camera-near={spotlight5.shadowCameraNear}
          shadow-camera-far={spotlight5.shadowCameraFar}
          shadow-bias={spotlight5.shadowBias}
        />
      )}
    </>
  );
};
