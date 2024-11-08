import DraggingObject from "./draggingObject";
import FurnishingComponent from "./components/FurnishingComponent";
// import { Selection, EffectComposer, Outline } from "@react-three/postprocessing"
import React, { Suspense, useEffect, useRef, useState } from "react";

import {
  updateDoorAssets,
  updateFurnishing,
  updateFurnishingBaseType,
  updateLedAssets,
} from "../utils/updateFurnishing";

import Config from "../../config";
import LedLightingComponent from "./components/LedLightingComponent";
import DoorComponent from "./components/DoorComponent";
import DividerComponent from "./components/DividerComponent";
import DrawerComponent from "./components/DrawerComponent";

import useDimensionStore from "../zustand/dimensionStore";
import useFurnishingStore from "../zustand/furnishingStore";
import AvailableSpaceGroup from "./availableSpaceGroup";
import ShelfComponent from "./components/ShelfComponent";


const FurnishingGroup = React.memo(function FurnishingGroup() {
  const furnishing = useRef();

  const furnishingAssets = useFurnishingStore.use.furnishingAssets();
  const originalBaseType = useFurnishingStore.use.originalBaseType();
  const ledAssets = useFurnishingStore.use.ledAssets();
  const doorAssets = useFurnishingStore.use.doorAssets();

  const height = useDimensionStore.use.height();
  const depth = useDimensionStore.use.depth();
  const elementsWidths = useDimensionStore.use.elementsWidths();
  const baseType = useDimensionStore.use.baseType();

  const setOriginalBaseType = useFurnishingStore.use.setOriginalBaseType();
  const setFurnishingAssets = useFurnishingStore.use.setFurnishingAssets();
  const setLedAssets = useFurnishingStore.use.setLedAssets();
  const setDoorAssets = useFurnishingStore.use.setDoorAssets();
  // console.log(furnishingAssets)
 
  useEffect(() => {
    if (furnishingAssets.length !== 0) {
      const updatedFurnishingAssets = updateFurnishing(
        elementsWidths,
        depth,
        furnishingAssets
      );
      setFurnishingAssets(updatedFurnishingAssets);
    }
    if (ledAssets.length !== 0) {
      const updatedLedAssets = updateLedAssets(
        elementsWidths,
        height,
        depth,
        baseType,
        ledAssets
      );
      setLedAssets(updatedLedAssets);
    }

    if (baseType !== originalBaseType) {
      // don't need to change position of assets, keep position same -> consider it later
      const updatedBaseTypeAssets = updateFurnishingBaseType(
        baseType,
        furnishingAssets
      );
      setFurnishingAssets(updatedBaseTypeAssets);
      setOriginalBaseType(baseType);
    }

    if (doorAssets.length !== 0) {
      const updatedDoorAssets = updateDoorAssets(
        elementsWidths,
        height,
        depth,
        doorAssets
      );
      setDoorAssets(updatedDoorAssets);
    }

  }, [elementsWidths, depth, height, baseType]);

  // raycasting target group ref
  const [spaceRef, setSpaceRef] = useState(null);

  return (
    <group>
      {/* <Selection>
        <EffectComposer multisampling={8} autoClear={false}>
          <Outline
            visibleEdgeColor={0x0000ff}
            hiddenEdgeColor={0x000000}
            edgeStrength={100}
          />
        </EffectComposer> */}
      <group ref={furnishing}>
        {furnishingAssets.map((asset, index) => (
          <Suspense fallback={null} key={index}>
            {asset.type === Config.furnishing.type.divider ? (
              <DividerComponent
                xIndex={asset.xIndex}
                inDivider={asset.inDivider}
                d_xIndex={asset.d_xIndex}
                d_yPos={asset.d_yPos}
                position={asset.position}
                initialScale={asset.scale}
                spaceRef={spaceRef}
                topShelfVisible={asset.topShelfVisible}
                dividerLeftWidth={asset.dividerLeftWidth}
              />
            ) : asset.type === Config.furnishing.type.drawer ||
              asset.type === Config.furnishing.type.internalDrawer ? (
              <DrawerComponent
                xIndex={asset.xIndex}
                inDivider={asset.inDivider}
                d_xIndex={asset.d_xIndex}
                d_yPos={asset.d_yPos}
                type={asset.type}
                initialPosition={asset.position}
                initialScale={asset.scale}
                spaceRef={spaceRef}
                topVisible={asset.topVisible}
                bottomVisible={asset.bottomVisible}
                sideVisible={asset.sideVisible}
                topShelfDistance={asset.topShelfDistance}
                isShowControl={asset.isShowControl}
                topAsset={asset.topAsset}
                bottomAsset={asset.bottomAsset}
                drawerType={asset.drawerType}
                initialDrawerGroup={asset.drawerGroup}
                initialDrawerGroupScale={asset.drawerGroupScale}
              />
            ) : asset.type === Config.furnishing.type.shelf ||
              asset.type === Config.furnishing.type.glassBottom ||
              asset.type === Config.furnishing.type.foldBottom ? (
              <ShelfComponent
                xIndex={asset.xIndex}
                inDivider={asset.inDivider}
                d_xIndex={asset.d_xIndex}
                d_yPos={asset.d_yPos}
                type={asset.type}
                position={asset.position}
                initialScale={asset.scale}
                isShowControl={asset.isShowControl}
                spaceRef={spaceRef}
                allfurnishing={furnishing}
              />
            ) : (
              <FurnishingComponent
                xIndex={asset.xIndex}
                inDivider={asset.inDivider}
                d_xIndex={asset.d_xIndex}
                d_yPos={asset.d_yPos}
                type={asset.type}
                position={asset.position}
                initialScale={asset.scale}
                spaceRef={spaceRef}
              />
            )}
          </Suspense>
        ))}
      </group>

      {/* </Selection> */}

      {/* led lighting asets */}
      {ledAssets.map((asset, xIndex) => (
        <Suspense fallback={null} key={xIndex}>
          <LedLightingComponent
            xIndex={asset.xIndex}
            position={asset.position}
            initialScale={asset.scale}
            spaceRef={spaceRef}
          />
        </Suspense>
      ))}

      {/* door assets */}
      {doorAssets.map((asset, index) => (
        <Suspense fallback={null} key={index}>
          <DoorComponent
            initialXIndex={asset.xIndex}
            initialScale={asset.scale}
            position={asset.position}
            spaceRef={spaceRef}
            initialDoorType={asset.doorType}
            initialDoorCategory={asset.doorCatergory}
            initialTopAsset={asset.topAsset}
            initialBottomAsset={asset.bottomAsset}
            initialElementIndex={asset.elementIndex}
            initialType={asset.type}
            innerAssetsTopIndex={asset.innerAssetsTopIndex}
            innerAssetsBottomIndex={asset.innerAssetsBottomIndex}
            isPlint={asset.isPlint}
          />
        </Suspense>
      ))}

      {/* internal drawer side panes when we have sequential internal drawers */}
      {/* {internalDrawerSides.map((xAssets, xIndex) =>
        xAssets.map((asset, yIndex) => (
          <group key={xIndex * 10 + yIndex}>
            <RoundedBox
              castShadow
              args={[
                Config.furnishing.internalDrawer.panelWidth,
                asset.stopPosY -
                  asset.startPosY +
                  furnishingAssets[xIndex][
                    getArrayIndex(furnishingAssets[xIndex], asset.startYIndex)
                  ].scale[1] /
                    2 +
                  furnishingAssets[xIndex][
                    getArrayIndex(furnishingAssets[xIndex], asset.stopYIndex)
                  ].scale[1] /
                    2 +
                  Config.furnishing.internalDrawer.bottomShelfDistance,
                depth -
                  Config.plate.backThickness -
                  Config.plate.backIncident -
                  Config.furnishing.internalDrawer.frontInnerSpace,
              ]}
              position={[
                furnishingAssets[xIndex][
                  getArrayIndex(furnishingAssets[xIndex], asset.startYIndex)
                ].position[0] -
                  furnishingAssets[xIndex][
                    getArrayIndex(furnishingAssets[xIndex], asset.startYIndex)
                  ].scale[0] /
                    2 -
                  Config.furnishing.internalDrawer.panelSpace -
                  Config.furnishing.internalDrawer.panelWidth / 2,
                (asset.startPosY -
                  furnishingAssets[xIndex][
                    getArrayIndex(furnishingAssets[xIndex], asset.startYIndex)
                  ].scale[1] /
                    2 +
                  asset.stopPosY +
                  furnishingAssets[xIndex][
                    getArrayIndex(furnishingAssets[xIndex], asset.stopYIndex)
                  ].scale[1] /
                    2) /
                  2 +
                  -Config.furnishing.internalDrawer.bottomShelfDistance / 2,
                (depth -
                  Config.furnishing.internalDrawer.frontInnerSpace +
                  Config.plate.backIncident +
                  Config.plate.backThickness) /
                  2,
              ]}
              material={Config.furnishing.drawer.material}
            />
            <RoundedBox
              castShadow
              args={[
                Config.furnishing.internalDrawer.panelWidth,
                asset.stopPosY -
                  asset.startPosY +
                  furnishingAssets[xIndex][
                    getArrayIndex(furnishingAssets[xIndex], asset.startYIndex)
                  ].scale[1] /
                    2 +
                  furnishingAssets[xIndex][
                    getArrayIndex(furnishingAssets[xIndex], asset.stopYIndex)
                  ].scale[1] /
                    2 +
                  Config.furnishing.internalDrawer.bottomShelfDistance,
                depth -
                  Config.plate.backThickness -
                  Config.plate.backIncident -
                  Config.furnishing.internalDrawer.frontInnerSpace,
              ]}
              position={[
                furnishingAssets[xIndex][
                  getArrayIndex(furnishingAssets[xIndex], asset.startYIndex)
                ].position[0] +
                  furnishingAssets[xIndex][
                    getArrayIndex(furnishingAssets[xIndex], asset.startYIndex)
                  ].scale[0] /
                    2 +
                  Config.furnishing.internalDrawer.panelSpace +
                  Config.furnishing.internalDrawer.panelWidth / 2,
                (asset.startPosY -
                  furnishingAssets[xIndex][
                    getArrayIndex(furnishingAssets[xIndex], asset.startYIndex)
                  ].scale[1] /
                    2 +
                  asset.stopPosY +
                  furnishingAssets[xIndex][
                    getArrayIndex(furnishingAssets[xIndex], asset.stopYIndex)
                  ].scale[1] /
                    2) /
                  2 +
                  -Config.furnishing.internalDrawer.bottomShelfDistance / 2,
                (depth -
                  Config.furnishing.internalDrawer.frontInnerSpace +
                  Config.plate.backIncident +
                  Config.plate.backThickness) /
                  2,
              ]}
              material={Config.furnishing.drawer.material}
            />
          </group>
        ))
      )} */}

      <AvailableSpaceGroup setSpaceRef={setSpaceRef} />
      <DraggingObject spaceRef={spaceRef} />
    </group>
  );
});

export default FurnishingGroup;
