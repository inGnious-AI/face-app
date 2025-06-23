import React, { useRef, useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import "@splidejs/react-splide/css";
import "../css/app-screen.css";
import * as THREE from "three";
import { View } from "@react-three/drei";
import Camera from "../scene-components/Camera";
import {
  ArrowLeftRight,
  Info,
  Scissors,
  Settings2,
  Sun,
  UserRoundCog,
  UserRoundPlus,
} from "lucide-react";
import { Leva } from "leva";
import { useDispatch } from "react-redux";
import { Icon } from "@iconify/react";
import { Lights } from "../scene-components/Lights";
import FinalScene from "../scene-components/FinalScene";
import axios from "axios";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";
import ShoesSideBar from "../components/ShoesSideBar";
import HairsSideBar from "../components/HairsSideBar";
import { useParams, useNavigate } from "react-router-dom";

import LightsSideBar from "../components/LightsSideBar";
import MobileMenu from "../components/MobileMenu";
import DesktopMenu from "../components/DesktopMenu";
import GenrateAvatarPopUp from "../components/GenrateAvatarPopUp";
import Loader from "../components/Loader";
import _ from "lodash";
import { ErrorBoundary } from "react-error-boundary";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { CLOTH_API_URL } from '../common/constants.js';


const AppScreen = () => {

  const navigate = useNavigate();
  const cameraControlsRef = useRef();
  const container = useRef();


  const { tshirtSize } = useSelector((state) => state.tshirtSize);

  const dispatch = useDispatch();

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { avatar } = useSelector((state) => state.avatarModelDetails);

  const [canvasLoading, setCanvasLoading] = useState(false);

  const [activeCanvas, setActiveCanvas] = useState(0);

  const [shoesColor, setShoesColor] = useState(0);
  const [showShoesPanel, setShowShoesPanel] = useState(false);

  const [lightColor, setLightColor] = useState("#FFFFFF");

  const [lightPreference, setLightPrefernce] = useState("neutral");

  const [showLightsPanel, setShowLightsPanel] = useState(false);

  const [currentHairStyle, setCurrentHairStyle] = useState(
    localStorage.getItem("hairstyle")
      ? localStorage.getItem("hairstyle")
      : "Hair_Classic_Short"
  );

  const [currentHairColor, setCurrentHairColor] = useState(
    localStorage.getItem("haircolor")
      ? localStorage.getItem("haircolor")
      : "LightBrown"
  );

  const [showHairStylePanel, setShowHairStylePanel] = useState(false);

  const [showCompare, setShowCompare] = useState(false);

  const [showMenu, setShowMenu] = useState(true);

  const { target: targetModel } = useSelector((state) => state.targetModel);
  const { product } = useSelector((state) => state.productModel);


  const [currentTshirtTexture, setCurrentTshirtTexture] = useState(0)


  const texturesList = [
    {
      name: "Gray",
      base: "https://continuous-tshirt.s3.ap-south-1.amazonaws.com/assets/T-shirt+texture/Polo+t-shirt+texture/Gray+polo+t-shirt/Gray_Base_color.jpg",
      normal: "https://continuous-tshirt.s3.ap-south-1.amazonaws.com/assets/T-shirt+texture/Polo+t-shirt+texture/Gray+polo+t-shirt/Gray_Normal_OpenGL.jpg",
      metallic: "https://continuous-tshirt.s3.ap-south-1.amazonaws.com/assets/T-shirt+texture/Polo+t-shirt+texture/Gray+polo+t-shirt/Gray_Metallic.jpg",
      roughness: "https://continuous-tshirt.s3.ap-south-1.amazonaws.com/assets/T-shirt+texture/Polo+t-shirt+texture/Gray+polo+t-shirt/Gray_Roughness.jpg"
    },
    {
      name: "Blue",
      base: "https://continuous-tshirt.s3.ap-south-1.amazonaws.com/assets/T-shirt+texture/Polo+t-shirt+texture/Blue+line+polo+t-shirt/Blur_line_Base_color.jpg",
      normal: "https://continuous-tshirt.s3.ap-south-1.amazonaws.com/assets/T-shirt+texture/Polo+t-shirt+texture/Blue+line+polo+t-shirt/Blur_line_Normal_OpenGL.jpg",
      metallic: "https://continuous-tshirt.s3.ap-south-1.amazonaws.com/assets/T-shirt+texture/Polo+t-shirt+texture/Blue+line+polo+t-shirt/Blur_line_Metallic.jpg",
      roughness: "https://continuous-tshirt.s3.ap-south-1.amazonaws.com/assets/T-shirt+texture/Polo+t-shirt+texture/Blue+line+polo+t-shirt/Blur_line_Roughness.jpg"
    },

    {
      name: "Brown",
      base: "https://continuous-tshirt.s3.ap-south-1.amazonaws.com/assets/T-shirt+texture/Polo+t-shirt+texture/Brown+polo+t-shirt/Brown_Base_color.jpg",
      normal: "https://continuous-tshirt.s3.ap-south-1.amazonaws.com/assets/T-shirt+texture/Polo+t-shirt+texture/Brown+polo+t-shirt/Brown_Normal_OpenGL.jpg",
      metallic: "https://continuous-tshirt.s3.ap-south-1.amazonaws.com/assets/T-shirt+texture/Polo+t-shirt+texture/Brown+polo+t-shirt/Brown_Metallic.jpg",
      roughness: "https://continuous-tshirt.s3.ap-south-1.amazonaws.com/assets/T-shirt+texture/Polo+t-shirt+texture/Brown+polo+t-shirt/Brown_Roughness.jpg"
    }

    ,
    {
      name: "Pink",
      base: "https://continuous-tshirt.s3.ap-south-1.amazonaws.com/assets/T-shirt+texture/Polo+t-shirt+texture/light+pink+polo+T-shirt/Light_pink_Base_color.jpg",
      normal: "https://continuous-tshirt.s3.ap-south-1.amazonaws.com/assets/T-shirt+texture/Polo+t-shirt+texture/light+pink+polo+T-shirt/Light_pink_Normal_OpenGL.jpg",
      metallic: "https://continuous-tshirt.s3.ap-south-1.amazonaws.com/assets/T-shirt+texture/Polo+t-shirt+texture/light+pink+polo+T-shirt/Light_pink_Metallic.jpg",
      roughness: "https://continuous-tshirt.s3.ap-south-1.amazonaws.com/assets/T-shirt+texture/Polo+t-shirt+texture/light+pink+polo+T-shirt/Light_pink_Roughness.jpg"
    },
    {
      name: "Brown Line",
      base: "https://continuous-tshirt.s3.ap-south-1.amazonaws.com/assets/T-shirt+texture/Polo+t-shirt+texture/Brown+line+polo+t-shirt/Brown_line_Base_color.jpg",
      normal: "https://continuous-tshirt.s3.ap-south-1.amazonaws.com/assets/T-shirt+texture/Polo+t-shirt+texture/Brown+line+polo+t-shirt/Blue_line_Normal_OpenGL.jpg",
      metallic: "https://continuous-tshirt.s3.ap-south-1.amazonaws.com/assets/T-shirt+texture/Polo+t-shirt+texture/Brown+line+polo+t-shirt/Blue_line_Metallic.jpg",
      roughness: "https://continuous-tshirt.s3.ap-south-1.amazonaws.com/assets/T-shirt+texture/Polo+t-shirt+texture/Brown+line+polo+t-shirt/Blue_line_Roughness.jpg"
    }
  ]

  const [setTestOnlyBody] = useState(false);

  const clothUrlFromStorage = localStorage.getItem("clothUrl");
  const finalClothUrl = clothUrlFromStorage || CLOTH_API_URL;

  const handleTshirtSizeChange = async (size) => {
    setLoading(true)
    await axios.post(
      `${finalClothUrl}`,
      {
        height_id: String(parseInt(avatar.heightId)),
        weight_id: String(avatar.weightId),
        customer_id: avatar.modelId,
        tshirt_id: size,
        body_dim: avatar.bodyDimensions,
        repose_flag: "0",
      },

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "SET_T_SHIRT_SIZE_SUCCESS",
      payload: size,
    });
    setLoading(false)
  };

  const [bodyUrl, setBodyUrl] = useState(localStorage.getItem("bodyUrl") || "");
  const [clothUrl, setClothUrl] = useState(localStorage.getItem("clothUrl") || "");

  const handleUrlChange = (type, value) => {
    if (type === "body") {
      setBodyUrl(value);
    } else if (type === "cloth") {
      setClothUrl(value);
    }
  };

  const handleSubmit = () => {
    if (bodyUrl) {
      localStorage.setItem("bodyUrl", bodyUrl);
      const bodyType = bodyUrl.substring(bodyUrl.lastIndexOf('/') + 1);
      localStorage.setItem("body-type", bodyType);
    } else {
      localStorage.removeItem("bodyUrl");
    }
    if (clothUrl) {
      localStorage.setItem("clothUrl", clothUrl);
    } else {
      localStorage.removeItem("clothUrl");
    }
  };

  if (error) {
    return (
      <div
        className="w-100  d-flex justify-content-center align-items-center bg-dark d-flex"
        style={{ height: "100dvh" }}
      >
        <div className="text-light p-2">
          <p className="text-center">
            Something went wrong while loading assets. if the issue persist
            contact support
          </p>

          <div
            className="d-flex justify-content-center"
            style={{ gap: "1.5em" }}
          >
            <button
              className="btn btn-light"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
            <button
              className="btn btn-danger "
              onClick={() => {
                localStorage.removeItem("modelId");
                localStorage.removeItem("weightId");
                localStorage.removeItem("heightId");
                window.location.reload();
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary
      fallback={
        <div
          className="w-100  d-flex justify-content-center align-items-center bg-black d-flex"
          style={{ height: "100dvh" }}
        >
          <div className="text-light p-2">
            <p className="text-center">
              Something went wrong while loading assets. if the issue persist
              contact support
            </p>

            <div
              className="d-flex justify-content-center"
              style={{ gap: "1.5em" }}
            >
              <button
                className="btn btn-light"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
              <button
                className="btn btn-danger "
                onClick={() => {
                  localStorage.removeItem("modelId");
                  localStorage.removeItem("weightId");
                  localStorage.removeItem("heightId");
                  localStorage.removeItem("hairstyle");

                  window.location.reload();
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      }
    >
      {<Loader show={!targetModel && !product && true} />}

      <div className="bg-black ">
        <div className="container-fluid main-window-container  ">
          <div className="row  h-100" style={{ background: "#000" }}>
            <div
              ref={container}
              className={` col-lg-12 col-12 h-100  d-flex  overflow-hidden p-0 position-relative canvas-div  `}
            >
              {/* {!canvasLoading && (
                <div
                  className="w-100 position-absolute bg-dark  h-100"
                  style={{ zIndex: "98" }}
                >
                  <SkeletonTheme baseColor="#0A0A0A" highlightColor="#1A1A1A">
                    <Skeleton width="100%" height="100%" />
                  </SkeletonTheme>
                </div>
              )} */}
              {loading && (
                <div
                  style={{ background: "rgba(0,0,0,0.3)", zIndex: "10" }}
                  className="w-100  absolute top-0 left-0 h-100 d-flex justify-content-center align-items-center"
                >
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}

              <div
                className={"w-100   position-relative"}
                style={{ height: "100%", zIndex: "9" }}
              >
                <div className="d-flex" id="views">
                  {/* Left side with first View */}
                  <div className="" style={{ flex: 1 }}>
                    <div className="position-relative">
                      <div
                        className=" rounded-3 mt-2 bg-primary"
                        style={{
                          height: "5px",
                          position: "absolute",
                          top: "15%",
                          left: "50%",
                          translate: "-50% 0%",
                          width:
                            showCompare && activeCanvas === 0 ? "20%" : "0%",
                          zIndex: "10",
                          transition: "0.3s linear",
                        }}
                      ></div>
                    </div>

                    <View
                      style={{
                        position: "absolute",
                        width: showCompare ? "50%" : "100%",
                        height: "100%",
                      }}
                      onClick={() => setActiveCanvas(0)}
                    >
                      <Lights
                        lightColor={lightColor}
                        lightPreference={lightPreference}
                      />

                      <Suspense fallback={null}>
                        <FinalScene
                          key="final"
                          setCanvasLoading={setCanvasLoading}
                          texturesList={texturesList[currentTshirtTexture]}
                        />
                      </Suspense>
                    </View>
                  </div>
                </div>

                {/* Canvas below the two Views */}
                <Canvas
                  id="plugin-canvas"
                  shadows={{ type: THREE.PCFSoftShadowMap }}
                  eventSource={container}
                  style={{ height: "100%", zIndex: "9" }}
                  camera={{ fov: 21, position: [0, 0, 3.4] }}
                  gl={{
                    toneMapping: THREE.ACESFilmicToneMapping,
                    outputColorSpace: THREE.SRGBColorSpace,
                    powerPreference: "high-performance",
                    premultipliedAlpha: false,
                    antialias: false,
                  }}
                >
                  <Leva hidden />
                  {/* <AdaptiveDpr pixelated /> */}
                  {/* <Perf position="top-left" /> */}

                  <Camera cameraControlsRef={cameraControlsRef} />
                  <View.Port />
                </Canvas>
              </div>

              <div
                className=" rounded-1  overflow-hidden  position-absolute"
                style={{
                  zIndex: "10",
                  bottom: "0%",
                  left: "0%",
                  cursor: "pointer",
                  transition: "0.5s ease-in-out",
                }}
                role="group"
                aria-label="Basic example"
              >
                <div className="d-flex mb-2" style={{ gap: "4px" }}>
                  <button
                    type="button"
                    style={{ height: "50px", width: "52px", backgroundColor: "#7F7E7B" }}
                    className={`btn pb-2 pt-2 rounded-2 d-block ${currentTshirtTexture === 0 ? "border-light  border-2 " : " border-0"
                      }`}
                    onClick={() => {
                      setCurrentTshirtTexture(0)
                    }}
                  >

                  </button>{" "}
                  <button
                    type="button"
                    style={{ height: "50px", width: "52px", backgroundColor: "#8599D1" }}
                    className={`btn pb-2 pt-2 rounded-2 d-block ${currentTshirtTexture === 1 ? "border-light  border-2 " : " border-0"
                      }`}
                    onClick={() => {
                      setCurrentTshirtTexture(1)
                    }}
                  >

                  </button>{" "}
                  <button
                    type="button"
                    style={{ height: "50px", width: "52px", backgroundColor: "#3D3630" }}
                    className={`btn pb-2 pt-2 rounded-2 d-block ${currentTshirtTexture === 2 ? "border-light  border-2 " : " border-0"
                      }`}
                    onClick={() => {
                      setCurrentTshirtTexture(2)
                    }}
                  >

                  </button>
                  <button
                    type="button"
                    style={{ height: "50px", width: "52px", backgroundColor: "#C6A9AA" }}
                    className={`btn pb-2 pt-2 rounded-2 d-block ${currentTshirtTexture === 3 ? "border-light  border-2 " : " border-0"
                      }`}
                    onClick={() => {
                      setCurrentTshirtTexture(3)
                    }}
                  >

                  </button>
                  <button
                    type="button"
                    style={{ height: "50px", width: "52px", background: "#463E3D" }}
                    className={`btn  pb-2 pt-2 rounded-2 d-block ${currentTshirtTexture === 4 ? "border-light  border-2 " : " border-0"
                      }`}
                    onClick={() => {
                      setCurrentTshirtTexture(4)
                    }}
                  >

                  </button>

                </div>
                <div className="d-flex mb-2" style={{ gap: "4px" }}>
                  <button
                    type="button"
                    style={{ height: "50px", width: "52px" }}
                    className={`btn  pb-2 pt-2 rounded-2 d-block ${tshirtSize === "1" ? "bg-black text-light " : " btn-light"
                      }`}
                    onClick={() => {
                      handleTshirtSizeChange("1")
                    }}
                  >
                    XS
                  </button>{" "}
                  <button
                    type="button"
                    style={{ height: "50px", width: "52px" }}
                    className={`btn  pb-2 pt-2 rounded-2 d-block ${tshirtSize === "2" ? "bg-black text-light " : " btn-light"
                      }`}
                    onClick={() => {
                      handleTshirtSizeChange("2")
                    }}
                  >
                    S
                  </button>{" "}
                  <button
                    type="button"
                    style={{ height: "50px", width: "52px" }}
                    className={`btn  pb-2 pt-2 rounded-2 d-block ${tshirtSize === "3" ? "bg-black text-light " : " btn-light"
                      }`}
                    onClick={() => {
                      handleTshirtSizeChange("3")
                    }}
                  >
                    M
                  </button>
                  <button
                    type="button"
                    style={{ height: "50px", width: "52px" }}
                    className={`btn  pb-2 pt-2 rounded-2 d-block ${tshirtSize === "4" ? "bg-black text-light " : " btn-light"
                      }`}
                    onClick={() => {
                      handleTshirtSizeChange("4")
                    }}
                  >
                    L
                  </button>
                  <button
                    type="button"
                    style={{ height: "50px", width: "52px" }}
                    onClick={() => {
                      handleTshirtSizeChange("5")
                    }}
                    className={`btn  pb-2 pt-2 rounded-2 d-block ${tshirtSize === "5" ? "bg-black text-light " : " btn-light"
                      }`}
                  >
                    XL
                  </button>
                  <button
                    type="button"
                    style={{ height: "50px", width: "52px" }}
                    onClick={() => {
                      handleTshirtSizeChange("6")
                    }}
                    className={`btn  pb-2 pt-2 rounded-2 d-block ${tshirtSize === "6" ? "bg-black text-light " : " btn-light"
                      }`}
                  >
                    XXL
                  </button>
                </div>
                
              {/* Body and Cloth URL */}
                <div className="d-flex align-items-end mb-3" style={{ gap: "12px" }}>
                  <div className="d-flex flex-column">
                    <label htmlFor="bodyInput" style={{ fontWeight: 500, fontSize: "14px", marginBottom: "4px" }}>
                      Body URL
                    </label>
                    <input
                      id="bodyInput"
                      type="text"
                      className="form-control"
                      placeholder="Enter Body URL"
                      value={bodyUrl}
                      onChange={(e) => handleUrlChange("body", e.target.value)}
                      style={{ width: "200px", fontSize: "14px", height: "40px" }}
                    />
                  </div>

                  <div className="d-flex flex-column">
                    <label htmlFor="clothInput" style={{ fontWeight: 500, fontSize: "14px", marginBottom: "4px" }}>
                      Cloth URL
                    </label>
                    <input
                      id="clothInput"
                      type="text"
                      className="form-control"
                      placeholder="Enter Cloth URL"
                      value={clothUrl}
                      onChange={(e) => handleUrlChange("cloth", e.target.value)}
                      style={{ width: "200px", fontSize: "14px", height: "40px" }}
                    />
                  </div>

                  <button
                    type="button"
                    className="btn btn-dark rounded-2"
                    style={{ height: "40px", fontSize: "14px", padding: "0 16px" }}
                    onClick={handleSubmit}
                  >
                    Change URL
                  </button>

                </div>
              </div>

              <div
                className=" rounded-1 d-none overflow-hidden lightMenu-bottom  position-absolute"
                style={{
                  zIndex: "10",

                  right: showMenu ? "3%" : "-30%",
                  cursor: "pointer",
                  transition: "0.5s ease-in-out",
                }}
                role="group"
                aria-label="Basic example"
              >
                <button
                  type="button"
                  style={{ height: "50px", width: "52px" }}
                  className={`btn  pb-2 pt-2 rounded-0 d-block ${lightPreference === "dark" ? "bg-black " : " btn-light"
                    }`}
                  onClick={() => {
                    setLightPrefernce("dark");
                  }}
                >
                  <img
                    src={`./assets/${lightPreference === "dark" ? "bright-active" : "bright"
                      }.png`}
                    className="img-fluid"
                    style={{ padding: "0.2em" }}
                    width={30}
                    alt="dark"
                  />
                </button>
                <button
                  type="button"
                  style={{ height: "50px", width: "52px" }}
                  className={`btn border-bottom  pb-2 pt-2 border-top rounded-0 d-block ${lightPreference === "neutral" ? "bg-black " : " btn-light"
                    }`}
                  onClick={() => {
                    setLightPrefernce("neutral");
                  }}
                >
                  <img
                    src={`./assets/${lightPreference === "neutral"
                      ? "neutral-active"
                      : "neutral"
                      }.png`}
                    className="img-fluid"
                    style={{ padding: "0.1em" }}
                    width={30}
                    alt="dark"
                  />
                </button>

                <button
                  type="button"
                  style={{ height: "50px", width: "52px" }}
                  className={`btn rounded-0 d-block pb-2 pt-2 ${lightPreference === "bright" ? "bg-black" : " btn-light"
                    }`}
                  onClick={() => {
                    setLightPrefernce("bright");
                  }}
                >
                  <img
                    src={`./assets/${lightPreference === "bright" ? "dark-active" : "dark"
                      }.png`}
                    className="img-fluid"
                    style={{ padding: "0.2em" }}
                    width={30}
                    alt="dark"
                  />
                </button>
              </div>

              {/* MENU */}
              <div
                className={`model-menu position-absolute  d-none  text-light   `}
                style={{
                  zIndex: "10",
                  top: "5%",
                  left: showMenu ? "3%" : "-20%",
                  cursor: "pointer",
                  background: "#000000",
                  transition: "0.5s ease-in-out",
                  border: "0.8px solid #2E2E2E",
                }}
              >
                <div
                  style={{ height: "50px", width: "52px" }}
                  id="hamburger"
                  onClick={() => {
                    let element = document.getElementById("hamburger");
                    element.classList.toggle("show");
                    let menu = document.getElementById("menu-btns");
                    menu.classList.toggle("hide-menu-btns");
                  }}
                >
                  <div id="wrapper">
                    <span class="icon-bar" id="one"></span>
                    <span class="icon-bar" id="two"></span>
                    <span class="icon-bar" id="thr"></span>
                  </div>
                </div>

                {/* ............. */}

                <div
                  className="position-relative hide-menu-btns"
                  id="menu-btns"
                >
                  <div
                    style={{
                      height: "55px",
                      width: "52px",
                      borderTop: "0.8px solid #2E2E2E",
                    }}
                    className="p-1 position-relative   d-flex align-items-center justify-content-center  text-center mt-1"
                    onClick={() => {
                      setShowLightsPanel(true);
                      setShowMenu(false);
                    }}
                  >
                    {/* <Icon icon="mdi:lightbulb-on" width={25} /> */}
                    <Sun size={25} />
                  </div>

                  <div
                    style={{
                      height: "55px",
                      width: "52px",
                      borderTop: "0.8px solid #2E2E2E",
                    }}
                    className="p-1 align-items-center d-flex justify-content-center  text-center "
                    data-toggle="tooltip"
                    data-placement="right"
                    title="HairStyles"
                    onClick={() => {
                      if (!showCompare) {
                        setShowHairStylePanel(true);
                        setShowMenu(false);
                        if (cameraControlsRef.current) {
                          // Set the initial camera position and target
                          const mesh =
                            targetModel.scene.getObjectByName(currentHairStyle);

                          if (!mesh) return;

                          const box3 = new THREE.Box3().setFromObject(mesh);
                          const position = new THREE.Vector3();
                          box3.getCenter(position);

                          cameraControlsRef.current.setLookAt(
                            0.7,
                            box3.min.y,
                            1.5, // Camera position (x, y, z)
                            0,
                            box3.min.y,
                            0,
                            true // Enable smooth transition
                          );
                        }
                      }
                    }}
                  >
                    <Scissors size={22} />
                  </div>

                  <div
                    className="p-1   d-flex align-items-center justify-content-center  text-center "
                    data-toggle="tooltip"
                    style={{
                      height: "55px",
                      width: "52px",
                      borderTop: "0.8px solid #2E2E2E",
                    }}
                    data-placement="right"
                    title="Compare"
                    onClick={() => {
                      setShowCompare(!showCompare);
                    }}
                  >
                    {/* <Icon icon="ic:round-compare-arrows" width={30} /> */}
                    <ArrowLeftRight size={24} />
                  </div>
                </div>
              </div>

              {/* Generate Avatar */}

              <div
                className={`model-menu position-absolute ${showCompare ? "d-none" : "d-lg-block"
                  }   text-light   `}
                style={{
                  zIndex: "10",
                  top: "5%",
                  right: showMenu ? "3%" : "-20%",
                  cursor: "pointer",
                  background: "#000000",
                  transition: "0.5s ease-in-out",
                  border: "0.8px solid #2E2E2E",
                }}
              >
                <div
                  style={{ height: "50px", width: "52px" }}
                  className="p-1 align-items-center d-flex justify-content-center  text-center "
                  onClick={() => {
                    navigate("/generate");
                  }}
                >
                  {/* <UserRoundPlus  /> */}
                  <UserRoundCog size={25} />
                  {/* <Settings2  size={25}/> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default AppScreen;
