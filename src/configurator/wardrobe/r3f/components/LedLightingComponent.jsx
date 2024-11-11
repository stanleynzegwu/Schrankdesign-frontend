import { useThree } from "@react-three/fiber"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import * as THREE from "three"
import { createUseGesture, dragAction, pinchAction } from "@use-gesture/react"

import LedLighting from "../common/ledLighting"
import Config from "../../../config"
import useDimensionStore from "../../zustand/dimensionStore"
import useCornerStore from "../../zustand/cornerStore"
import useFurnishingStore from "../../zustand/furnishingStore"
import useDndStore from "../../zustand/dndStore"

let intersects = new Array(1)

const LedLightingComponent = React.memo(function LedLightingComponent({asset, spaceRef}) {
  const { size, camera, raycaster } = useThree()

  const { xIndex, position, scale } = asset;
  const pointer = useMemo(() => new THREE.Vector2(), [])
  const ref = useRef()

  const viewOption = useCornerStore.use.viewOption()
  const height = useDimensionStore.use.height()
  const depth = useDimensionStore.use.depth()
  const width = useDimensionStore.use.width()

  const moveLed = useFurnishingStore.use.moveLed()
  const removeLed = useFurnishingStore.use.removeLed()

  const setAssetDragging = useDndStore.use.setAssetDragging()

  const handleDragStart = useCallback(() => {
    setAssetDragging(true)
  })

  const handleDrag = useCallback(
    (state) => {
      if (state.elapsedTime < 100) return

      if (state.delta[0] === 0 && state.delta[1] === 0) return

      pointer.x = ((state.values[0] - size.left) / size.width) * 2 - 1
      pointer.y = -((state.values[1] - size.top) / size.height) * 2 + 1

      raycaster.setFromCamera(pointer, camera)

      intersects = raycaster.intersectObjects(spaceRef.children, true)

      if (intersects[0] !== undefined) {
        if (intersects[0].object.name === "available") {
          ref.current?.position.set(
            intersects[0].object.position.x,
            intersects[0].object.position.y,
            position[2]
          )

          // if (
          //   scale[0] !== intersects[0].object.geometry.parameters.width ||
          //   scale[1] !== intersects[0].object.geometry.parameters.height ||
          //   scale[2] !== initialScale[2]
          // ) {
          //   setScale([
          //     intersects[0].object.geometry.parameters.width,
          //     intersects[0].object.geometry.parameters.height,
          //     initialScale[2],
          //   ])
          // }
        } else {
          ref.current?.position.set(
            intersects[0].point.x * 100 + width / 2,
            intersects[0].point.y * 100 + height / 2,
            depth + depth / 2
          )
        }
      }
    },
    [ref, scale, scale, spaceRef]
  )

  const handleDragEnd = useCallback(
    (state) => {
      if (
        state.values[0] === state.initial[0] &&
        state.values[1] === state.initial[1]
      ) {
        return
      }

      if (intersects[0].object.name === "available") {
        const payload = {
          former_xIndex: xIndex,
          xIndex: intersects[0].object.userData.xIndex,
          position: [
            ref.current?.position.x,
            ref.current?.position.y,
            ref.current?.position.z,
          ],
          scale,
        }
        moveLed(payload)
      } else {
        removeLed({ xIndex })
      }

      setAssetDragging(false)
    },
    [ref, scale]
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
    <group
      {...bind()}
      ref={ref}
      // eslint-disable-next-line react/no-unknown-property
      position={position}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <LedLighting scale={scale} visible={true} />
    </group>
  )
})

export default LedLightingComponent
