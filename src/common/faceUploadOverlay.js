import { Html } from '@react-three/drei';
import React, { useState } from 'react';

export default function FaceUploadOverlay({ position = [0, 1.65, 0], onSelect }) {
    const [showOptions, setShowOptions] = useState(false);

    const handleSelect = (type) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        if (type === "camera") input.capture = "environment";
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                onSelect?.(file);
            }
        };
        input.click();
        setShowOptions(false);
    };

    return (
        <Html position={position} transform zIndexRange={[100, 0]}>
            <div
                onClick={() => setShowOptions(!showOptions)}
                style={{
                    width: "80px",
                    height: "80px",
                    border: "3px solid black",
                    borderStyle: "dashed",
                    position: "relative",
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.2)",
                    cursor: "pointer",
                }}
            >
                {showOptions && (
                    <div
                        style={{
                            position: "absolute",
                            top: "90px",
                            left: 0,
                            width: "120px",
                            background: "#fff",
                            borderRadius: "8px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                            zIndex: 1000,
                            fontSize: "14px"
                        }}
                    >
                        <div
                            style={{ padding: "8px", cursor: "pointer" }}
                            onClick={() => handleSelect("camera")}
                        >
                            📷 Camera
                        </div>
                        <div
                            style={{ padding: "8px", cursor: "pointer" }}
                            onClick={() => handleSelect("gallery")}
                        >
                            🖼️ Gallery
                        </div>
                    </div>
                )}
            </div>
        </Html>
    );
}
