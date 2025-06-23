import React, { memo, useState } from "react";
import { Icon } from "@iconify/react";
import "../css/panel.css";
import { HAIR_COLOR_LIGHT_BROWN, HAIR_COLOR_JET_BLACK, HAIR_COLOR_ASH_BROWN, HAIR_COLOR_DARK_BROWN, HAIR_COLOR_WHITE } from '../common/constants.js';
const HairsSideBar = memo(
  ({
    currentHairStyle,

    setCurrentHairStyle,
    showHairStylePanel,
    setShowHairStylePanel,
    setShowMenu,
    cameraControlsRef,
    setCurrentHairColor,
    currentHairColor
  }) => {
    const [activeHairTab, setActiveHairTab] = useState("Styles");

    const hairstyles = [
      {
        name: "Hair_Classic_Short",
        img: "./assets/CLASSIC.png",
      },
      {
        name: "Hair_Curly_Fade",
        img: "./assets/CURLY.png",
      },
      {
        name: "Hair_Receding",
        img: "./assets/RECEDING.png",
      },
      {
        name: "Hair_One_Side",
        img: "./assets/ONESIDE.png",
      },
      {
        name: "Hair_Straight_Pull",
        img: "./assets/STRAIGHT.png",
      },
    ];

    const hairColors = [
      {
        name: "LightBrown",
        img: HAIR_COLOR_LIGHT_BROWN,
      },
      {
        name: "JetBlack",
        img: HAIR_COLOR_JET_BLACK,
      },
      {
        name: "AshBrown",
        img: HAIR_COLOR_ASH_BROWN,
      },
      {
        name: "DarkBrown",
        img: HAIR_COLOR_DARK_BROWN,
      },
      {
        name: "White",
        img: HAIR_COLOR_WHITE,
      },
    ];

    return (
      <div
        className={`left-side-panel  ${showHairStylePanel && "left-side-panel-active"
          } overflow-auto  p-0 position-absolute`}
      >
        <div
          className=" h-100 position-relative  w-100 pt-2   "
          style={{ background: "#000", zIndex: "1" }}
        >
          <div className=" pb-0  position-sticky" style={{ top: "0%", background: "#000" }}>
            <div className=" d-flex     ps-2 pe-2 align-items-center justify-content-between">
              <p className="text-light m-0" style={{ fontSize: "0.9em", }}>
                Hairstyles
              </p>

              <div className="">
                <Icon
                  icon="bitcoin-icons:cross-outline"
                  width={25}
                  className="text-light"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setShowHairStylePanel(false);
                    setShowMenu(true);
                    if (cameraControlsRef.current) {
                      // Set the initial camera position and target
                      cameraControlsRef.current.setLookAt(
                        0,
                        1.6,
                        6, // Camera position (x, y, z)
                        0,
                        0.9,
                        0, // Target position (x, y, z)
                        true // Enable smooth transition
                      );
                    }
                  }}
                />
              </div>
            </div>
            <hr className="bg-light mt-2 mb-1 text-light" />
            <div className="p-1 pe-2">
              <div
                className="d-flex   rounded-0 p-0 align-items-center  border-on-black "
                style={{ fontSize: "0.80em", background: "" }}
              >
                <div
                  className={`col-6 p-0 pt-2 pb-2 rounded-0  cursor-pointer transition-colors    text-center ${activeHairTab === "Styles"
                      ? " text-white border-on-black bg-zinc-900 "
                      : "text-[#ffffff99]"
                    } `}
                >
                  <button
                    style={{ border: "0px", background: "none" }}
                    className="m-0 text-center d-block w-100"
                    onClick={() => setActiveHairTab("Styles")}
                  >
                    Styles
                  </button>
                </div>
                <div
                  className={`col-6 p-0  pt-2 pb-2 rounded-0   text-center ${activeHairTab === "Colors"
                      ? "  text-white border-on-black bg-zinc-900 "
                      : "text-[#ffffff99]"
                    } `}
                >
                  <button
                    style={{ border: "0px", background: "none" }}
                    className="m-0 d-block w-100"
                    onClick={() => setActiveHairTab("Colors")}
                  >
                    Colors
                  </button>
                </div>{" "}
              </div>
            </div>

          </div>


          <div className="p-2  pt-0 pe-3">
            <div className="row  ">
              {activeHairTab === "Styles" && hairstyles.map((item) => (
                <div className="col-6  p-2">
                  <div
                    className={` p-2 ${currentHairStyle === item.name
                        ? "active-hair "
                        : "border-on-black"
                      } `}
                    style={{ cursor: "pointer" }}
                    onClick={() => setCurrentHairStyle(item.name)}
                  >
                    <img src={item.img} className="img-fluid" alt="" />
                  </div>
                </div>
              ))}


              {activeHairTab === "Colors" &&
                hairColors.map((item) => (
                  <div className="col-6  p-2">
                    <div
                      className={` p-2 ${currentHairColor === item.name
                          ? "active-hair "
                          : "border-on-black"
                        } `}
                      style={{ cursor: "pointer" }}
                      onClick={() => setCurrentHairColor(item.name)}
                    >
                      <img src={item.img} className="img-fluid" alt="" />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default HairsSideBar;
