import React from "react";
import { Icon } from "@iconify/react";
import FabricsCard from "./FabricsCard";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import { useState, useRef, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import { Info } from "lucide-react";
const tabs = ["Styles", "Jackets", "Shirts", "Trousers"];

const MobileMenu = ({
  styleDetails,
  activeCanvas,
  setCompareStyleDetails,
  setStyleDetails,
  fabricData,
  compareSuitDetails,
  showCompare,
  suitDetails,
  setCompareSuitDetails,
  setSuitDetails,
  shirtDetails,
  setShirtDetails,
  setCompareShirtDetails,
  trouserDetails,
  compareTrouserDetails,
  setTrouserDetails,
  compareShirtDetails,
  setCompareTrouserDetails,
  compareStyleDetails,
  setLightPrefernce,
  setCompareLightPrefernce
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverStyle, setHoverStyle] = useState({});
  const [activeStyle, setActiveStyle] = useState({ left: "0px", width: "0px" });

  const tabRefs = useRef([]);

  useEffect(() => {
    if (hoveredIndex !== null) {
      const hoveredElement = tabRefs.current[hoveredIndex];
      if (hoveredElement) {
        const { offsetLeft, offsetWidth } = hoveredElement;
        setHoverStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        });
      }
    }
  }, [hoveredIndex]);

  useEffect(() => {
    const activeElement = tabRefs.current[activeIndex];
    if (activeElement) {
      const { offsetLeft, offsetWidth } = activeElement;
      setActiveStyle({
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    requestAnimationFrame(() => {
      const overviewElement = tabRefs.current[0];
      if (overviewElement) {
        const { offsetLeft, offsetWidth } = overviewElement;
        setActiveStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        });
      }
    });
  }, []);

  return (
    <div
      className={`position-fixed mobile-menu p-2 pt-3 ps-3  d-lg-none`}
      style={{
        bottom: "0%",
        width: "100%",
        zIndex: "99",
        background: "#000000",
        minHeight: "22dvh",
        // maxHeight: "22dvh",

        overflowY: "hidden",
      }}
    >
      

      <div className={`flex  items-center w-full  `}>
        <div className={`w-full  relative flex items-center `}>
          <div className="p-0 w-full">
            <div className="relative">
              <div className="absolute bottom-[-5px] left-0 right-0 h-[1px] bg-gray-700 " />

              {/* Hover Highlight */}
              <div
                className="absolute  transition-all duration-300 ease-out bg-white   rounded-[6px] flex items-center"
                style={{
                  ...hoverStyle,
                  opacity: hoveredIndex !== null ? 1 : 0,
                }}
              />

              {/* Active Indicator */}
              <div
                className="absolute bottom-[-5px] h-[2px]  bg-white transition-all duration-300 ease-out"
                style={activeStyle}
              />

              {/* Tabs */}
              <div className="relative flex space-x-[15px] items-center">
                {tabs.map((tab, index) => (
                  <div
                    key={index}
                    ref={(el) => (tabRefs.current[index] = el)}
                    className={`px-3 py-2 cursor-pointer transition-colors duration-300 h-[30px] ${
                      index === activeIndex ? "text-white" : "text-[#ffffff99]"
                    }`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => setActiveIndex(index)}
                  >
                    <div className="text-sm font-sans leading-5 whitespace-nowrap flex items-center justify-center h-full">
                      {tab}
                    </div>
                  </div>
                ))}
            
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-md-4 mt-3   ">
        {tabs[activeIndex] === "Styles" && (
          <Splide
            style={{ zIndex: "99" }}
            options={{
              rewind: true,
              width: 800,
              drag: "free",
              gap: "1rem",
              arrows: false,
              pagination: false,
              padding: { left: "0.0rem", right: "13rem" },
              perPage: 2,
              snap: true,
              breakpoints: {
                600: {
                  perPage: 1,
                  gap: "1rem",
                  padding: { left: "0.5rem", right: "7rem" },
                },
              },
            }}
          >
            <SplideSlide>
              <div
                style={{
                  background: `${
                    styleDetails === "Double_Breasted" ? "#151515" : ""
                  }`,
                  border: `0.8px solid  #2E2E2E`,
                }}
                className={`rounded-1  justify-content-between   align-items-center d-flex `}
                onClick={() => {
                  if (activeCanvas === 1) {
                    setCompareStyleDetails("Double_Breasted");
                  } else {
                    setStyleDetails("Double_Breasted");
                  }
                }}
              >
                <div
                  className=" rounded-3 flex mt-2 "
                  style={{
                    height: "3px",
                    position: "absolute",
                    top: "5%",
                    left: "5%",
                    background: " #9858FF",
                    translate: "-5% 0%",
                    width: styleDetails === "Double_Breasted" ? "10%" : "0%",
                    zIndex: "10",
                    transition: "0.3s ease",
                  }}
                ></div>

                <div
                  className=" rounded-3 mt-2 "
                  style={{
                    height: "3px",
                    position: "absolute",
                    top: "5%",
                    left: styleDetails === compareStyleDetails ? "20%" : "5%",
                    background: "#FFC107",
                    translate: "-10% 0%",
                    width:
                      showCompare && compareStyleDetails === "Double_Breasted"
                        ? "10%"
                        : "0%",
                    zIndex: "10",
                    transition: "0.3s ease",
                  }}
                ></div>

                <p
                  style={{ fontSize: "0.9em", fontWeight: "500" }}
                  className="text-light ms-2"
                >
                  Double Breasted
                </p>

                <img
                  src="./assets/DB_PREVIEW.png"
                  style={{ width: "50%" }}
                  className="img-fluid "
                  alt=""
                />
              </div>
            </SplideSlide>{" "}
            <SplideSlide>
              <div
                style={{
                  background: `${styleDetails === "American" ? "#151515" : ""}`,
                  border: `0.8px solid  #2E2E2E`,
                }}
                className={` rounded-1 align-items-center d-flex `}
                onClick={() => {
                  if (activeCanvas === 1) {
                    setCompareStyleDetails("American");
                  } else {
                    setStyleDetails("American");
                  }
                }}
              >
                <div
                  className=" rounded-3 mt-2 "
                  style={{
                    height: "3px",
                    position: "absolute",
                    top: "5%",
                    left: "5%",
                    background: " #9858FF",
                    translate: "-5% 0%",
                    width: styleDetails === "American" ? "10%" : "0%",
                    zIndex: "10",
                    transition: "0.3s ease",
                  }}
                ></div>

                <div
                  className=" rounded-3 mt-2 "
                  style={{
                    height: "3px",
                    position: "absolute",
                    top: "5%",
                    left: styleDetails === compareStyleDetails ? "20%" : "5%",
                    background: "#FFC107",
                    translate: "-10% 0%",
                    width:
                      showCompare && compareStyleDetails === "American"
                        ? "10%"
                        : "0%",
                    zIndex: "10",
                    transition: "0.3s ease",
                  }}
                ></div>
                <p
                  style={{ fontSize: "0.9em", fontWeight: "500" }}
                  className="text-light ms-2"
                >
                  Single Breasted American
                </p>
                <img
                  src="./assets/AMERICAN_PREVIEW.png"
                  style={{ width: "50%" }}
                  className="img-fluid   "
                  alt=""
                />
              </div>
            </SplideSlide>{" "}
            <SplideSlide>
              <div
                style={{
                  background: `${styleDetails === "Italian" ? "#151515" : ""}`,
                  border: `0.8px solid  #2E2E2E`,
                }}
                className={`rounded-1 align-items-center d-flex`}
                onClick={() => {
                  if (activeCanvas === 1) {
                    setCompareStyleDetails("Italian");
                  } else {
                    setStyleDetails("Italian");
                  }
                }}
              >
                <div
                  className=" rounded-3 mt-2 "
                  style={{
                    height: "3px",
                    position: "absolute",
                    top: "5%",
                    left: "5%",
                    background: " #9858FF",
                    translate: "-5% 0%",
                    width: styleDetails === "Italian" ? "10%" : "0%",
                    zIndex: "10",
                    transition: "0.3s ease",
                  }}
                ></div>

                <div
                  className=" rounded-3 mt-2 "
                  style={{
                    height: "3px",
                    position: "absolute",
                    top: "5%",
                    left: styleDetails === compareStyleDetails ? "20%" : "5%",
                    background: "#FFC107",
                    translate: "-10% 0%",
                    width:
                      showCompare && compareStyleDetails === "Italian"
                        ? "10%"
                        : "0%",
                    zIndex: "10",
                    transition: "0.3s ease",
                  }}
                ></div>
                <p
                  style={{ fontSize: "0.9em", fontWeight: "500" }}
                  className="text-light ms-2"
                >
                  Single Breasted Italian
                </p>
                <img
                  src="./assets/Italian_PREVIEW.png"
                  style={{ width: "50%" }}
                  className="img-fluid   "
                  alt=""
                />
              </div>
            </SplideSlide>
          </Splide>
        )}
        {tabs[activeIndex] === "Jackets" && (
          <Splide
            style={{ zIndex: "99" }}
            options={{
              rewind: true,
              width: 800,
              drag: "free",
              gap: "1rem",
              arrows: false,
              pagination: false,
              perPage: 6,
              snap: true,
              breakpoints: {
                600: {
                  perPage: 4,
                },
              },
            }}
          >
           

            {fabricData &&
              fabricData.map((item) => {
                return (
                  item.category.includes("Suits") && (
                    <SplideSlide>
                      <FabricsCard
                        item={item}
                        showCompare={showCompare}
                        activeFabricTab={"Suits"}
                        activeCanvas={activeCanvas}
                        details={suitDetails}
                        compareDetails={compareSuitDetails}
                        setFabric={setSuitDetails}
                        setCompareFabric={setCompareSuitDetails}
                        setLightPrefernce={setLightPrefernce}
                        setCompareLightPrefernce={setCompareLightPrefernce}
                      />
                    </SplideSlide>
                  )
                );
              })}
          </Splide>
        )}

        {tabs[activeIndex] === "Shirts" && (
          <Splide
            style={{ zIndex: "99" }}
            options={{
              rewind: true,
              width: 800,
              drag: "free",
              gap: "1rem",
              arrows: false,
              pagination: false,
              perPage: 6,
              snap: true,
              breakpoints: {
                600: {
                  perPage: 4,
                },
              },
            }}
          >
            {fabricData &&
              fabricData.map((item) => {
                return (
                  item.category.includes("Shirts") &&
                  item.skuCode === "825178028-39P" && (
                    <SplideSlide>
                      <FabricsCard
                        item={item}
                        showCompare={showCompare}
                        activeFabricTab={"Shirts"}
                        activeCanvas={activeCanvas}
                        details={shirtDetails}
                        compareDetails={compareShirtDetails}
                        setFabric={setShirtDetails}
                        setCompareFabric={setCompareShirtDetails}
                      />
                    </SplideSlide>
                  )
                );
              })}
            {fabricData &&
              fabricData.map((item) => {
                return (
                  item.category.includes("Shirts") &&
                  item.skuCode === "982398060-01C" && (
                    <SplideSlide>
                      <FabricsCard
                        item={item}
                        showCompare={showCompare}
                        activeFabricTab={"Shirts"}
                        activeCanvas={activeCanvas}
                        details={shirtDetails}
                        compareDetails={compareShirtDetails}
                        setFabric={setShirtDetails}
                        setCompareFabric={setCompareShirtDetails}
                      />
                    </SplideSlide>
                  )
                );
              })}
            {fabricData &&
              fabricData.map((item) => {
                return (
                  item.category.includes("Shirts") && (
                    <SplideSlide>
                      <FabricsCard
                        item={item}
                        showCompare={showCompare}
                        activeFabricTab={"Shirts"}
                        activeCanvas={activeCanvas}
                        details={shirtDetails}
                        compareDetails={compareShirtDetails}
                        setFabric={setShirtDetails}
                        setCompareFabric={setCompareShirtDetails}
                      />
                    </SplideSlide>
                  )
                );
              })}
          </Splide>
        )}

        {tabs[activeIndex] === "Trousers" && (
          <Splide
            style={{ zIndex: "99" }}
            options={{
              rewind: true,
              width: 800,
              drag: "free",
              gap: "1rem",
              arrows: false,
              pagination: false,
              perPage: 6,
              snap: true,
              breakpoints: {
                600: {
                  perPage: 4,
                },
              },
            }}
          >
            {fabricData &&
              fabricData.map((item) => {
                return (
                  item.category.includes("Trousers") &&
                  item.skuCode === "3434320002" && (
                    <SplideSlide>
                      <FabricsCard
                        item={item}
                        showCompare={showCompare}
                        activeFabricTab={"Trousers"}
                        activeCanvas={activeCanvas}
                        details={trouserDetails}
                        compareDetails={compareTrouserDetails}
                        setFabric={setTrouserDetails}
                        setCompareFabric={setCompareTrouserDetails}
                      />
                    </SplideSlide>
                  )
                );
              })}
            {fabricData &&
              fabricData.map((item) => {
                return (
                  item.category.includes("Trousers") && (
                    <SplideSlide>
                      <FabricsCard
                        item={item}
                        showCompare={showCompare}
                        activeFabricTab={"Trousers"}
                        activeCanvas={activeCanvas}
                        details={trouserDetails}
                        compareDetails={compareTrouserDetails}
                        setFabric={setTrouserDetails}
                        setCompareFabric={setCompareTrouserDetails}
                      />
                    </SplideSlide>
                  )
                );
              })}
          </Splide>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
