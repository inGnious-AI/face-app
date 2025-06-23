import React, { memo } from "react";
import { Icon } from "@iconify/react";
import "../css/panel.css";
const ShoesSideBar = memo(
  ({
    shoesColor,
    fullScreen,
    setShoesColor,
    showShoesPanel,
    setShowShoesPanel,
    setShowMenu,
    cameraControlsRef,
  }) => {
    return (
      <div
        className={`left-side-panel ${
          showShoesPanel && "left-side-panel-active"
        } overflow-hidden  p-0 position-absolute`}
      >
        <div
          className="  w-100 pt-2  position-sticky "
          style={{ top: "0%", background: "#342F2F", zIndex: "1" }}
        >
          <div className="d-flex ps-2 pe-2 align-items-center justify-content-between">
            <p className="text-light m-0" style={{ fontSize: "0.9em" }}>
              Shoes
            </p>

            <div>
              <Icon
                icon="bitcoin-icons:cross-outline"
                width={25}
                className="text-light"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setShowShoesPanel(false);
                  setShowMenu(true);
                  if (cameraControlsRef.current) {
                    // Set the initial camera position and target
                    cameraControlsRef.current.setLookAt(
                      0,
                      -1.5,
                      6, // Camera position (x, y, z)
                      0,
                      -2.2,
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
                  className={` rounded-3 ${shoesColor == 0 && "active-item"} `}
                  style={{ background: "#555555", cursor: "pointer" }}
                  onClick={() => setShoesColor(0)}
                >
                  <img
                    src="https://protal-web-assest.s3.ap-south-1.amazonaws.com/Dump/Black-Shoes.png"
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </div>
              <div className="col-6  p-2">
                <div
                  className={` rounded-3 ${shoesColor == 1 && "active-item"} `}
                  style={{ background: "#555555", cursor: "pointer" }}
                  onClick={() => setShoesColor(1)}
                >
                  <img
                    src="https://protal-web-assest.s3.ap-south-1.amazonaws.com/Dump/Brown-Shoes.png"
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </div>
              <div className="col-6 p-2">
                <div
                  className={` rounded-3 ${shoesColor == 2 && "active-item"} `}
                  style={{ background: "#555555", cursor: "pointer" }}
                  onClick={() => setShoesColor(2)}
                >
                  <img
                    src="https://protal-web-assest.s3.ap-south-1.amazonaws.com/Dump/Tan-Shoes.png"
                    className="img-fluid"
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

export default ShoesSideBar;
