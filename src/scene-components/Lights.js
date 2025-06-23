import React, { useRef, useEffect, useState } from "react";
import { SpotLightHelper } from "three";
import { useThree } from "react-three-fiber";
import { useSelector } from "react-redux";
import * as THREE from "three";

export const Lights = ({ lightColor, lightPreference }) => {
  const { scene } = useThree();

  const { avatar } = useSelector((state) => state.avatarModelDetails);

  // // Reference to lights and helpers for cleanup
  const lights = [];
  const helpers = [];

  const lightConfig = {
    bright: [
      // A
      [
        {
          name: "Spotlight 1",
          position: [0.3, 1.98, 2.9],
          target: [0, 1, 0],
          angle: 0.4,
          penumbra: 0.9,
          intensity: 11.5,
          decay: 1.85,
          distance: 5.93,
          castShadow: true,
          shadowBias: -0.0006000000000000001,
        },
        {
          name: "Spotlight 2",
          position: [0.06, 11.66, 0.4],
          target: [0, -14.21, 0],
          angle: 1.57,
          penumbra: 1,
          intensity: 1.5,
          decay: 0.75,
          distance: 50.79,
          castShadow: true,
          shadowBias: -0.0006000000000000001,
        },
        {
          name: "Spotlight 3",
          position: [0.0, 1.51, -5.21],
          target: [0, 0.24, 0],
          angle: 0.41,
          penumbra: 0.9,
          intensity: 29.63,
          decay: 1,
          distance: 6.5,
          castShadow: true,
          shadowBias: -0.01,
        },
        {
          name: "Spotlight 4",
          position: [2.5, 1.26, 1.11],
          target: [-61.56, -23.88, -33.6],
          angle: 0.58,
          penumbra: 0.9,
          intensity: 16,
          decay: 0.6,
          distance: 3,
          castShadow: true,
          shadowBias: -0.001,
        },
        {
          name: "Spotlight 5",
          position: [-3.21, 1.03, 2.97],
          target: [0.1, 0.11, -0.18],
          angle: 0.41,
          penumbra: 0.9,
          intensity: 16,
          decay: 1.1,
          distance: 6,
          castShadow: true,
          shadowBias: -0.0015,
        },
      ],

      //  B
      [
        {
          name: "Spotlight 1",
          position: [0.3, 1.98, 2.9],
          target: [0, 1, 0],
          angle: 0.4,
          penumbra: 0.9,
          intensity: 11.0,
          decay: 1.7,
          distance: 5.93,
          castShadow: true,
          shadowBias: -0.0006000000000000001,
        },
        {
          name: "Spotlight 2",
          position: [0.06, 11.66, 0.4],
          target: [0, -14.21, 0],
          angle: 1.57,
          penumbra: 1,
          intensity: 1.5,
          decay: 0.75,
          distance: 50.79,
          castShadow: true,
          shadowBias: -0.0006000000000000001,
        },
        {
          name: "Spotlight 3",
          position: [0.0, 1.51, -5.21],
          target: [0, 0.29, 0],
          angle: 0.41,
          penumbra: 0.9,
          intensity: 29.63,
          decay: 1,
          distance: 6.5,
          castShadow: true,
          shadowBias: -0.01,
        },
        {
          name: "Spotlight 4",
          position: [2.47, 1.26, 1.11],
          target: [-62.46, -21.49, -33.6],
          angle: 0.58,
          penumbra: 0.9,
          intensity: 16,
          decay: 0.6,
          distance: 3,
          castShadow: true,
          shadowBias: -0.001,
        },
        {
          name: "Spotlight 5",
          position: [-3.21, 1.03, 2.97],
          target: [0.1, 0.22, -0.18],
          angle: 0.41,
          penumbra: 0.9,
          intensity: 16,
          decay: 1.1,
          distance: 6,
          castShadow: true,
          shadowBias: -0.0015,
        },
      ],

      //  C
      [
        {
          name: "Spotlight 1",
          position: [0.31, 1.98, 2.9],
          target: [0, 0.95, 0],
          angle: 0.4,
          penumbra: 0.9,
          intensity: 11.0,
          decay: 1.8,
          distance: 5.93,
          castShadow: true,
          shadowBias: -0.0006000000000000001,
        },
        {
          name: "Spotlight 2",
          position: [0.06, 11.66, 0.4],
          target: [0, -14.21, 0],
          angle: 1.57,
          penumbra: 1,
          intensity: 1.5,
          decay: 0.75,
          distance: 50.79,
          castShadow: true,
          shadowBias: -0.0006000000000000001,
        },
        {
          name: "Spotlight 3",
          position: [0.0, 1.51, -5.21],
          target: [0, 0.4, 0],
          angle: 0.41,
          penumbra: 0.9,
          intensity: 29.63,
          decay: 1,
          distance: 6.5,
          castShadow: true,
          shadowBias: -0.01,
        },
        {
          name: "Spotlight 4",
          position: [2.47, 1.26, 1.11],
          target: [-62.46, -21.0, -33.6],
          angle: 0.58,
          penumbra: 0.9,
          intensity: 16,
          decay: 0.12,
          distance: 3,
          castShadow: true,
          shadowBias: -0.001,
        },
        {
          name: "Spotlight 5",
          position: [-3.21, 1.03, 2.97],
          target: [0.1, 0.33, -0.18],
          angle: 0.41,
          penumbra: 0.9,
          intensity: 16,
          decay: 1.1,
          distance: 6,
          castShadow: true,
          shadowBias: -0.0015,
        },
      ],

      //  D
      [
        {
          name: "Spotlight 1",
          position: [0.31, 1.98, 2.9],
          target: [0, 1.11, 0],
          angle: 0.4,
          penumbra: 0.9,
          intensity: 12.5,
          decay: 1.8,
          distance: 5.93,
          castShadow: true,
          shadowBias: -0.0006000000000000001,
        },
        {
          name: "Spotlight 2",
          position: [0.06, 11.66, 0.4],
          target: [0, -14.21, 0],
          angle: 1.57,
          penumbra: 1,
          intensity: 1.5,
          decay: 0.75,
          distance: 50.79,
          castShadow: true,
          shadowBias: -0.0006000000000000001,
        },
        {
          name: "Spotlight 3",
          position: [0.0, 1.51, -5.21],
          target: [0, 0.45, 0],
          angle: 0.41,
          penumbra: 0.9,
          intensity: 29.63,
          decay: 1.1,
          distance: 6.5,
          castShadow: true,
          shadowBias: -0.01,
        },
        {
          name: "Spotlight 4",
          position: [2.47, 1.26, 1.11],
          target: [-67.31, -21.55, -33.6],
          angle: 0.58,
          penumbra: 0.9,
          intensity: 16,
          decay: 0.3,
          distance: 3,
          castShadow: true,
          shadowBias: -0.001,
        },
        {
          name: "Spotlight 5",
          position: [-3.21, 1.03, 2.97],
          target: [0.1, 0.36, -0.18],
          angle: 0.41,
          penumbra: 0.9,
          intensity: 16,
          decay: 1.1,
          distance: 6,
          castShadow: true,
          shadowBias: -0.0015,
        },
      ],
    ],
    neutral: [
      // A
      [
        {
          name: "Spotlight 1",
          position: [0.3, 2.78, 3.08],
          target: [0, 0.39, 0],
          angle: 0.4,
          penumbra: 0.9,
          intensity: 17.66,
          decay: 1.87,
          distance: 5.93,
          castShadow: true,
          shadowBias: -0.0006000000000000001,
        },
        {
          name: "Spotlight 2",
          position: [0.06, 11.66, 0.4],
          target: [0, -14.21, 0],
          angle: 1.57,
          penumbra: 1,
          intensity: 1.5,
          decay: 0.75,
          distance: 50.79,
          castShadow: true,
          shadowBias: -0.0006000000000000001,
        },
        {
          name: "Spotlight 3",
          position: [0.0, 1.81, -5.21],
          target: [0, 1.33, 0],
          angle: 0.41,
          penumbra: 0.9,
          intensity: 39.91,
          decay: 1.29,
          distance: 6.5,
          castShadow: true,
          shadowBias: -0.01,
        },
        {
          name: "Spotlight 4",
          position: [2.29, 1.26, 1.17],
          target: [-61.56, -24.77, -33.6],
          angle: 0.55,
          penumbra: 0.9,
          intensity: 17.0,
          decay: 0.5,
          distance: 3,
          castShadow: true,
          shadowBias: -0.001,
        },
        {
          name: "Spotlight 5",
          position: [-3.21, 1.03, 3.18],
          target: [0.1, 0.21, -0.18],
          angle: 0.41,
          penumbra: 0.9,
          intensity: 16.0,
          decay: 1.25,
          distance: 6,
          castShadow: true,
          shadowBias: -0.0015,
        },
      ],

      // B
      [
        {
          name: "Spotlight 1",
          position: [0.3, 1.82, 3.6],
          target: [0, 0.55, 0],
          angle: 0.4,
          penumbra: 0.9,
          intensity: 17.66,
          decay: 1.87,
          distance: 5.93,
          castShadow: true,
          shadowBias: -0.0006000000000000001,
        },
        {
          name: "Spotlight 2",
          position: [0.06, 11.66, 0.4],
          target: [0, -14.21, 0],
          angle: 1.57,
          penumbra: 1,
          intensity: 1.5,
          decay: 0.75,
          distance: 50.79,
          castShadow: true,
          shadowBias: -0.0006000000000000001,
        },
        {
          name: "Spotlight 3",
          position: [-0.45, 1.91, -5.21],
          target: [-0.07, 0.44, 0],
          angle: 0.41,
          penumbra: 0.9,
          intensity: 39.91,
          decay: 1.29,
          distance: 6.5,
          castShadow: true,
          shadowBias: -0.01,
        },
        {
          name: "Spotlight 4",
          position: [2.36, 1.58, 0.97],
          target: [-77.22, -34.4, -33.6],
          angle: 0.55,
          penumbra: 0.9,
          intensity: 17.0,
          decay: 0.5,
          distance: 3,
          castShadow: true,
          shadowBias: -0.001,
        },
        {
          name: "Spotlight 5",
          position: [-2.78, 1.35, 3.21],
          target: [-0.02, 0.5, -0.18],
          angle: 0.41,
          penumbra: 0.9,
          intensity: 16.0,
          decay: 1.25,
          distance: 6,
          castShadow: true,
          shadowBias: -0.0015,
        },
      ],

      // C
      [
        {
          name: "Spotlight 1",
          position: [0.3, 1.93, 3.6],
          target: [0, 0.9, 0],
          angle: 0.4,
          penumbra: 0.9,
          intensity: 17.66,
          decay: 1.87,
          distance: 5.93,
          castShadow: true,
          shadowBias: -0.0006000000000000001,
        },
        {
          name: "Spotlight 2",
          position: [0.06, 11.66, 0.4],
          target: [0, -14.21, 0],
          angle: 1.57,
          penumbra: 1,
          intensity: 1.5,
          decay: 0.75,
          distance: 50.79,
          castShadow: true,
          shadowBias: -0.0006000000000000001,
        },
        {
          name: "Spotlight 3",
          position: [-0.45, 1.91, -5.21],
          target: [-0.07, 0.53, 0],
          angle: 0.41,
          penumbra: 0.9,
          intensity: 39.91,
          decay: 1.29,
          distance: 6.5,
          castShadow: true,
          shadowBias: -0.01,
        },
        {
          name: "Spotlight 4",
          position: [2.44, 1.59, 1.03],
          target: [-77.22, -34.67, -33.6],
          angle: 0.55,
          penumbra: 0.9,
          intensity: 17.0,
          decay: 0.5,
          distance: 3,
          castShadow: true,
          shadowBias: -0.001,
        },
        {
          name: "Spotlight 5",
          position: [-3.21, 1.03, 3.18],
          target: [0.1, 0.34, -0.18],
          angle: 0.41,
          penumbra: 0.9,
          intensity: 16.0,
          decay: 1.25,
          distance: 6,
          castShadow: true,
          shadowBias: -0.0015,
        },
      ],
    ],
    dark: [
      //  A
      [
        {
          name: "Spotlight 1",
          position: [0.0, 1.22, 3.46],
          target: [0.01, 0.39, 0],
          angle: 0.45,
          penumbra: 0.9,
          intensity: 21.0,
          decay: 1,
          distance: 5.81,
          castShadow: true,
          shadowBias: -0.0006000000000000001,
        },
        {
          name: "Spotlight 2",
          position: [0.06, 11.66, 0.4],
          target: [0, -14.21, 0],
          angle: 1.57,
          penumbra: 1,
          intensity: 1.5,
          decay: 0.75,
          distance: 50.79,
          castShadow: true,
          shadowBias: -0.0006000000000000001,
        },
        {
          name: "Spotlight 3",
          position: [0.02, 1.41, -2.87],
          target: [0, 0.65, 0],
          angle: 0.37,
          penumbra: 0.9,
          intensity: 22.1,
          decay: 0.94,
          distance: 4.6,
          castShadow: true,
          shadowBias: -0.01,
        },
        {
          name: "Spotlight 4",
          position: [2.29, 1.98, -0.1],
          target: [-61.82, -32.0, -2.36],
          angle: 0.4,
          penumbra: 0.9,
          intensity: 13,
          decay: 0.9,
          distance: 3,
          castShadow: true,
          shadowBias: -0.001,
        },
        {
          name: "Spotlight 5",
          position: [-2.29, 2, 0.64],
          target: [0.53, 0.6, -0.21],
          angle: 0.33,
          penumbra: 0.9,
          intensity: 13,
          decay: 0.9,
          distance: 3,
          castShadow: true,
          shadowBias: -0.0015,
        },
      ],

      // B
      [
        {
          name: "Spotlight 1",
          position: [0.0, 1.22, 3.28],
          target: [0.01, 0.46, 0],
          angle: 0.45,
          penumbra: 0.9,
          intensity: 21.0,
          decay: 1,
          distance: 5.81,
          castShadow: true,
          shadowBias: -0.0006000000000000001,
        },
        {
          name: "Spotlight 2",
          position: [0.06, 11.66, 0.4],
          target: [0, -14.21, 0],
          angle: 1.57,
          penumbra: 1,
          intensity: 1.5,
          decay: 0.7,
          distance: 50.79,
          castShadow: true,
          shadowBias: -0.0006000000000000001,
        },
        {
          name: "Spotlight 3",
          position: [0.02, 1.6, -2.87],
          target: [0, 0.79, 0],
          angle: 0.37,
          penumbra: 0.9,
          intensity: 22.1,
          decay: 0.94,
          distance: 4.6,
          castShadow: true,
          shadowBias: -0.01,
        },
        {
          name: "Spotlight 4",
          position: [2.29, 2.01, -0.1],
          target: [-60.82, -30.68, -2.36],
          angle: 0.4,
          penumbra: 0.9,
          intensity: 13,
          decay: 0.9,
          distance: 3,
          castShadow: true,
          shadowBias: -0.001,
        },
        {
          name: "Spotlight 5",
          position: [-2.29, 2.12, 0.64],
          target: [0.53, 0.64, -0.21],
          angle: 0.33,
          penumbra: 0.9,
          intensity: 13,
          decay: 0.9,
          distance: 3,
          castShadow: true,
          shadowBias: -0.0015,
        },
      ],

      // C
      [
        {
          name: "Spotlight 1",
          position: [0.06, 1.29, 3.28],
          target: [0.01, 0.58, 0],
          angle: 0.45,
          penumbra: 0.9,
          intensity: 21.0,
          decay: 1,
          distance: 5.81,
          castShadow: true,
          shadowBias: -0.0006000000000000001,
        },
        {
          name: "Spotlight 2",
          position: [0.06, 11.66, 0.4],
          target: [0, -14.21, 0],
          angle: 1.57,
          penumbra: 1,
          intensity: 1.5,
          decay: 0.75,
          distance: 50.79,
          castShadow: true,
          shadowBias: -0.0006000000000000001,
        },
        {
          name: "Spotlight 3",
          position: [0.02, 1.6, -3.11],
          target: [0, 0.79, 0],
          angle: 0.37,
          penumbra: 0.9,
          intensity: 22.1,
          decay: 0.94,
          distance: 4.6,
          castShadow: true,
          shadowBias: -0.01,
        },
        {
          name: "Spotlight 4",
          position: [2.29, 0.01, -0.1],
          target: [-60.82, -30.68, -2.36],
          angle: 0.4,
          penumbra: 0.9,
          intensity: 13,
          decay: 0.12,
          distance: 3,
          castShadow: true,
          shadowBias: -0.001,
        },
        {
          name: "Spotlight 5",
          position: [-2.29, 2.12, 1.05],
          target: [0.57, 0.77, -0.26],
          angle: 0.33,
          penumbra: 0.9,
          intensity: 13.0,
          decay: 0.9,
          distance: 3,
          castShadow: true,
          shadowBias: -0.0015,
        },
      ],

      //  D
      [
        {
          name: "Spotlight 1",
          position: [0.0, 1.28, 3.64],
          target: [0.01, 0.52, 0],
          angle: 0.45,
          penumbra: 0.9,
          intensity: 21.0,
          decay: 1,
          distance: 5.81,
          castShadow: true,
          shadowBias: -0.0006000000000000001,
        },
        {
          name: "Spotlight 2",
          position: [0.06, 11.66, 0.4],
          target: [0, -14.21, 0],
          angle: 1.57,
          penumbra: 1,
          intensity: 1.5,
          decay: 0.75,
          distance: 50.79,
          castShadow: true,
          shadowBias: -0.0006000000000000001,
        },
        {
          name: "Spotlight 3",
          position: [0.02, 1.42, -2.87],
          target: [0, 0.98, 0],
          angle: 0.37,
          penumbra: 0.9,
          intensity: 22.1,
          decay: 0.94,
          distance: 4.6,
          castShadow: true,
          shadowBias: -0.01,
        },
        {
          name: "Spotlight 4",
          position: [2.34, 1.98, 0.1],
          target: [-60.82, -25.1, -2.36],
          angle: 0.4,
          penumbra: 0.9,
          intensity: 13,
          decay: 0.9,
          distance: 3,
          castShadow: true,
          shadowBias: -0.001,
        },
        {
          name: "Spotlight 5",
          position: [-2.29, 2.04, 0.64],
          target: [0.53, 0.93, -0.21],
          angle: 0.33,
          penumbra: 0.9,
          intensity: 13.0,
          decay: 0.9,
          distance: 3,
          castShadow: true,
          shadowBias: -0.0015,
        },
      ],
    ],
  };

  useEffect(() => {
    Object.values(lightConfig)
      .flat(Infinity)
      .forEach((light) => {
        scene.remove(light);
      });

    const getLightIndex = () => {
      if (lightPreference === "neutral") {
        const index =
          avatar.heightId <= 175 ? 0 : avatar.heightId <= 185 ? 1 : 2;

        return index;
      }
      if (lightPreference === "bright") {
        const index =
          avatar.heightId <= 165
            ? 0
            : avatar.heightId <= 175
            ? 1
            : avatar.heightId <= 185
            ? 2
            : 3;

        return index;
      }

      if (lightPreference === "dark") {
        const index =
          avatar.heightId <= 165
            ? 0
            : avatar.heightId <= 175
            ? 1
            : avatar.heightId <= 185
            ? 2
            : 3;

        return index;
      }
    };

    lightConfig[lightPreference][getLightIndex()].forEach((lightConfig) => {
      const spotLight = new THREE.SpotLight(lightColor);
      spotLight.position.set(...lightConfig.position);
      spotLight.angle = lightConfig.angle;
      spotLight.penumbra = lightConfig.penumbra;
      spotLight.intensity = lightConfig.intensity;
      spotLight.decay = lightConfig.decay;
      spotLight.distance = lightConfig.distance;
      spotLight.castShadow = lightConfig.castShadow;
      spotLight.shadow.bias = lightConfig.shadowBias;
      spotLight.shadow.mapSize.width = 1024;
      spotLight.shadow.mapSize.height = 1024;

      spotLight.shadow.camera.near = 1;
      spotLight.shadow.camera.far = 10;

      const target = new THREE.Object3D();
      target.position.set(...lightConfig.target);
      scene.add(target);
      spotLight.target = target;

      scene.add(spotLight);

      // Add helper
      // const helper = new SpotLightHelper(spotLight);
      // scene.add(helper);

      lights.push(spotLight);
      // helpers.push(helper);
    });

    // Cleanup when component unmounts
    return () => {
      lights.forEach((light) => scene.remove(light));
      // helpers.forEach((helper) => scene.remove(helper));
    };
  }, [scene, lightColor, lightPreference]);

  return null;
};
