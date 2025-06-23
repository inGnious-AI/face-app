import React, { memo } from "react";
import { Icon } from "@iconify/react";
import "../css/panel.css";
const LightsSideBar = memo(
  ({
    lightColor,
    fullScreen,
    setLightColor,
    showLightsPanel,
    setShowLightsPanel,
    setShowMenu,
    cameraControlsRef,
  }) => {
    return (
      <div
        className={`left-side-panel ${
          showLightsPanel && "left-side-panel-active"
        } overflow-hidden  p-0 position-absolute`}
      >
        <div
          className="  w-100 pt-2  position-sticky "
          style={{ top: "0%", zIndex: "1" }}
        >
          <div className="d-flex ps-2 pe-2 align-items-center justify-content-between">
            <p className="text-light m-0" style={{ fontSize: "0.9em" }}>
              Lights
            </p>

            <div>
              <Icon
                icon="bitcoin-icons:cross-outline"
                width={25}
                className="text-light"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setShowLightsPanel(false);
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
          </div>{" "}
          <hr className="bg-light mt-2 text-light" />
          <div>
            <div className="row p-2 pe-3 pt-0">
              <div className="col-6  p-2">
                <div
                  className={`  rounded-1 ${
                    lightColor == "#FFFFFF" && "active-item overflow-hidden"
                  } `}
                  style={{ cursor: "pointer" }}
                  onClick={() => setLightColor("#FFFFFF")}
                >
                  <img
                    src="./assets/Neutral-Light.png"
                    className="img-fluid   "
                    alt=""
                  />
                </div>
              </div>
              <div className="col-6  p-2">
                <div
                  className={` rounded-1 ${
                    lightColor == "#FDFBD3" && "active-item"
                  } `}
                  style={{ cursor: "pointer" }}
                  onClick={() => setLightColor("#FDFBD3")}
                >
                  <img
                    src="./assets/Yellow-Light.png"
                    className="img-fluid  "
                    alt=""
                  />
                </div>
              </div>
              <div className="col-6 p-2">
                <div
                  className={` rounded-1 ${
                    lightColor == "#E2C3B9" && "active-item"
                  } `}
                  style={{ cursor: "pointer" }}
                  onClick={() => setLightColor("#E2C3B9")}
                >
                  <img
                    src="./assets/Warm-Light.png"
                    className="img-fluid   "
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default LightsSideBar;
