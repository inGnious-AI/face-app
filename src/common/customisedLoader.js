export function customisedLoader(text) {
    const vertices = [];
    const faces = [];
    const lines = text.split('\n');
    for (let line of lines) {
        line = line.trim();
        if (line.startsWith('v ')) {
            const parts = line.split(/\s+/);
            vertices.push([
                parseFloat(parts[1]),
                parseFloat(parts[2]),
                parseFloat(parts[3]),
            ]);
        } else if (line.startsWith('f ')) {
            const parts = line.split(/\s+/);
            const indices = parts.slice(1).map(part => parseInt(part.split('/')[0], 10));
            if (indices.length === 3) {
                faces.push(indices);
            } else if (indices.length === 4) {
                // Split quad into two triangles
                faces.push([indices[0], indices[1], indices[2]]);
                faces.push([indices[0], indices[2], indices[3]]);
            }
            // Ignore n-gons with more than 4 vertices for now
        }
    }
    return { vertices, faces };
}