import Config from "../../config";
import DraggingObject from "./draggingObject";
import DoorComponent from "./components/DoorComponent";
import AvailableSpaceGroup from "./availableSpaceGroup";
import ShelfComponent from "./components/ShelfComponent";
import useDimensionStore from "../zustand/dimensionStore";
import DrawerComponent from "./components/DrawerComponent";
import useFurnishingStore from "../zustand/furnishingStore";
import DividerComponent from "./components/DividerComponent";
import FurnishingComponent from "./components/FurnishingComponent";
import React, { Suspense, useEffect, useRef, useState } from "react";
import LedLightingComponent from "./components/LedLightingComponent";

import {
  updateLedAssets,
  updateDoorAssets,
  updateFurnishing,
  updateFurnishingBaseType,
} from "../utils/updateFurnishing";

const FurnishingGroup = React.memo(function FurnishingGroup() {
  const furnishing = useRef();

  const { depth, height, baseType, elementsWidths } = useDimensionStore((state) => ({
    depth: state.depth,
    height: state.height,
    baseType: state.baseType,
    elementsWidths: state.elementsWidths,
  }));

  const {
    ledAssets,
    doorAssets,
    setLedAssets,
    setDoorAssets,
    furnishingAssets,
    originalBaseType,
    setOriginalBaseType,
    setFurnishingAssets,
  } = useFurnishingStore((state) => ({
    ledAssets: state.ledAssets,
    doorAssets: state.doorAssets,
    setLedAssets: state.setLedAssets,
    setDoorAssets: state.setDoorAssets,
    furnishingAssets: state.furnishingAssets,
    originalBaseType: state.originalBaseType,
    setOriginalBaseType: state.setOriginalBaseType,
    setFurnishingAssets: state.setFurnishingAssets,
  }));

  useEffect(() => {
    if (furnishingAssets.length) {
      const updatedFurnishingAssets = updateFurnishing(elementsWidths, depth, furnishingAssets);
      setFurnishingAssets(updatedFurnishingAssets);
    }

    if (ledAssets.length) {
      const updatedLedAssets = updateLedAssets(elementsWidths, height, depth, baseType, ledAssets);
      setLedAssets(updatedLedAssets);
    }

    if (baseType !== originalBaseType) {
      const updatedBaseTypeAssets = updateFurnishingBaseType(baseType, furnishingAssets);
      setFurnishingAssets(updatedBaseTypeAssets);
      setOriginalBaseType(baseType);
    }

    if (doorAssets.length) {
      const updatedDoorAssets = updateDoorAssets(elementsWidths, height, depth, doorAssets);
      setDoorAssets(updatedDoorAssets);
    }
  }, [elementsWidths, depth, height, baseType]);

  const [spaceRef, setSpaceRef] = useState(null);

  return (
    <group>
      <group ref={furnishing}>
        {furnishingAssets.map((asset, i) => {
          const { type } = asset;
          const { divider, drawer, internalDrawer, shelf, glassBottom, foldBottom } =
            Config.furnishing.type;
          return (
            <Suspense key={i}>
              {type === shelf || type === glassBottom || type === foldBottom ? (
                <ShelfComponent
                  index={i}
                  asset={asset}
                  spaceRef={spaceRef}
                  allfurnishing={furnishing}
                  svId={`${type}${i}`}
                />
              ) : type === drawer || asset.type === internalDrawer ? (
                <DrawerComponent
                  index={i}
                  asset={asset}
                  spaceRef={spaceRef}
                  allfurnishing={furnishing}
                  svId={`${type}${i}`}
                />
              ) : asset.type === divider ? (
                <DividerComponent
                  index={i}
                  asset={asset}
                  spaceRef={spaceRef}
                  svId={`${type}${i}`}
                />
              ) : (
                <FurnishingComponent
                  index={i}
                  asset={asset}
                  spaceRef={spaceRef}
                  svId={`${type}${i}`}
                />
              )}
            </Suspense>
          );
        })}
      </group>

      {ledAssets.map((asset, i) => (
        <Suspense key={i}>
          <LedLightingComponent
            index={i}
            asset={asset}
            spaceRef={spaceRef}
            svId={`${asset.type}${i}`}
          />
        </Suspense>
      ))}

      {doorAssets.map((asset, i) => (
        <Suspense key={i}>
          <DoorComponent index={i} asset={asset} spaceRef={spaceRef} svId={`${asset.type}${i}`} />
        </Suspense>
      ))}
      <AvailableSpaceGroup setSpaceRef={setSpaceRef} />
      <DraggingObject spaceRef={spaceRef} />
    </group>
  );
});

export default FurnishingGroup;
