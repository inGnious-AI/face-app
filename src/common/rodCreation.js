import React, { useEffect, useState } from "react";
import * as THREE from "three";

export default function RodBetweenVertices({
    mesh,
    indexA,
    indexB,
    color = "#30aab2",
    radius = 0.004,
}) {
    const [props, setProps] = useState(null);

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
        if (!posAttr || posAttr.count <= Math.max(indexA, indexB)) return;

        const localA = new THREE.Vector3().fromArray(posAttr.array, indexA * 3);
        const localB = new THREE.Vector3().fromArray(posAttr.array, indexB * 3);

        targetMesh.updateWorldMatrix(true, false);
        const worldA = localA.clone().applyMatrix4(targetMesh.matrixWorld);
        const worldB = localB.clone().applyMatrix4(targetMesh.matrixWorld);

        const direction = new THREE.Vector3().subVectors(worldB, worldA);
        const length = direction.length();

        const offsetAmount = 0.01; // tweak this
        const offset = direction.clone().normalize().multiplyScalar(offsetAmount);
        const mid = new THREE.Vector3().addVectors(worldA, worldB).multiplyScalar(0.5).add(offset);
        const quaternion = new THREE.Quaternion();
        quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());

        setProps({ position: mid, quaternion, length });
    }, [mesh, indexA, indexB]);

    if (!props) return null;

    return (
        <mesh position={props.position} quaternion={props.quaternion}>
            <cylinderGeometry args={[radius, radius, props.length, 256]} />
            <meshStandardMaterial color={color} transparent opacity={0.5} depthTest={false} />
        </mesh>
    );
}
