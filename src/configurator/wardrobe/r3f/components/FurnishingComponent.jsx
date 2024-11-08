// import { RoundedBox } from "@react-three/drei"
import React, { useState, useEffect, useMemo, useRef, useCallback } from "react"
// import { Select } from "@react-three/postprocessing"
import { useThree } from "@react-three/fiber"
import { createUseGesture, dragAction, pinchAction } from "@use-gesture/react"
import * as THREE from "three"

import Config from "../../../config"
import { getDraggingInfo } from "../../utils/draggingInfo"
import ClothesRail from "../common/clothesRail"
import PantsPullout from "../common/pantsPullout"
import ClothesLift from "../common/clothesLift"
import SlopingFloor from "../common/slopingFloor"
import { getBottom, getTop } from "../../utils/availableSpace"
import MeasureComponent from "./MeasureComponent"

import useDndStore from "../../zustand/dndStore"
import useDimensionStore from "../../zustand/dimensionStore"
import useCornerStore from "../../zustand/cornerStore"
import useFurnishingStore from "../../zustand/furnishingStore"

let intersects = new Array(1)

const FurnishingComponent = React.memo(function FurnishingComponent({
  xIndex,
  inDivider,
  d_xIndex,
  d_yPos,
  type,
  initialScale,
  position,
  spaceRef,
}) {
  const { size, camera, raycaster } = useThree()

  const setType = useDndStore.use.setType()

  const [scale, setScale] = useState(initialScale)

  // update scale based on initial scale change
  useEffect(() => {
    setScale(initialScale)
  }, [initialScale])

  const pointer = useMemo(() => new THREE.Vector2(), [])

  const ref = useRef()

  const viewOption = useCornerStore.use.viewOption()
  const setShowDimensions = useCornerStore.use.setShowDimensions()

  const height = useDimensionStore.use.height()
  const depth = useDimensionStore.use.depth()
  const width = useDimensionStore.use.width()

  const addAsset = useFurnishingStore.use.addAsset()
  const removeAsset = useFurnishingStore.use.removeAsset()
  const setSelectionInfo = useFurnishingStore.use.setSelectionInfo()

  const setAssetDragging = useDndStore.use.setAssetDragging()

  // raster for dragging object
  const raster = useMemo(
    () =>
      type == Config.furnishing.type.shelf ||
      type == Config.furnishing.type.glassBottom
        ? Config.furnishing.shelf.raster
        : Config.furnishing.default.raster,
    [type]
  )

  const [dragStarted, setDragStarted] = useState(true)

  // show or hide measurement
  // show measure while dragging assets
  const [showMeasure, setShowMeasure] = useState(false)
  const [measureInfo, setMeasureInfo] = useState({
    posX: 0,
    aboveTop: 0,
    aboveBottom: 0,
    belowTop: 0,
    belowBottom: 0,
  })

  useEffect(() => {
    if (!dragStarted) {
      setShowDimensions(false)
      setSelectionInfo({
        xIndex,
        yPos: position[1],
        inDivider,
        d_xIndex,
        d_yPos,
      })
      setAssetDragging(true)
    }
  }, [dragStarted])

  const handleDragStart = useCallback(() => {
    setType(type)
    setDragStarted(true)
  }, [type])

  const handleDrag = useCallback(
    (state) => {
      if (state.elapsedTime < 100) return

      if (state.delta[0] === 0 && state.delta[1] === 0) return

      setDragStarted(false)

      pointer.x = ((state.values[0] - size.left) / size.width) * 2 - 1
      pointer.y = -((state.values[1] - size.top) / size.height) * 2 + 1

      raycaster.setFromCamera(pointer, camera)

      intersects = raycaster.intersectObjects(spaceRef.children, true)

      if (intersects[0] !== undefined) {
        if (intersects[0].object.name === "available") {
          const {
            top,
            bottom,
            topAsset,
            bottomAsset,
            availableTop,
            availableBottom,
          } = intersects[0].object.userData

          const result = getDraggingInfo({
            type,
            top,
            bottom,
            topAsset,
            bottomAsset,
            initialPosY: intersects[0].point.y * 100 + height / 2,
            raster,
            availableWidth: intersects[0].object.geometry.parameters.width,
            objectHeight: scale[1],
          })

          ref.current?.position.set(
            intersects[0].object.position.x,
            result.posY,
            position[2]
          )

          if (
            scale[0] !== result.objectWidth ||
            scale[1] !== initialScale[1] ||
            scale[2] !== initialScale[2]
          ) {
            setScale([result.objectWidth, initialScale[1], initialScale[2]])
          }

          setShowMeasure(true)

          const tempMeasureInfo = {
            posX: intersects[0].object.position.x,
            aboveTop: availableTop,
            aboveBottom: getBottom(result.posY, scale[1], type, 0),
            belowTop: getTop(result.posY, scale[1], type),
            belowBottom: availableBottom,
          }

          if (JSON.stringify(measureInfo) !== JSON.stringify(tempMeasureInfo)) {
            setMeasureInfo(tempMeasureInfo)
          }
        } else {
          ref.current?.position.set(
            intersects[0].point.x * 100 + width / 2,
            intersects[0].point.y * 100 + height / 2,
            depth + depth / 2
          )

          setShowMeasure(false)
        }
      }
    },
    [ref, spaceRef, measureInfo]
    // [ref, scale, initialScale, spaceRef, dragStarted, showMeasure]
  )

  const handleDragEnd = useCallback(
    (state) => {
      if (
        state.values[0] === state.initial[0] &&
        state.values[1] === state.initial[1]
      ) {
        // dispatch(updateSelected({ xIndex, yIndex, selected: true }))
        return
      }

      setShowMeasure(false)

      if (intersects && intersects.length > 0 && intersects[0].object.name === "available") {

        const payload = {}

        payload.removal = {
          xIndex,
          yPos: position[1],
          inDivider,
          d_xIndex,
          d_yPos,
        }

        payload.asset = {
          xIndex: intersects[0].object.userData.xIndex,
          inDivider: intersects[0].object.userData.inDivider,
          d_xIndex: intersects[0].object.userData.d_xIndex,
          d_yPos: intersects[0].object.userData.d_yPos,
          position: [
            ref.current.position.x,
            ref.current.position.y,
            ref.current.position.z,
          ],
          scale: scale,
          type,
        }

        addAsset(payload)
      } else {
        removeAsset({ xIndex, yPos: position[1] })
      }

      setAssetDragging(false)
    },
    [ref, scale, xIndex, position]
  )

  const useGesture = createUseGesture([dragAction, pinchAction])

  const bind = useGesture(
    {
      onDragStart: handleDragStart,
      onDrag: handleDrag,
      onDragEnd: handleDragEnd,
    },
    { enabled: viewOption === Config.view.front }
  )

  const handlePointerOver = useCallback(() => {
    document.body.style.cursor = "pointer"
  }, [])

  const handlePointerOut = useCallback(() => {
    document.body.style.cursor = "auto"
  }, [])

  return (
    <group>
      <group
        {...bind()}
        ref={ref}
        // eslint-disable-next-line react/no-unknown-property
        position={position}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {/* <Select enabled={selected}> */}
        {type === Config.furnishing.type.clothesRail && (
          <ClothesRail width={scale[0]} visible={true} />
        )}

        {type === Config.furnishing.type.clothesLift && (
          <ClothesLift width={scale[0]} visible={true} />
        )}

        {type === Config.furnishing.type.pantsPullout && (
          <PantsPullout scale={scale} visible={true} />
        )}

        {type === Config.furnishing.type.slopingFloor && (
          <SlopingFloor width={scale[0]} depth={scale[2]} visible={true} />
        )}
        {/* </Select> */}
      </group>
      <MeasureComponent
        measureInfo={measureInfo}
        showMeasure={showMeasure}
        depth={depth}
      />
    </group>
  )
})

export default FurnishingComponent
