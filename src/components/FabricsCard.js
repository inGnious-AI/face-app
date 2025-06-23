import React, { memo, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Icon } from "@iconify/react";
import "react-loading-skeleton/dist/skeleton.css";
import "../css/fabric-card.css";

const FabricsCard = memo(
  ({
    item,
    details,
    setFabric,
    activeFabricTab,
    compareDetails,
    showCompare,
    setCompareFabric,
    activeCanvas,
    setLightPrefernce,
    setCompareLightPrefernce,
  }) => {
    const [showSkeletion, setShowSkeletion] = useState(true);

    return (
      <div className="mb-lg-3 position-relative" key={item.skuCode}>
        <div
          className="rounded-1 overflow-hidden"
          style={{
            border:
              details?.skuCode === item.skuCode
                ? "1.4px solid #242CFF"
                : showCompare && compareDetails?.skuCode === item.skuCode
                ? "1.4px solid #FFB224"
                : "1px solid #2E2E2E",
          }}
        >
          {(details?.skuCode === item.skuCode ||
            (showCompare && compareDetails?.skuCode === item.skuCode)) && (
            <div
              className="position-absolute selected-icon-container"
              style={{ top: "7%", right: "3%" }}
            >
              <Icon
                icon="teenyicons:tick-circle-solid"
                className="selected-icon"
                style={{
                  color:
                    details?.skuCode === item.skuCode ? "#9858FF" : "#FFC107",
                }}
              />
            </div>
          )}

          {/* Skeleton Loader */}
          {showSkeletion && (
            <div
              className="w-100 h-100 position-absolute"
              style={{ top: 0, left: 0 }}
            >
              <SkeletonTheme baseColor="#202020" highlightColor="#444">
                <Skeleton width="100%" height="100%" />
              </SkeletonTheme>
            </div>
          )}

          {/* Image */}
          <img
            src={`https://raymond101.s3.ap-south-1.amazonaws.com/${activeFabricTab}/${item.skuCode}/Preview.jpg`}
            className="img-fluid d-block mx-auto cursor-pointer"
            alt=""
            onLoad={(e) => {
              setShowSkeletion(false);
            }}
            onClick={() => {
              if (showCompare) {
                if (activeCanvas === 1) {
                  setCompareLightPrefernce(
                    item.lightingType ? item.lightingType : "neutral"
                  );
                  setCompareFabric(item);
                } else {
                  setLightPrefernce(
                    item.lightingType ? item.lightingType : "neutral"
                  );
                  setFabric(item);
                }
              } else {
                setFabric(item);
                if (activeFabricTab === "Suits") {
                  setLightPrefernce(
                    item.lightingType ? item.lightingType : "neutral"
                  );
                }
              }
            }}
            style={{
              opacity: showSkeletion ? 0 : 1,
              transition: "opacity 0.3s",
            }}
          />
        </div>
      </div>
    );
  }
);

export default FabricsCard;
