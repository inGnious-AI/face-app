import { useState, useRef, useEffect , memo } from "react";
import FabricsCard from "./FabricsCard";
const tabs = ["Styles", "Jackets", "Shirts", "Trousers"];
const DesktopMenu = (({
  activeFabricTab,
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
  setCompareTrouserDetails,
  compareStyleDetails,
  setActiveFabricTab,
  compareShirtDetails,
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
      setActiveFabricTab(
        tabs[activeIndex] === "Jackets" ? "Suits" : tabs[activeIndex]
      );
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
    <>
      <div
        className="p-lg-3 pb-lg-2 ps-lg-2 pe-lg-2  w-100  position-sticky "
        style={{ top: "0%", background: "#000", zIndex: "1" }}
      >
        <div className="d-flex align-items-center justify-content-between">
          <p className="text-light m-0">Explore fabrics </p>
        </div>{" "}
        <hr className="bg-light mt-2 mb-2 text-light" />
        <div className="relative d-none">
          {/* Hover Highlight */}
          <div
            className="absolute h-[30px] transition-all duration-300 ease-out bg-[#0e0f1114]  rounded-[6px] flex items-center"
            style={{
              ...hoverStyle,
              opacity: hoveredIndex !== null ? 1 : 0,
            }}
          />
          <div
            className="absolute bottom-[-6px] left-0 right-0 h-[1px]"
            style={{ background: "#2E2E2E" }}
          />
          {/* Active Indicator */}
          <div
            className="absolute bottom-[-6px] h-[2px] bg-white transition-all duration-300 ease-out"
            style={activeStyle}
          />

          {/* Tabs */}
          <div className="relative flex space-x-[5px] items-center">
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
                <div className="text-sm  leading-5 whitespace-nowrap flex items-center justify-center h-full">
                  {tab}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="d-flex   rounded-0 p-0 align-items-center  "
          style={{ fontSize: "0.75em", background: "#0F0F0F" }}
        >
          <div
            className={`col-3 pt-2 pb-2 rounded-0  cursor-pointer transition-colors    text-center ${
              activeFabricTab === "Styles"
                ? "active-fabric  text-white border-on-black "
                : "text-[#ffffff99]"
            } `}
          >
            <button
              style={{ border: "0px", background: "none" }}
              className="m-0 text-center d-block w-100"
              onClick={() => setActiveFabricTab("Styles")}
            >
              Styles
            </button>
          </div>
          <div
            className={`col-3 pt-2 pb-2 rounded-0   text-center ${
              activeFabricTab === "Suits" ? "active-fabric  text-white border-on-black "
                : "text-[#ffffff99]"
            } `}
          >
            <button
              style={{ border: "0px", background: "none",  }}
              className="m-0 d-block w-100"
              onClick={() => setActiveFabricTab("Suits")}
            >
              Jackets
            </button>
          </div>{" "}
          <div
            className={`col-3 pt-2 pb-2 rounded-0    text-center ${
              activeFabricTab === "Shirts"  ? "active-fabric  text-white border-on-black "
                : "text-[#ffffff99]"
            } `}
          >
            <button
              style={{ border: "0px", background: "none",  }}
              className="m-0 d-block w-100"
              onClick={() => setActiveFabricTab("Shirts")}
            >
              Shirts
            </button>
          </div>
          <div
            className={`col-3 pt-2 pb-2 rounded-0    text-center ${
              activeFabricTab === "Trousers"  ? "active-fabric  text-white border-on-black "
                : "text-[#ffffff99]"
            } `}
          >
            <button
              style={{ border: "0px", background: "none",  }}
              className="m-0 text-center d-block w-100"
              onClick={() => setActiveFabricTab("Trousers")}
            >
              Trousers
            </button>
          </div>
        </div>
      </div>
      <div className="p-3 ps-lg-2  mt-2  pt-0" style={{ zIndex: "-1" }}>
        {activeFabricTab === "Styles" && (
          <div className="styles-lg-list">
            <div
              className={`position-relative p-0  border-on-black  rounded-0 align-items-center d-flex justify-content-center ${
                styleDetails === "Double_Breasted" && "active-style "
              }`}
              onClick={() => {
                if (activeCanvas === 1) {
                  setCompareStyleDetails("Double_Breasted");
                } else {
                  setStyleDetails("Double_Breasted");
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
              <div className=" col-6 ps-3 ">
                <p className="text-light  text-justify ">Double Breasted</p>
              </div>

              <img
                src="./assets/DB_PREVIEW.png"
                className="img-fluid col-6 d-block mx-auto "
                alt=""
              />
            </div>

            <div
              className={`position-relative mt-3 border-on-black  rounded-0 align-items-center d-flex justify-content-center ${
                styleDetails === "American" && "active-style "
              }`}
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
              <div className=" col-6 ps-3">
                <p className="text-light   ">Single Breasted American</p>
              </div>

              <img
                src="./assets/AMERICAN_PREVIEW.png"
                className="img-fluid col-6 d-block mx-auto "
                alt=""
              />
            </div>

            <div
              className={`position-relative mt-3  border-on-black  rounded-0 align-items-center d-flex justify-content-center ${
                styleDetails === "Italian" && "active-style "
              }`}
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
              <div className=" col-6 ps-3">
                <p className="text-light   ">Single Breasted Italian</p>
              </div>

              <img
                src="./assets/Italian_PREVIEW.png"
                className="img-fluid col-6 d-block mx-auto "
                alt=""
              />
            </div>
          </div>
        )}
        {activeFabricTab !== "Styles" && (
          <div className="row mt-0">
            {fabricData &&
              fabricData.map((item) => {
                return (
                  item.category.includes(activeFabricTab) && (
                    <div
                      className={` ${
                        window.innerWidth > 1500 ? "col-4" : "col-6"
                      }`}
                    >
                      <FabricsCard
                        item={item}
                        showCompare={showCompare}
                        activeFabricTab={activeFabricTab}
                        activeCanvas={activeCanvas}
                        setLightPrefernce={setLightPrefernce}
                        setCompareLightPrefernce={setCompareLightPrefernce}
                        details={
                          activeFabricTab === "Suits"
                            ? suitDetails
                            : activeFabricTab === "Shirts"
                            ? shirtDetails
                            : trouserDetails
                        }
                        compareDetails={
                          activeFabricTab === "Suits"
                            ? compareSuitDetails
                            : activeFabricTab === "Shirts"
                            ? compareShirtDetails
                            : compareTrouserDetails
                        }
                        setFabric={
                          activeFabricTab === "Suits"
                            ? setSuitDetails
                            : activeFabricTab === "Shirts"
                            ? setShirtDetails
                            : setTrouserDetails
                        }
                        setCompareFabric={
                          activeFabricTab === "Suits"
                            ? setCompareSuitDetails
                            : activeFabricTab === "Shirts"
                            ? setCompareShirtDetails
                            : setCompareTrouserDetails
                        }
                      />
                    </div>
                  )
                );
              })}
          </div>
        )}
      </div>
    </>
  );
});

export default DesktopMenu;
