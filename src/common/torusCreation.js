import React, { useEffect, useState, useMemo } from "react";
import * as THREE from "three";

export function createTorusGradientTexture(color = "#30aab2") {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  for (let i = 0; i <= 360; i++) {
    const angle = (i * Math.PI) / 180;
    const shifted = 0;
    // Use variable thickness for stylized, or set to a constant for uniform ring
    const thickness = (0.18 + 0.20 * Math.sin(shifted)) * size;
    ctx.save();
    ctx.translate(size / 2, size / 2);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.globalAlpha = 0.4; // Or 1 for fully opaque
    ctx.lineWidth = thickness;
    ctx.arc(0, 0, size / 2.5, 0, 0.04);
    ctx.stroke();
    ctx.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function TorusBetweenVertices({
  mesh,
  indexA,
  indexB,
  color = "#30aab2", // Use a teal/cyan color like your screenshot
  thickness = 0.006, // Thinner ring
}) {
  const [torusProps, setTorusProps] = useState(null);

  useEffect(() => {
    if (!mesh || !mesh.isObject3D) return;

    let targetMesh = null;

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

    const posA = posAttr.array.slice(indexA * 3, indexA * 3 + 3);
    const posB = posAttr.array.slice(indexB * 3, indexB * 3 + 3);

    const localA = new THREE.Vector3(...posA);
    const localB = new THREE.Vector3(...posB);

    // Convert to world positions
    targetMesh.updateWorldMatrix(true, false);
    const worldA = localA.clone().applyMatrix4(targetMesh.matrixWorld);
    const worldB = localB.clone().applyMatrix4(targetMesh.matrixWorld);

    const mid = new THREE.Vector3().addVectors(worldA, worldB).multiplyScalar(0.5);

    const distance = worldA.distanceTo(worldB);

    // Radius: half the distance + offset for body clearance
    const radius = distance / 2 + 0.04;

    const tiltAngle = Math.PI / 12; // ~15 degrees
    const quaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI / 2 + tiltAngle, 0, 0));
    setTorusProps({ position: mid, quaternion, radius });

  }, [mesh, indexA, indexB]);

  const gradientTexture = useMemo(() => createTorusGradientTexture(color), [color]);

  if (!torusProps) return null;

  return (
    <mesh position={torusProps.position} quaternion={torusProps.quaternion}>
      <torusGeometry args={[torusProps.radius, thickness, 32, 128, Math.PI * 2]} />
      <meshBasicMaterial
        map={gradientTexture}
        transparent
        opacity={0.85}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}