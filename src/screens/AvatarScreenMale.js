import React, { useState, useEffect, Suspense, useRef } from "react";
import generateUniqueId from "generate-unique-id";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dimensions from "../body-dim.json";
import { Lights } from "../scene-components/Lights.js";
import { Canvas, useLoader } from "react-three-fiber";
import * as THREE from "three";
import { GLTFLoader, OBJLoader } from "three/examples/jsm/Addons.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { CLOTH_API_URL, BODY_API_URL, FALSE_BACKGROUND } from '../common/constants.js';
import { fetchLastLineFromCSV } from "../common/csvData.js";
import TorusBetweenVertices from "../common/torusCreation.js";
import { customisedLoader } from "../common/customisedLoader.js";
import './AvatarScreen.css';
import RodBetweenVertices from "../common/rodCreation.js";

const AvatarScreenMale = () => {
  const { avatar } = useSelector((state) => state.avatarModelDetails);
  const { tshirtSize } = useSelector((state) => state.tshirtSize);

  const [customer_id, setCustomerId] = useState();
  const [cameraPosition, setCameraPosition] = useState([0, 1.5, 3]);
  const [cameraLookAt, setCameraLookAt] = useState([0, 1.5, 0]);
  const [modelPosition, setModelPosition] = useState([0.1, -1, -0.3]);
  const [expandedControl, setExpandedControl] = useState(null);

  const cameraRef = useRef();
  const [loading, setLoading] = useState(false);

  const loader = new OBJLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("https://protal-web-assest.s3.ap-south-1.amazonaws.com/Dump/draco/");
  dracoLoader.setDecoderConfig({ type: "js" });

  const bgModel = useLoader(GLTFLoader, FALSE_BACKGROUND);
  const [previewModel, setPreviewModel] = useState(null);

  const loadModel = async () => {
    const bodyType = "male";
    if (customer_id) {
      setLoading(true);
      const objUrl = `https://continuous-tshirt.s3.ap-south-1.amazonaws.com/faceless_app/test/${customer_id}/body_uploads/${bodyType}/preview.obj?${Date.now()}`;
      try {
        const response = await fetch(objUrl);
        const objText = await response.text();
        const { vertices, faces } = customisedLoader(objText);
        const geometry = new THREE.BufferGeometry();
        const verticesFlat = vertices.flat();
        geometry.setAttribute("position", new THREE.Float32BufferAttribute(verticesFlat, 3));
        const indices = faces.flat().map(i => i - 1);
        geometry.setIndex(indices);
        geometry.computeVertexNormals();
        const material = new THREE.MeshStandardMaterial({
          color: "#fff", // pure white
          roughness: 0.37, // a bit glossy
          metalness: 0.0   // matte look
        });
        const mesh = new THREE.Mesh(geometry, material);
        setPreviewModel(mesh);
      } catch (err) {
        console.error("Failed to load or parse OBJ:", err);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    loadModel();
    // eslint-disable-next-line
  }, [customer_id]);

  // Measurement States
  const [headlessHeight, setHeadlessHeight] = useState(null);
  const [neckCircumference, setNeckCircumference] = useState(null);
  const [chestCircumference, setChestCircumference] = useState(null);
  const [waistCircumference, setWaistCircumference] = useState(null);
  const [hipCircumference, setHipCircumference] = useState(null);
  const [highHipCircumference, setHighHipCircumference] = useState(null);
  const [bicepRightCircumference, setBicepRightCircumference] = useState(null);
  const [armRightLength, setArmRightLength] = useState(null);
  const [outseamLegLength, setOutseamLegLength] = useState(null);
  const [thighLeftCircumference, setThighLeftCircumference] = useState(null);
  const [shoulderLength, setShoulderLength] = useState(null);
  const [armholeRightCircumference, setArmholeRightCircumference] = useState(null);

  // Lock States
  const [isShoulderLocked, setIsShoulderLocked] = useState(false);
  const [isChestLocked, setIsChestLocked] = useState(false);
  const [isWaistLocked, setIsWaistLocked] = useState(false);
  const [isHipLocked, setIsHipLocked] = useState(false);

  function findClosestModel(userHeight, userWeight, variations) {
    let closestMatch = null;
    let smallestDifference = Infinity;
    for (const variation of variations) {
      const heightDiff = Math.abs(userHeight - variation.height);
      const weightDiff = Math.abs(userWeight - variation.weight);
      const totalDifference = heightDiff + weightDiff;
      if (totalDifference < smallestDifference) {
        smallestDifference = totalDifference;
        closestMatch = variation;
      }
    }
    return closestMatch;
  }

  const bodyUrlFromStorage = localStorage.getItem("bodyUrl");
  const finalBodyUrl = bodyUrlFromStorage || BODY_API_URL;
  const clothUrlFromStorage = localStorage.getItem("clothUrl");
  const finalClothUrl = clothUrlFromStorage || CLOTH_API_URL;

  const generateAvatar = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const id = customer_id === "123"
        ? Number(generateUniqueId({ length: 16, useLetters: false }))
        : customer_id;

      await axios.post(
        `${finalBodyUrl}`,
        {
          height_id: parseInt(height * 2.54),
          weight_id: parseInt(weight),
          customer_id: parseInt(id),
          body_dim: {
            "SHOULDER": parseInt(shoulderLength),
            "CHEST": parseInt(chestCircumference),
            "WAIST": parseInt(waistCircumference),
            "HIPS": parseInt(hipCircumference)
          },
          repose_flag: 0,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      await axios.post(
        `${finalClothUrl}`,
        {
          height_id: String(parseInt(height * 2.54)),
          weight_id: String(weight),
          customer_id: id,
          tshirt_id: tshirtSize,
          body_dim: [
            parseInt(headlessHeight),
            parseInt(neckCircumference),
            parseInt(chestCircumference),
            parseInt(waistCircumference),
            parseInt(hipCircumference),
            parseInt(highHipCircumference),
            parseInt(bicepRightCircumference),
            parseInt(armRightLength),
            parseInt(outseamLegLength),
            parseInt(thighLeftCircumference),
            parseInt(shoulderLength),
            parseInt(armholeRightCircumference),
          ],
          repose_flag: "0",
        },
        { headers: { "Content-Type": "application/json" } }
      );
      const bodyType = finalBodyUrl.substring(finalBodyUrl.lastIndexOf('/') + 1);
      localStorage.setItem("body-type", bodyType);
      localStorage.setItem("faceless-model_id", id);
      localStorage.setItem("weightId", weight);
      localStorage.setItem("heightId", parseInt(height * 2.54));
      localStorage.setItem(
        "body_dim",
        JSON.stringify([
          parseInt(headlessHeight),
          parseInt(neckCircumference),
          parseInt(chestCircumference),
          parseInt(waistCircumference),
          parseInt(hipCircumference),
          parseInt(highHipCircumference),
          parseInt(bicepRightCircumference),
          parseInt(armRightLength),
          parseInt(outseamLegLength),
          parseInt(thighLeftCircumference),
          parseInt(shoulderLength),
          parseInt(armholeRightCircumference),
        ])
      );
      window.location.href = "/";
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("faceless-model_id") !== "123") {
        const result = await fetchLastLineFromCSV({ customer_id: localStorage.getItem("faceless-model_id"), body_type: localStorage.getItem("body-type") ? localStorage.getItem("body-type") : "male" });
        if (result) {
          setWeight(result["weight"]);
          setHeight(Math.round(Number(result["height"]) / 2.54));
          setHeadlessHeight(parseInt(result["headless height"]));
          setNeckCircumference(parseInt(result["neck circumference"]));
          setChestCircumference(parseInt(result["chest circumference"]));
          setWaistCircumference(parseInt(result["waist circumference"]));
          setHipCircumference(parseInt(result["hip circumference"]));
          setHighHipCircumference(parseInt(result["high hip circumference"]));
          setBicepRightCircumference(parseInt(result["bicep right circumference"]));
          setArmRightLength(parseInt(result["arm right length"]));
          setOutseamLegLength(parseInt(result["outseam leg length"]));
          setThighLeftCircumference(parseInt(result["thigh left circumference"]));
          setShoulderLength(parseInt(result["shoulder length"]));
          setArmholeRightCircumference(parseInt(result["armhole right circumference"]));
        }
      }
    };
    fetchData();
  }, []);

  const [weight, setWeight] = useState(75);
  const min = 50;
  const max = 100;
  const step = 1;
  const minHeight = 61;
  const maxHeight = 76;
  const stepHeight = 1;
  const [height, setHeight] = useState(65);

  const formatHeight = (inches) => {
    const feet = Math.floor(inches / 12);
    const remainingInches = inches % 12;
    return `${feet}'${remainingInches}"`;
  };

  useEffect(() => {
    const closestModel = findClosestModel(height * 2.54, weight, Dimensions);
    setHeadlessHeight(Number.parseInt(closestModel["headless height"]));
    setNeckCircumference(Number.parseInt(closestModel["neck circumference"]));
    setChestCircumference(Number.parseInt(closestModel["chest circumference"]));
    setWaistCircumference(Number.parseInt(closestModel["waist circumference"]));
    setHipCircumference(Number.parseInt(closestModel["hip circumference"]));
    setHighHipCircumference(Number.parseInt(closestModel["high hip circumference"]));
    setBicepRightCircumference(Number.parseInt(closestModel["bicep right circumference"]));
    setArmRightLength(Number.parseInt(closestModel["arm right length"]));
    setOutseamLegLength(Number.parseInt(closestModel["outseam leg length"]));
    setThighLeftCircumference(Number.parseInt(closestModel["thigh left circumference"]));
    setShoulderLength(Number.parseInt(closestModel["shoulder length"]));
    setArmholeRightCircumference(Number.parseInt(closestModel["armhole right circumference"]));
  }, [height, weight]);

  useEffect(() => {
    setCustomerId(localStorage.getItem("faceless-model_id") || "123");
  }, []);

  const generatePreview = async () => {
    try {
      setLoading(true);
      const id = customer_id === "123"
        ? Number(generateUniqueId({ length: 16, useLetters: false }))
        : customer_id;

      await fetch(`${finalBodyUrl}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          height_id: parseInt(height * 2.54),
          weight_id: parseInt(weight),
          customer_id: parseInt(id),
          body_dim: {
            "SHOULDER": parseInt(shoulderLength),
            "CHEST": parseInt(chestCircumference),
            "WAIST": parseInt(waistCircumference),
            "HIPS": parseInt(hipCircumference)
          },
          repose_flag: 1,
        }),
      });

      setCustomerId(id);
      setLoading(false);
      loadModel();
      return;
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.set(...cameraPosition);
      cameraRef.current.lookAt(...cameraLookAt);
    }
  }, [cameraPosition, cameraLookAt]);

  const shoulderIndexA = 11641;
  const shoulderIndexB = 7052;
  const waistIndexA = 6454;
  const waistIndexB = 11109;
  const chestIndexA = 6179;
  const chestIndexB = 10632;
  const hipIndexA = 6469;
  const hipIndexB = 11183;

  const renderControl = (
    label,
    value,
    isLocked,
    setLocked,
    setValue,
    cameraFocusPosition
  ) => {
    const isExpanded = expandedControl === label;

    const handleClick = () => {
      if (isLocked) {
        setLocked(false);
        setExpandedControl(label);
        if (cameraFocusPosition) {
          setCameraPosition(cameraFocusPosition.position);
          setCameraLookAt(cameraFocusPosition.lookAt);
          setModelPosition([0, 0, 0]);
        }
      } else {
        const newExpanded = !isExpanded;
        setExpandedControl(newExpanded ? label : null);
        if (newExpanded && cameraFocusPosition) {
          setCameraPosition(cameraFocusPosition.position);
          setCameraLookAt(cameraFocusPosition.lookAt);
          setModelPosition([0, 0, 0]);
        } else if (!newExpanded) {
          setCameraPosition([0, 1.5, 3]);
          setCameraLookAt([0, 1.5, 0]);
          setModelPosition([0.3, -1, 0]);
        }
      }
    };

    return (
      <>
        <div
          className="avatar-row"
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        >
          <span>{label}</span>
          <span className="avatar-chip">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLocked(!isLocked);
                if (isLocked) {
                  setExpandedControl(label);
                  if (cameraFocusPosition) {
                    setCameraPosition(cameraFocusPosition.position);
                    setCameraLookAt(cameraFocusPosition.lookAt);
                    setModelPosition([0, 0, 0]);
                  }
                }
              }}
              className="lock-button"
              title={isLocked ? "Unlock" : "Lock"}
              tabIndex={-1}
            >
              <svg width="26" height="22" viewBox="0 0 70 70">
                <rect
                  x="10"
                  y="25"
                  width="50"
                  height="32"
                  rx="10"
                  fill={isLocked ? "#111" : "none"}
                  stroke="#111"
                  strokeWidth="2"
                />
                {isLocked ? (
                  <path
                    d="M20 25V16a15 15 0 1 1 30 0v9"
                    fill="none"
                    stroke="#111"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                ) : (
                  <g transform="rotate(-45 20 25)">
                    <path
                      d="M20 25 C20 5, 50 5, 50 25"
                      fill="none"
                      stroke="#111"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </g>
                )}
              </svg>
            </button>
            {value}″
          </span>
        </div>
        {isExpanded && !isLocked && (
          <div style={{ marginTop: "8px" }}>
            <input
              type="range"
              min={cameraFocusPosition.min}
              max={cameraFocusPosition.max}
              step={1}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="form-range"
              style={{
                width: "100%",
                '--percent': ((value - cameraFocusPosition.min) / (cameraFocusPosition.max - cameraFocusPosition.min)) * 100
              }}
            />
            <p style={{ fontSize: "12px", marginTop: "4px", color: "#444" }}>
              Lock to prioritize {label.toLowerCase()} fit. Other sizes may auto adjust.
            </p>
          </div>
        )}
      </>
    );
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        background: "rgba(214,214,214,0.9)",
        overflow: "hidden",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      {/* Sidebar - left center */}
      <div className="avatar-sidebar">
        {renderControl(
          "SHOULDER", shoulderLength, isShoulderLocked, setIsShoulderLocked, setShoulderLength,
          { position: [0, 1.5, -2], lookAt: [0, 1.5, 0], min: 40, max: 49 }
        )}
        {renderControl(
          "CHEST", chestCircumference, isChestLocked, setIsChestLocked, setChestCircumference,
          { position: [0, 1.2, 2], lookAt: [0, 1.2, 0], min: 81, max: 121 }
        )}
        {renderControl(
          "WAIST", waistCircumference, isWaistLocked, setIsWaistLocked, setWaistCircumference,
          { position: [0, 1.0, 2], lookAt: [0, 1.0, 0], min: 62, max: 112 }
        )}
        {renderControl(
          "HIP", hipCircumference, isHipLocked, setIsHipLocked, setHipCircumference,
          { position: [0, 0.8, 2], lookAt: [0, 0.8, 0], min: 75, max: 114 }
        )}
        <button className="avatar-btn" onClick={() => alert("Complete Fit Clicked")}>
          + COMPLETE FIT
        </button>
      </div>

      {/* 3D Canvas */}
      <Canvas
        shadows={{ type: THREE.PCFSoftShadowMap }}
        camera={{ fov: 32, position: cameraPosition }}
        onCreated={({ camera }) => {
          cameraRef.current = camera;
        }}
        gl={{
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
          powerPreference: "high-performance",
          premultipliedAlpha: false,
          antialias: true,
        }}
        style={{ width: "100vw", height: "100vh", background: "#e9ecef" }}
        className="w-100 h-100"
      >
        <>
          {/* Soft Ambient Light */}
          <ambientLight intensity={0.8} />

          {/* Main Directional Light from front-top-right */}
          <directionalLight
            position={[2, 5, 4]}
            intensity={1.2}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            color="#fff"
          />

          {/* Fill Light from left for softer shadows */}
          <directionalLight
            position={[-3, 2, 2]}
            intensity={0.4}
            color="#ffffff"
          />

          {/* Optional: Rim Light from behind for outline glow */}
          <directionalLight
            position={[0, 4, -6]}
            intensity={0.3}
            color="#d5e8ff"
          />
        </>
        <Lights lightColor={"#ffffff"} lightPreference={"neutral"} />
        <Suspense fallback={null}>
          {previewModel && (
            <>
              <primitive object={previewModel} position={modelPosition} rotation={[-0.2, -Math.PI / 5, 0]} />
              {expandedControl === "WAIST" && previewModel && (
                <TorusBetweenVertices mesh={previewModel} indexA={waistIndexA} indexB={waistIndexB} />
              )}
              {expandedControl === "SHOULDER" && previewModel && (
                <>
                  <RodBetweenVertices mesh={previewModel} indexA={shoulderIndexA} indexB={shoulderIndexB} />
                  <mesh position={shoulderIndexA}>
                    <sphereGeometry args={[0.005, 16, 16]} />
                    <meshStandardMaterial color="red" />
                  </mesh>
                  <mesh position={shoulderIndexB}>
                    <sphereGeometry args={[0.005, 16, 16]} />
                    <meshStandardMaterial color="blue" />
                  </mesh>
                </>
              )}
              {expandedControl === "CHEST" && previewModel && (
                <TorusBetweenVertices mesh={previewModel} indexA={chestIndexA} indexB={chestIndexB} />
              )}
              {expandedControl === "HIP" && previewModel && (
                <TorusBetweenVertices mesh={previewModel} indexA={hipIndexA} indexB={hipIndexB} />
              )}
            </>
          )}
        </Suspense>
      </Canvas>

      {/* Height Slider - right center */}
      <div className="height-slider-container">
        <div className="height-label">HEIGHT</div>
        <div className="height-slider-inner">
          <input
            type="range"
            min={minHeight}
            max={maxHeight}
            step={stepHeight}
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="height-range"
          />
          <div className="height-value-box">{formatHeight(height)}</div>
        </div>
      </div>

      {/* Weight Slider - bottom left */}
      <div className="weight-slider-container">
        <span className="weight-label">WEIGHT</span>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
          className="weight-range"
        />
        <span className="weight-value-box">{weight} kg</span>
      </div>

      {/* Actions - bottom right */}
      <div className="avatar-actions">
        <button onClick={generatePreview}>PREVIEW</button>
        <button onClick={() => alert("Proceed clicked")}>PROCEED</button>
      </div>
    </div>
  );
};

export default AvatarScreenMale;