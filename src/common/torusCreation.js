import React, { useEffect, useState } from "react";
import * as THREE from "three";

export default function TorusBetweenVertices({ mesh, indexA, indexB }) {
  const [torusProps, setTorusProps] = useState(null);

  useEffect(() => {
    if (!mesh || !mesh.isObject3D) return;

    let targetMesh = null;

    // Find the mesh with geometry
    mesh.traverse((child) => {
      if (child.isMesh && child.geometry?.attributes?.position) {
        targetMesh = child;
      }
    });

    if (!targetMesh) return;

    const posAttr = targetMesh.geometry.attributes.position;
    if (!posAttr || posAttr.count <= Math.max(indexA, indexB)) {
      console.warn("Invalid vertex indices");
      return;
    }

    // Local positions
    const posA = targetMesh.geometry.attributes.position.array.slice(
      indexA * 3,
      indexA * 3 + 3
    );
    const posB = targetMesh.geometry.attributes.position.array.slice(
      indexB * 3,
      indexB * 3 + 3
    );

    const localA = new THREE.Vector3(...posA);
    const localB = new THREE.Vector3(...posB);

    // Convert to world positions
    targetMesh.updateWorldMatrix(true, false);
    const worldA = localA.clone().applyMatrix4(targetMesh.matrixWorld);
    const worldB = localB.clone().applyMatrix4(targetMesh.matrixWorld);

    // Midpoint for torus position
    const mid = new THREE.Vector3().addVectors(worldA, worldB).multiplyScalar(0.5);

    // Direction from A to B
    const dir = new THREE.Vector3().subVectors(worldB, worldA).normalize();

    // Rotate torus to align with the direction vector
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0), // default torus up (Y axis)
      dir
    );

    setTorusProps({ position: mid, quaternion });
  }, [mesh, indexA, indexB]);

  if (!torusProps) return null;

  return (
    <mesh position={torusProps.position} quaternion={torusProps.quaternion}>
      <torusGeometry args={[0.12, 0.005, 8, 32]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}
