/* eslint-disable react/no-unknown-property */
import { Plane } from "@react-three/drei"
import React, { useEffect, useMemo, useRef } from "react"
import useDndStore from "../zustand/dndStore"
import useFurnishingStore from "../zustand/furnishingStore"
import {
  getLedSpace,
  getDoorSpace,
  getAvailableSpace,
} from "../utils/availableSpace"
import useDimensionStore from "../zustand/dimensionStore"
import Config from "../../config"

const AvailableSpaceGroup = React.memo(function AvailableSpaceGroup(props) {
  const { setSpaceRef } = props

  const type = useDndStore.use.type()
  const drawerHeight = useDndStore.use.drawerHeight()
  const drawerTopDistance = useDndStore.use.drawerTopDistance()
  const productDragging = useDndStore.use.productDragging()
  const assetDragging = useDndStore.use.assetDragging()

  const height = useDimensionStore.use.height()
  const depth = useDimensionStore.use.depth()
  const elementsWidths = useDimensionStore.use.elementsWidths()
  const baseType = useDimensionStore.use.baseType()

  const furnishingAssets = useFurnishingStore.use.furnishingAssets()
  const ledAssets = useFurnishingStore.use.ledAssets()
  const doorAssets = useFurnishingStore.use.doorAssets()
  const setTotalSpace = useFurnishingStore.use.setTotalSpace()
  const selectionInfo = useFurnishingStore.use.selectionInfo()
  const korpusMaterial = useDimensionStore.use.korpusMaterial()
  const korpusType = useDimensionStore.use.korpusType()
  const withOutFeet = useDimensionStore.use.withOutFeet();
  const hanging = useDimensionStore.use.hanging();
  const withFeet = useDimensionStore.use.withFeet();
  // already located assets, total available space
  // calculate total space for dragging
  // console.log(furnishingAssets)
  const totalSpace = useMemo(() => {
    if (type === Config.furnishing.type.ledLighting) {
      
      return getLedSpace(elementsWidths, baseType, height, depth, ledAssets)
    } else if (type === Config.furnishing.type.door || type === Config.furnishing.type.flap) {
      let withFeetFlag = (hanging && !withOutFeet) || (!hanging && withOutFeet)
      return getDoorSpace(
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
        withFeetFlag
      )
    } 
    else {
      return getAvailableSpace(
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
        withOutFeet
      )
    }
  }, [type, furnishingAssets, productDragging, assetDragging, selectionInfo, korpusMaterial, hanging, withOutFeet, withFeet])

  useEffect(() => {
    // console.log("here", totalSpace)
    setTotalSpace(totalSpace)
  }, [totalSpace])

  const availableRef = useRef()

  useEffect(() => {
    if (availableRef !== undefined && availableRef.current !== undefined) {
      setSpaceRef(availableRef.current)
    }
  }, [availableRef])

  return (
    <>
      <group ref={availableRef}>
        {(productDragging || assetDragging) &&
          totalSpace.map((space, index) => (
            <Plane
              key={index}
              castShadow
              name="available"
              userData={{
                xIndex: space.xIndex,
                top: space.top,
                bottom: space.bottom,
                topAsset: space.topAsset,
                bottomAsset: space.bottomAsset,
                availableTop: space.availableTop,
                availableBottom: space.availableBottom,
                inDivider: space.inDivider,
                d_xIndex: space.d_xIndex,
                d_yPos: space.d_yPos,
              }}
              args={[space.width, space.height]}
              rotateZ={Math.PI / 2}
              position={[space.posX, space.posY, space.posZ]}
            >
              <meshStandardMaterial color="green" opacity={0.5} transparent />
            </Plane>
          ))}
        {(productDragging || assetDragging) && (
          <Plane
            visible={false}
            castShadow
            args={[1000, 500]}
            rotateZ={Math.PI / 2}
            position={[300, 100, depth]}
          >
            <shadowMaterial transparent opacity={0} />
          </Plane>
        )}
      </group>
    </>
  )
})

export default AvailableSpaceGroup
