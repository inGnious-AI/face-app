import React, { useMemo } from "react";
import * as THREE from "three";

const ROOT_COLOR = new THREE.Color("#040302");
const TIP_COLOR = new THREE.Color("#45342c");

export default function HairStrands({ csv, objVertices, modelPosition, modelRotation }) {
    const parsed = useMemo(() => parseCSV(csv), [csv]);
    const rotationEuler = useMemo(() => new THREE.Euler(...modelRotation, "XYZ"), [modelRotation]);
    const translationVec = useMemo(() => new THREE.Vector3(...modelPosition), [modelPosition]);

    const lineSegments = useMemo(() => {
        const positions = [];
        const colors = [];

        for (let i = 0; i + 8 < parsed.length; i += 9) {
            const strandGroup = parsed.slice(i, i + 9);
            const strandPoints = [];

            for (let j = 0; j < 9; j++) {
                const row = strandGroup[j];
                const baseIdx = row.body_vertex_index;
                if (baseIdx < 0 || baseIdx >= objVertices.length) continue;

                const base = new THREE.Vector3(...objVertices[baseIdx])
                    .applyEuler(rotationEuler)
                    .add(translationVec);

                const delta = new THREE.Vector3(row.delta_x, row.delta_y, row.delta_z)
                    .applyEuler(rotationEuler);

                const hairPoint = base.clone().add(delta);
                strandPoints.push(hairPoint);
            }
            if (strandPoints.length === 9) {
                for (let k = 0; k < strandPoints.length - 1; k++) {
                    const start = strandPoints[k];
                    const end = strandPoints[k + 1];

                    positions.push(...start.toArray(), ...end.toArray());

                    // Gradient: interpolate color based on position in strand
                    const tStart = k / (strandPoints.length - 1);
                    const tEnd = (k + 1) / (strandPoints.length - 1);

                    const colorStart = ROOT_COLOR.clone().lerp(TIP_COLOR, tStart);
                    const colorEnd = ROOT_COLOR.clone().lerp(TIP_COLOR, tEnd);

                    colors.push(colorStart.r, colorStart.g, colorStart.b);
                    colors.push(colorEnd.r, colorEnd.g, colorEnd.b);
                }
            }
        }

        if (!positions.length) return null;

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3)); // enable vertex colors

        const material = new THREE.LineBasicMaterial({
            vertexColors: true,
            linewidth: 1,
        });

        return new THREE.Line(geometry, material);
    }, [parsed, objVertices, rotationEuler, translationVec]);
    if (!lineSegments) return null;

    return <primitive object={lineSegments} />;
}

// CSV Parser
function parseCSV(csvText) {
    if (!csvText) return [];
    const rows = csvText.trim().split("\n");
    if (rows.length < 2) return [];

    const header = rows[0].split(",");
    return rows.slice(1).map((line) => {
        const cols = line.split(",");
        const obj = {};
        header.forEach((h, i) => {
            obj[h.trim()] = cols[i] ? cols[i].trim() : "";
        });
        obj.hair_vertex_index = Number(obj.hair_vertex_index);
        obj.body_vertex_index = Number(obj.body_vertex_index);
        obj.delta_x = Number(obj.delta_x);
        obj.delta_y = Number(obj.delta_y);
        obj.delta_z = Number(obj.delta_z);
        return obj;
    });
}