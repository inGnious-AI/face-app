import React, { useState, useEffect, Suspense, useRef, useMemo } from "react";
import generateUniqueId from "generate-unique-id";
import {
  ArrowLeft,
  ArrowLeftRight,
  ChevronDown,
  Scissors,
  Sun,
  UserRoundPlus,
} from "lucide-react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dimensions from "../body-dim.json";
import { Collapse } from "react-collapse";
import { Lights } from "../scene-components/Lights";
import FinalScene from "../scene-components/FinalScene";
import { Canvas, useLoader } from "react-three-fiber";
import * as THREE from "three";
import { Center, OrbitControls } from "@react-three/drei";
import { GLTFLoader, OBJLoader } from "three/examples/jsm/Addons.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import Camera from "../scene-components/Camera";
import { v4 as uuidv4 } from "uuid";
import { CLOTH_API_URL, BODY_API_URL, FALSE_BACKGROUND } from '../common/constants.js';
import { fetchLastLineFromCSV } from "../common/csvData.js";
import TorusBetweenVertices from "../common/torusCreation.js";
import { customisedLoader } from "../common/customisedLoader"; // <-- import your loader

const GenrateAvatarScreen = () => {
  const { avatar } = useSelector((state) => state.avatarModelDetails);
  const { tshirtSize } = useSelector((state) => state.tshirtSize);

  const [additionalData, setAdditionalData] = useState(false);
  const [customer_id, setCustomerId] = useState();


  const [cameraPosition, setCameraPosition] = useState([0, 1.5, 3]);
  const [cameraLookAt, setCameraLookAt] = useState([0, 1.5, 0]);
  const [modelPosition, setModelPosition] = useState([0, -1, 0]);
  const [expandedControl, setExpandedControl] = useState(null);

  const cameraRef = useRef();
  const [loading, setLoading] = useState(false);

  const loader = new OBJLoader();

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath(
    "https://protal-web-assest.s3.ap-south-1.amazonaws.com/Dump/draco/"
  );
  dracoLoader.setDecoderConfig({ type: "js" });

  // loader.setDRACOLoader(dracoLoader);

  const bgModel = useLoader(
    GLTFLoader,
    FALSE_BACKGROUND
  );

  const [previewModel, setPreviewModel] = useState(null);

  const loadModel = async () => {
    const bodyType = localStorage.getItem("body-type") ? localStorage.getItem("body-type") : "male";

    if (customer_id) {
      setLoading(true);

      // 1. Fetch the OBJ file as text
      const objUrl = `https://continuous-tshirt.s3.ap-south-1.amazonaws.com/face_app/${customer_id}/body_uploads/${bodyType}/preview.obj?${Date.now()}`;
      try {
        const response = await fetch(objUrl);
        const objText = await response.text();

        // 2. Use your custom loader to parse the OBJ
        const { vertices, faces } = customisedLoader(objText);

        // 3. (Optional) Log or use the parsed data
        console.log("Vertices:", vertices);
        console.log("Faces:", faces);

        const vertex4321 = vertices[1222]; // 4321st vertex (OBJ is 1-based)
        console.log("1222 vertex coordinates:", vertex4321);

        console.log("waistIndexA", waistIndexA, vertices[waistIndexA]);
        console.log("waistIndexB", waistIndexB, vertices[waistIndexB]);

        // 4. If you want to create a THREE.js mesh from this data:
        const geometry = new THREE.BufferGeometry();
        const verticesFlat = vertices.flat();
        geometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(verticesFlat, 3)
        );
        const indices = faces.flat().map(i => i - 1);
        geometry.setIndex(indices);

        // Add this line for smooth shading:
        geometry.computeVertexNormals();
        const material = new THREE.MeshStandardMaterial({ color: 0xffffff, flatShading: false });
        const mesh = new THREE.Mesh(geometry, material);

        // 5. Add mesh to scene (or set as previewModel)
        setPreviewModel(mesh);

      } catch (err) {
        console.error("Failed to load or parse OBJ:", err);
        setError(true);
      }

      setLoading(false);
    }
  };

  useEffect(() => {
    loadModel();

    return () => {
      // disposeModels(productModel.scene);
    };
  }, [customer_id]);

  // aditional body dimensions
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
  const [armholeRightCircumference, setArmholeRightCircumference] =
    useState(null);

  // Lock States
  const [isShoulderLocked, setIsShoulderLocked] = useState(false);
  const [isChestLocked, setIsChestLocked] = useState(false);
  const [isWaistLocked, setIsWaistLocked] = useState(false);
  const [isHipLocked, setIsHipLocked] = useState(false);

  // Expand States
  const [isShoulderExpanded, setIsShoulderExpanded] = useState(false);
  const [isWaistExpanded, setIsWaistExpanded] = useState(false);
  const [isChestExpanded, setIsChestExpanded] = useState(false);
  const [isHipExpanded, setIsHipExpanded] = useState(false);

  const [error, setError] = useState(false);

  function findClosestModel(userHeight, userWeight, variations) {
    let closestMatch = null;
    let smallestDifference = Infinity;

    for (const variation of variations) {
      const heightDiff = Math.abs(userHeight - variation.height);
      const weightDiff = Math.abs(userWeight - variation.weight);
      const totalDifference = heightDiff + weightDiff; // Combined difference

      if (totalDifference < smallestDifference) {
        smallestDifference = totalDifference;
        closestMatch = variation;
      }
    }

    return closestMatch; // Returns the closest variation object
  }

  const bodyUrlFromStorage = localStorage.getItem("bodyUrl");
  const finalBodyUrl = bodyUrlFromStorage || BODY_API_URL;

  const clothUrlFromStorage = localStorage.getItem("clothUrl");
  const finalClothUrl = clothUrlFromStorage || CLOTH_API_URL;

  const generateAvatar = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const id =
        customer_id === "123"
          ? Number(generateUniqueId({
            length: 16,
            useLetters: false,
          }))
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
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
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

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
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
      setError(true);
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

  const minHeight = 61; // 5.1 feet in inches
  const maxHeight = 76; // 6.4 feet in inches
  const stepHeight = 1;

  const [height, setHeight] = useState(65);

  const handleHeightChange = (e) => {
    setHeight(Number(e.target.value));
  };

  const formatHeight = (inches) => {
    const feet = Math.floor(inches / 12);
    const remainingInches = inches % 12;
    return `${feet}'${remainingInches}"`;
  };

  const [acceptTNC, setAcceptTNC] = useState();

  useEffect(() => {
    const closestModel = findClosestModel(height * 2.54, weight, Dimensions);

    // console.log(closestModel);
    setHeadlessHeight(Number.parseInt(closestModel["headless height"]));
    setNeckCircumference(Number.parseInt(closestModel["neck circumference"]));
    setChestCircumference(Number.parseInt(closestModel["chest circumference"]));
    setWaistCircumference(Number.parseInt(closestModel["waist circumference"]));
    setHipCircumference(Number.parseInt(closestModel["hip circumference"]));
    setHighHipCircumference(
      Number.parseInt(closestModel["high hip circumference"])
    );
    setBicepRightCircumference(
      Number.parseInt(closestModel["bicep right circumference"])
    );
    setArmRightLength(Number.parseInt(closestModel["arm right length"]));
    setOutseamLegLength(Number.parseInt(closestModel["outseam leg length"]));
    setThighLeftCircumference(
      Number.parseInt(closestModel["thigh left circumference"])
    );
    setShoulderLength(Number.parseInt(closestModel["shoulder length"]));
    setArmholeRightCircumference(
      Number.parseInt(closestModel["armhole right circumference"])
    );
  }, [height, weight]);

  useEffect(() => {
    setCustomerId(localStorage.getItem("faceless-model_id") || "123");
  }, []);

  const generatePreview = async () => {
    try {
      setLoading(true);
      const id =
        customer_id === "123"
          ? Number(generateUniqueId({
            length: 16,
            useLetters: false,
          }))
          : customer_id;

      await fetch(`${finalBodyUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
      setError(true);
    }
  };

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.set(...cameraPosition);
      cameraRef.current.lookAt(...cameraLookAt);
    }
  }, [cameraPosition, cameraLookAt]);

  // Example: Blender indices 1223 and 7757 become 1222 and 7756 in JS
  const waistIndexA = 1222;
  const waistIndexB = 7756;

  const renderControl = (
    label,
    value,
    isLocked,
    setLocked,
    isExpanded,
    setExpanded,
    setValue,
    cameraFocusPosition
  ) => {
    const handleClick = () => {
      if (isLocked) {
        setLocked(false);
        setExpanded(true);
      } else {
        const newExpanded = !isExpanded;
        setIsShoulderExpanded(label === "SHOULDER" ? newExpanded : false);
        setIsWaistExpanded(label === "WAIST" ? newExpanded : false);
        setIsChestExpanded(label === "CHEST" ? newExpanded : false);
        setIsHipExpanded(label === "HIP" ? newExpanded : false);

        if (newExpanded && cameraFocusPosition) {
          setCameraPosition(cameraFocusPosition.position);
          setCameraLookAt(cameraFocusPosition.lookAt);
          setModelPosition([0, 0, 0]);
        } else {
          setTimeout(() => {
            // Use newExpanded for the current label, and state for others
            const anyExpanded =
              (label === "SHOULDER" ? newExpanded : isShoulderExpanded) ||
              (label === "WAIST" ? newExpanded : isWaistExpanded) ||
              (label === "CHEST" ? newExpanded : isChestExpanded) ||
              (label === "HIP" ? newExpanded : isHipExpanded);

            if (!anyExpanded) {
              setCameraPosition([0, 1.5, 3]);
              setCameraLookAt([0, 1.5, 0]);
              setModelPosition([0, -1, 0]);
            }
          }, 0);
        }
      }
    };

    return (
      <>
        <div
          onClick={handleClick}
          className="d-flex align-items-center justify-content-between"
          style={{ cursor: "pointer", marginTop: "1rem" }}
        >
          <div style={{ fontWeight: "bold", fontSize: "14px" }}>{label}</div>
          <div className="d-flex align-items-center">
            <div
              style={{
                border: "2px solid #333",
                padding: "4px 10px",
                borderRadius: "5px",
                marginRight: "8px",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              {value}″
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLocked(!isLocked);
              }}
              style={{
                border: "none",
                background: "transparent",
                fontSize: "20px",
                color: "#007bff",
                cursor: "pointer",
              }}
              title={isLocked ? "Unlock" : "Lock"}
            >
              {isLocked ? "🔒" : "🔓"}
            </button>
          </div>
        </div>

        {isExpanded && !isLocked && (
          <div className="mt-3">
            <input
              type="range"
              min={min}
              max={max}
              step={1}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="form-range"
              style={{ width: "100%" }}
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
    <>
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          background: "rgba(214,214,214,0.9)",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "32px",
            width: "180px",
            padding: "1rem",
            background: "rgba(255, 255, 255, 0.15)",
            borderRadius: "12px",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem",
            zIndex: 10,
            pointerEvents: "auto",
          }}
        >
          {renderControl(
            "SHOULDER",
            shoulderLength,
            isShoulderLocked,
            setIsShoulderLocked,
            isShoulderExpanded,
            setIsShoulderExpanded,
            setShoulderLength,
            {
              position: [0, 1.5, -2],
              lookAt: [0, 1.5, 0],
              min: 40,
              max: 49,
            }
          )}
          {renderControl(
            "CHEST",
            chestCircumference,
            isChestLocked,
            setIsChestLocked,
            isChestExpanded,
            setIsChestExpanded,
            setChestCircumference,
            {
              position: [0, 1.2, 2],
              lookAt: [0, 1.2, 0],
              min: 81,
              max: 121,
            }
          )}
          {renderControl(
            "WAIST",
            waistCircumference,
            isWaistLocked,
            setIsWaistLocked,
            isWaistExpanded,
            setIsWaistExpanded,
            setWaistCircumference,
            {
              position: [0, 1.0, 2],
              lookAt: [0, 1.0, 0],
              min: 62,
              max: 112,
            }
          )}
          {renderControl(
            "HIP",
            hipCircumference,
            isHipLocked,
            setIsHipLocked,
            isHipExpanded,
            setIsHipExpanded,
            setHipCircumference,
            {
              position: [0, 0.8, 2],
              lookAt: [0, 0.8, 0],
              min: 75,
              max: 114,
            }
          )}

          <button
            style={{
              marginTop: "1rem",
              background: "#ffffff88",
              color: "#111",
              border: "2px solid #111",
              padding: "12px",
              fontWeight: "bold",
              fontSize: "15px",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onClick={() => alert("Complete Fit Clicked")}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#111";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "#ffffff88";
              e.currentTarget.style.color = "#111";
            }}
          >
            + COMPLETE FIT
          </button>

          {/* Proceed and Preview buttons below menu */}
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "100%",
              maxWidth: "100%",
            }}
          >
            <button
              style={{
                background: "#333",
                color: "#fff",
                padding: "12px 0",
                fontSize: "16px",
                fontWeight: "bold",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                width: "100%",
                letterSpacing: "1px",
              }}
              onClick={generatePreview}
            >
              PREVIEW
            </button>
            <button
              style={{
                background: "#333",
                color: "#fff",
                padding: "12px 0",
                fontSize: "16px",
                fontWeight: "bold",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                width: "100%",
                letterSpacing: "1px",
              }}
              onClick={() => alert("Proceed clicked")}
            >
              PROCEED
            </button>
          </div>
        </div>

        {/* Canvas fills the whole background */}
        <Canvas
          shadows={{ type: THREE.PCFSoftShadowMap }}
          camera={{ fov: 31, position: cameraPosition }}
          onCreated={({ camera }) => {
            cameraRef.current = camera;
          }}
          gl={{
            toneMapping: THREE.ACESFilmicToneMapping,
            outputColorSpace: THREE.SRGBColorSpace,
            powerPreference: "high-performance",
            premultipliedAlpha: false,
            antialias: false,
          }}
          style={{ width: "100vw", height: "100vh" }}
          className="w-100 h-100"
        >
          <Lights lightColor={"#ffffff"} lightPreference={"neutral"} />
          <Suspense fallback={null}>
            {previewModel && (
              <>
                <primitive
                  object={previewModel}
                  position={modelPosition}
                    rotation={[0, 0, 0]}
                  // rotation={[0, -Math.PI / 4, 0]} // Rotate body -45 degrees around Y axis
                />
                {isWaistExpanded && previewModel && (
                  <>
                    <TorusBetweenVertices
                      mesh={previewModel}
                      indexA={waistIndexA}
                      indexB={waistIndexB}
                    />
                    {/* Debug: show spheres at waist vertices */}
                    <mesh position={previewModel.geometry.attributes.position.array.slice(waistIndexA * 3, waistIndexA * 3 + 3)}>
                      <sphereGeometry args={[0.01, 16, 16]} />
                      <meshStandardMaterial color="red" />
                    </mesh>
                    <mesh position={previewModel.geometry.attributes.position.array.slice(waistIndexB * 3, waistIndexB * 3 + 3)}>
                      <sphereGeometry args={[0.01, 16, 16]} />
                      <meshStandardMaterial color="blue" />
                    </mesh>
                  </>
                )}
              </>
            )}
          </Suspense>
        </Canvas>

        {/* Height Slider on Right */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "20px",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <div style={{ writingMode: "vertical-rl", fontWeight: "bold", marginBottom: "8px", marginLeft: "30px" }}>
            HEIGHT
          </div>
          <input
            type="range"
            min={minHeight}
            max={maxHeight}
            step={stepHeight}
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            style={{
              width: "240px",
              appearance: "none",
              height: "6px",
              borderRadius: "3px",
              background: "#8ccfd4",
              outline: "none",
              accentColor: "#000",
              position: "absolute",
              transform: "rotate(-90deg) translate(-50%, -50%)",
              zIndex: 10,
            }}
          />
          <div
            style={{
              marginTop: "10px",
              fontWeight: "bold",
              border: "2px solid #333",
              padding: "4px 8px",
              borderRadius: "6px",
              fontSize: "14px",
            }}
          >
            {formatHeight(height)}
          </div>
        </div>

        {/* Weight Slider */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "320px",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "16px", fontWeight: "bold", marginRight: "16px" }}>
            WEIGHT
          </div>

          <div style={{ flexGrow: 1, position: "relative", width: "100%" }}>
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              style={{
                width: "100%",
                appearance: "none",
                height: "6px",
                borderRadius: "3px",
                background: "#8ccfd4",
                outline: "none",
                accentColor: "#000",
                position: "relative",
                zIndex: 1,
              }}
            />

            {/* Floating Value Box */}
            <div
              style={{
                position: "absolute",
                top: "-35px",
                left: `${((weight - min) / (max - min)) * 100}%`,
                transform: "translateX(-50%)",
                background: "rgba(255, 255, 255, 0.6)",
                border: "1px solid #30aab2",
                backdropFilter: "blur(2px)",
                borderRadius: "8px",
                padding: "4px 10px",
                fontWeight: "bold",
                fontSize: "14px",
                color: "#333",
                whiteSpace: "nowrap",
                pointerEvents: "none",
              }}
            >
              {weight} kg
            </div>
          </div>
        </div>

      </div>
    </>
  );


};

export default GenrateAvatarScreen;
