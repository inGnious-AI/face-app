export function customisedLoader(objText) {
    const positions = [];
    const uvs = [];
    const normals = [];

    const tempVertices = [];
    const tempUvs = [];
    const tempNormals = [];

    // Group handling
    const groups = [];
    let currentMaterial = null;
    let currentGroupStart = 0;

    const lines = objText.split('\n');
    for (let line of lines) {
        line = line.trim();
        if (line.startsWith('v ')) {
            const parts = line.split(/\s+/);
            tempVertices.push([+parts[1], +parts[2], +parts[3]]);
        } else if (line.startsWith('vt ')) {
            const parts = line.split(/\s+/);
            const u = +parts[1];
            const v = 1 - +parts[2];
            tempUvs.push([u, v]);
        } else if (line.startsWith('vn ')) {
            const parts = line.split(/\s+/);
            tempNormals.push([+parts[1], +parts[2], +parts[3]]);
        } else if (line.startsWith('usemtl ')) {
            // Start a new group when material changes
            if (currentMaterial !== null && positions.length > currentGroupStart) {
                groups.push({
                    start: currentGroupStart / 3, // ← Fix here
                    count: (positions.length - currentGroupStart) / 3, // ← Fix here
                    material: currentMaterial,
                });
            }
            currentMaterial = line.split(' ')[1];
            currentGroupStart = positions.length;
        } else if (line.startsWith('f ')) {
            const parts = line.split(/\s+/);
            const face = parts.slice(1).map(p => {
                const [vi, vti, vni] = p.split('/').map(x => x ? parseInt(x) : undefined);
                return {
                    vi: vi - 1,
                    vti: vti ? vti - 1 : null,
                    vni: vni ? vni - 1 : null,
                };
            });
            const triangles = face.length === 4 ? [[0, 1, 2], [0, 2, 3]] : [[0, 1, 2]];
            for (const tri of triangles) {
                for (const i of tri) {
                    const vert = face[i];
                    positions.push(...(tempVertices[vert.vi] || [0, 0, 0]));
                    uvs.push(...(tempUvs[vert.vti] || [0.5, 0.5]));
                    normals.push(...(tempNormals[vert.vni] || [0, 0, 1]));
                }
            }
        }
    }
    // Push the last group
    if (currentMaterial !== null && positions.length > currentGroupStart) {
        groups.push({
            start: currentGroupStart / 3,
            count: (positions.length - currentGroupStart) / 3,
            material: currentMaterial,
        });
    }
    return { positions, uvs, normals, groups };
}