import { Plane } from "@react-three/drei";
import Config from "../../config";
import useDndStore from "../zustand/dndStore";
import React, { useEffect, useMemo, useRef } from "react";
import useDimensionStore from "../zustand/dimensionStore";
import useFurnishingStore from "../zustand/furnishingStore";

import {
  getLedSpace,
  getDoorSpace,
  getAvailableSpace,
  unavailableSpace,
} from "../utils/availableSpace";

const AvailableSpaceGroup = React.memo(function AvailableSpaceGroup({ setSpaceRef }) {
  const type = useDndStore.use.type();
  const currentIndex = useDndStore.use.currentIndex();
  const drawerHeight = useDndStore.use.drawerHeight();
  const drawerTopDistance = useDndStore.use.drawerTopDistance();
  const productDragging = useDndStore.use.productDragging();
  const assetDragging = useDndStore.use.assetDragging();

  const furnishingAssets = useFurnishingStore.use.furnishingAssets();
  const ledAssets = useFurnishingStore.use.ledAssets();
  const doorAssets = useFurnishingStore.use.doorAssets();
  const setTotalSpace = useFurnishingStore.use.setTotalSpace();
  const selectionInfo = useFurnishingStore.use.selectionInfo();

  const korpusMaterial = useDimensionStore.use.korpusMaterial();
  const korpusType = useDimensionStore.use.korpusType();
  const withOutFeet = useDimensionStore.use.withOutFeet();
  const hanging = useDimensionStore.use.hanging();
  const withFeet = useDimensionStore.use.withFeet();
  const height = useDimensionStore.use.height();
  const depth = useDimensionStore.use.depth();
  const baseType = useDimensionStore.use.baseType();
  const elementsWidths = useDimensionStore.use.elementsWidths();
  const setInnerHeight = useDimensionStore.use.setInnerHeight();

  const availableRef = useRef();

  const totalUnavailableSpace = useMemo(() => {
    if (type === Config.furnishing.type.door || type === Config.furnishing.type.flap) return [];
    return unavailableSpace({
      elementsWidths,
      baseType,
      height,
      depth,
      type,
      drawerHeight,
      drawerTopDistance,
      furnishingAssets,
      doorAssets,
      assetDragging,
      selectionInfo,
      korpusMaterial,
      hanging,
      withFeet,
      withOutFeet,
      currentIndex,
    });
  });

  const totalSpace = useMemo(() => {
    if (type === Config.furnishing.type.ledLighting)
      return getLedSpace(elementsWidths, baseType, height, depth, ledAssets);

    if (type === Config.furnishing.type.door || type === Config.furnishing.type.flap) {
      let withFeetFlag = (hanging && !withOutFeet) || (!hanging && withOutFeet);
      return getDoorSpace({
        elementsWidths,
        baseType,
        height,
        depth,
        furnishingAssets,
        doorAssets,
        assetDragging,
        selectionInfo,
        korpusMaterial,
        korpusType,
        type,
        withFeetFlag,
      });
    } else {
      return getAvailableSpace({
        elementsWidths,
        baseType,
        height,
        depth,
        type,
        drawerHeight,
        drawerTopDistance,
        furnishingAssets,
        doorAssets,
        assetDragging,
        selectionInfo,
        korpusMaterial,
        hanging,
        withFeet,
        withOutFeet,
        currentIndex,
      });
    }
  }, [
    type,
    furnishingAssets,
    productDragging,
    assetDragging,
    selectionInfo,
    korpusMaterial,
    hanging,
    withOutFeet,
    withFeet,
  ]);

  useEffect(() => {
    setTotalSpace(totalSpace);
  }, [totalSpace, totalUnavailableSpace]);

  useEffect(() => {
    if (availableRef !== undefined && availableRef.current !== undefined)
      setSpaceRef(availableRef.current);
  }, [availableRef]);

  return (
    <>
      <group ref={availableRef}>
        {(productDragging || assetDragging) &&
          totalSpace.map((space, index) => {
            const {
              type,
              xIndex,
              top,
              bottom,
              topAsset,
              bottomAsset,
              availableTop,
              availableBottom,
              inDivider,
              d_xIndex,
              d_yPos,
            } = space;
            return (
              <Plane
                key={index}
                castShadow
                name="available"
                userData={{
                  xIndex,
                  top,
                  bottom,
                  topAsset,
                  bottomAsset,
                  availableTop,
                  availableBottom,
                  inDivider,
                  d_xIndex,
                  d_yPos,
                  type,
                }}
                args={[space.width, space.height]}
                rotateZ={Math.PI / 2}
                position={[space.posX, space.posY, space.posZ]}
              >
                <meshStandardMaterial color="green" opacity={0.5} transparent />
              </Plane>
            );
          })}
        {(productDragging || (assetDragging && totalUnavailableSpace.length)) &&
          totalUnavailableSpace.map((space, index) => {
            const { type, xIndex, top, bottom, inDivider, id } = space;
            return (
              <Plane
                key={index}
                castShadow
                name="occupied"
                userData={{
                  xIndex,
                  top,
                  bottom,
                  inDivider,
                  type,
                  id,
                }}
                args={[space.width, space.height]}
                rotateZ={Math.PI / 2}
                position={[space.posX, space.posY, space.posZ]}
              >
                <meshStandardMaterial color="red" opacity={0} transparent />
              </Plane>
            );
          })}
        {(productDragging || assetDragging) && (
          <Plane
            visible={false}
            castShadow
            name="other"
            args={[1000, 500]}
            rotateZ={Math.PI / 2}
            position={[300, 100, depth]}
          >
            <shadowMaterial transparent opacity={0} />
          </Plane>
        )}
      </group>
    </>
  );
});

export default AvailableSpaceGroup;
