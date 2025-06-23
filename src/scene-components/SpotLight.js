import { useRef } from "react";
import * as THREE from "three";
import { SpotLightHelper } from "three";
import { useHelper } from "@react-three/drei";
const SpotLight = ({ lightColor }) => {
  const lightRef = useRef();

  useHelper(lightRef, SpotLightHelper);

  return (
    <>
      <spotLight
        ref={lightRef}
        position={[0.083, 1.977, 0.97]}
        angle={0.494}
        penumbra={1}
        color={lightColor}
        decay={2}
        distance={0}
        intensity={10}
        castShadow
        shadow-mapSize-width={1080}
        shadow-mapSize-height={1080}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-bias={-0.001}
      />
    </>
  );
};

export default SpotLight;
