import { useThree } from "@react-three/fiber"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import * as THREE from "three"
// import { Select } from "@react-three/drei"
import { createUseGesture, dragAction, pinchAction } from "@use-gesture/react"

import Config from "../../../config"
import useDndStore from "../../zustand/dndStore"
import DividerPage from "../common/didviderPage"
import useDimensionStore from "../../zustand/dimensionStore"
import useCornerStore from "../../zustand/cornerStore"
import useFurnishingStore from "../../zustand/furnishingStore"

let intersects = new Array(1)

let topAssetType = "none"

const DividerComponent = React.memo(function DividerComponent({
  xIndex,
  inDivider,
  d_xIndex,
  d_yPos,
  initialScale,
  position,
  spaceRef,
  topShelfVisible,
  dividerLeftWidth,
}) {
  const { size, camera, raycaster } = useThree()

  const addAsset = useFurnishingStore.use.addAsset()
  const removeAsset = useFurnishingStore.use.removeAsset()
  const updateDividerAsset = useFurnishingStore.use.updateDividerAsset()
  const setSelectionInfo = useFurnishingStore.use.setSelectionInfo()

  const setType = useDndStore.use.setType()
  const setShowDimensions = useCornerStore.use.setShowDimensions()

  const [scale, setScale] = useState(initialScale)

  // update scale based on initial scale change
  useEffect(() => {
    setScale(initialScale)
  }, [initialScale])

  const pointer = useMemo(() => new THREE.Vector2(), [])

  const ref = useRef()

  const viewOption = useCornerStore.use.viewOption()

  const height = useDimensionStore.use.height()
  const depth = useDimensionStore.use.depth()
  const width = useDimensionStore.use.width()

  const setAssetDragging = useDndStore.use.setAssetDragging()

  const [dragStarted, setDragStarted] = useState(true)

  // show or hide measurement
  // show measure while dragging assets
  // const [showMeasure, setShowMeasure] = useState(false)
  // const [measureInfo, setMeasureInfo] = useState({
  //   posX: 0,
  //   aboveTop: 0,
  //   aboveBottom: 0,
  //   belowTop: 0,
  //   belowBottom: 0,
  // })

  useEffect(() => {
    if (!dragStarted) {
      setShowDimensions(false)

      updateDividerAsset({
        xIndex,
        yPos: position[1],
        topShelfVisible: false,
        leftWidth: dividerLeftWidth,
      })

      setAssetDragging(true)
      setSelectionInfo({
        xIndex,
        yPos: position[1],
        inDivider,
        d_xIndex,
        d_yPos,
      })
    }
  }, [dragStarted])

  useEffect(() => {
    setTimeout(() => {
      // if (selected) {
      //   if (type === Config.furnishing.type.drawer) {
      //     g_availableTop = 0
      //     g_availableBottom = 0
      //     spaceRef?.children.map((mesh) => {
      //       if (
      //         mesh.userData.xIndex === xIndex &&
      //         mesh.userData.yIndex === yIndex
      //       ) {
      //         g_availableTop =
      //           mesh.userData.topAsset === "none"
      //             ? mesh.userData.availableTop +
      //               Config.furnishing.shelf.thickness1
      //             : mesh.userData.availableTop
      //         g_availableBottom =
      //           mesh.userData.topAsset === "none"
      //             ? mesh.userData.bottom -
      //               Config.furnishing.shelf.thickness1
      //             : mesh.userData.bottom
      //       }
      //     })
      //   } else if (type === Config.furnishing.type.divider) {
      //     spaceRef?.children.map((mesh) => {
      //       if (
      //         mesh.userData.xIndex === xIndex &&
      //         mesh.userData.yIndex === yIndex
      //       ) {
      //         g_availableTop = mesh.userData.availableTop
      //         g_availableBottom = mesh.userData.bottom
      //         topAssetType = mesh.userData.topAsset
      //       }
      //     })
      //     dispatch(setShowDividerInfo(true))
      //     const assetInfo = {
      //       xIndex: xIndex,
      //       yIndex: yIndex,
      //       scale: scale,
      //       position: position,
      //       topAsset: topAssetType,
      //       leftWidth: dividerLeftWidth,
      //       bottom: g_availableBottom,
      //       maxHeight: g_availableTop - g_availableBottom,
      //     }
      //     dispatch(setAssetInfo(assetInfo))
      //   }
      // }
    }, 0)
  }, [xIndex, scale, spaceRef])

  const handleDragStart = useCallback(() => {
    setType(Config.furnishing.type.divider)
    setDragStarted(true)
  }, [xIndex, position])

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
          const { topAsset } = intersects[0].object.userData

          topAssetType = topAsset

          ref.current?.position.set(
            intersects[0].object.position.x,
            intersects[0].object.position.y,
            position[2]
          )

          if (
            scale[0] !== intersects[0].object.geometry.parameters.width ||
            scale[1] !== intersects[0].object.geometry.parameters.height ||
            scale[2] !== initialScale[2]
          ) {
            setScale([
              intersects[0].object.geometry.parameters.width,
              intersects[0].object.geometry.parameters.height,
              initialScale[2],
            ])
          }
        } else {
          ref.current?.position.set(
            intersects[0].point.x * 100 + width / 2,
            intersects[0].point.y * 100 + height / 2,
            depth + depth / 2
          )
        }
      }
    },
    [ref, spaceRef, scale]
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

      if (intersects[0].object.name === "available") {
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
          type: Config.furnishing.type.divider,
          topShelfVisible:
            topAssetType === Config.furnishing.type.slopingFloor ||
            topAssetType === Config.furnishing.type.clothesLift ||
            topAssetType === Config.furnishing.type.clothesRail ||
            topAssetType === Config.furnishing.type.pantsPullout
              ? true
              : false,
          dividerLeftWidth:
            (scale[0] - Config.furnishing.divider.thickness) / 2,
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
        <DividerPage
          scale={scale}
          leftWidth={dividerLeftWidth}
          visible={true}
          topShelfVisible={topShelfVisible}
        />
        {/* </Select> */}
      </group>
      {/* <MeasureComponent
        measureInfo={measureInfo}
        showMeasure={showMeasure}
        depth={depth}
      /> */}
    </group>
  )
})

export default DividerComponent
