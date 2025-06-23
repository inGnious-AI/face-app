import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { CameraControls, useHelper } from "@react-three/drei";
import { useControls, button, buttonGroup, folder } from "leva";
import { debounce } from "lodash";

const { DEG2RAD } = THREE.MathUtils;
const Camera = ({ cameraControlsRef }) => {
  const { invalidate, camera, gl, scene } = useThree();

  // const helper = new THREE.CameraHelper(camera);
  // scene.add(helper);

  // useControls({
  //   moveTo: folder(
  //     {
  //       vec1: { value: [3, 5, 2], label: "vec" },
  //       "moveTo(…vec)": button((get) =>
  //         cameraControlsRef.current?.moveTo(...get("moveTo.vec1"), true)
  //       ),
  //     },
  //     { collapsed: true }
  //   ),

  //   setPosition: folder(
  //     {
  //       vec2: { value: [-5, 2, 1], label: "vec" },
  //       "setPosition(…vec)": button((get) =>
  //         cameraControlsRef.current?.setPosition(
  //           ...get("setPosition.vec2"),
  //           true
  //         )
  //       ),
  //     },
  //     { collapsed: true }
  //   ),
  //   setTarget: folder(
  //     {
  //       vec3: { value: [3, 0, -3], label: "vec" },
  //       "setTarget(…vec)": button((get) =>
  //         cameraControlsRef.current?.setTarget(...get("setTarget.vec3"), true)
  //       ),
  //     },
  //     { collapsed: true }
  //   ),
  //   setLookAt: folder(
  //     {
  //       vec4: { value: [1, 2, 3], label: "position" },
  //       vec5: { value: [1, 1, 0], label: "target" },
  //       "setLookAt(…position, …target)": button((get) =>
  //         cameraControlsRef.current?.setLookAt(
  //           ...get("setLookAt.vec4"),
  //           ...get("setLookAt.vec5"),
  //           true
  //         )
  //       ),
  //     },
  //     { collapsed: true }
  //   ),

  //   saveState: button(() => cameraControlsRef.current?.saveState()),
  //   reset: button(() => cameraControlsRef.current?.reset(true)),
  // });
  useEffect(() => {
    const handleClick = (event) => {
      if (cameraControlsRef.current) {
        cameraControlsRef.current.setLookAt(
          0,
          1.6,
          6, // Camera position (x, y, z)
          0,
          0.9,
          0, // Target position (x, y, z)
          true // Enable smooth transition
        );
      }
    };

    document.getElementById("views")?.addEventListener("dblclick", handleClick);
  }, [cameraControlsRef]);

  useEffect(() => {
    if (cameraControlsRef.current) {
      // Set the initial camera position and target
      cameraControlsRef.current.setLookAt(
        0,
        1.6,
        6, // Camera position (x, y, z)
        0,
        0.9,
        0, // Target position (x, y, z)
        true // Enable smooth transition
      );
    }
  }, [cameraControlsRef]);

  return (
    <CameraControls
      ref={cameraControlsRef}
      fov={21}
      makeDefault={true}
      // enabled={isDragging}
      // verticalDragToForward={verticalDragToForward}
      // dollyToCursor={dollyToCursor}
      // infinityDolly={infinityDolly}

      maxPolarAngle={1.35}
      minPolarAngle={1.35}
      minDistance={0.5} // Set the minimum zoom distance
      maxDistance={6} // Set the maximum zoom distance

      // }}
    />
  );
};

export default Camera;
