/* eslint-disable react/no-unknown-property */
import React, { useCallback, useMemo, useRef, useState } from "react"
import Config from "../../config"
import { Plane } from "@react-three/drei"
import { useLoader, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { createUseGesture, dragAction, pinchAction } from "@use-gesture/react"
import useDimensionStore from "../zustand/dimensionStore"
import useCornerStore from "../zustand/cornerStore"

const EWidthControl = React.memo(function EWidthControl() {
  const width = useDimensionStore.use.width()
  const height = useDimensionStore.use.height()
  const depth = useDimensionStore.use.depth()
  const elementsWidths = useDimensionStore.use.elementsWidths()
  const baseType = useDimensionStore.use.baseType()
  const setElementsWidths = useDimensionStore.use.setElementsWidths()

  const viewOption = useCornerStore.use.viewOption()

  const minLength = useDimensionStore.use.minLength()

  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [arrowIndex, setArrowIndex] = useState(-1)
  const [dragging, setDragging] = useState(false)

  const [flag, setFlag] = useState(true)

  const elementSpaceInfo = useMemo(() => {
    let accumulatedWidth = Config.plate.thickness / 2

    return Array.from({ length: elementsWidths.length }, (_, index) => {
      const widthAtIndex = elementsWidths[index]
      const pos = [
        accumulatedWidth + widthAtIndex / 2 + Config.plate.thickness / 2,
        height / 2 +
          (baseType === Config.baseType.panel
            ? Config.plate.plinthHeight
            : Config.glider.height) /
            2,
        depth + 0.1,
      ]
      const size = [
        widthAtIndex + Config.plate.thickness,
        height -
          (baseType === Config.baseType.panel
            ? Config.plate.plinthHeight
            : Config.glider.height) -
          Config.plate.thickness * 2,
      ]
      accumulatedWidth += widthAtIndex + Config.plate.thickness
      return { pos, size }
    })
  }, [elementsWidths, height, depth, baseType])

  const arrowMap = useLoader(
    THREE.TextureLoader,
    "/images/configurator/icons/horizontal_arrow.png"
  )

  const ref = useRef()

  const pointer = useRef(new THREE.Vector2())

  const { size, camera, raycaster } = useThree()

  const handleDragStart = useCallback((state) => {
    state.event.stopPropagation()
    setDragging(true)
    // setFlag(true)
  }, [])

  const handleDrag = useCallback(
    (state) => {
      state.event.stopPropagation()
      if (state.delta[0] === 0 && state.delta[1] === 0) return

      pointer.current.x = ((state.values[0] - size.left) / size.width) * 2 - 1
      pointer.current.y = -((state.values[1] - size.top) / size.height) * 2 + 1

      raycaster.setFromCamera(pointer.current, camera)
      if (flag) {
        const intersects = raycaster.intersectObjects([ref.current], true)

        if (intersects[0]) {
          const posX = intersects[0].point.x * 100 + width / 2
          const totalWidth =
            elementsWidths[arrowIndex] + elementsWidths[arrowIndex + 1]
          let leftWidth =
            posX -
            (elementSpaceInfo[arrowIndex].pos[0] -
              elementSpaceInfo[arrowIndex].size[0] / 2 +
              Config.plate.thickness / 2)
          let rightWidth = totalWidth - leftWidth
          // console.log(elementSpaceInfo)
          // Ensure minimum and maximum door lengths
          if (posX > totalWidth - minLength) {
            // setFlag(false)
          }
          // console.log(posX)
          if (leftWidth < minLength) {
            leftWidth = minLength
            rightWidth = totalWidth - leftWidth
          } else if (leftWidth > Config.plate.maxDoubleDoorLength) {
            leftWidth = Config.plate.maxDoubleDoorLength
            rightWidth = totalWidth - leftWidth
          } else if (rightWidth < minLength) {
            rightWidth = minLength
            leftWidth = totalWidth - rightWidth
          } else if (rightWidth > Config.plate.maxDoubleDoorLength) {
            rightWidth = Config.plate.maxDoubleDoorLength
            leftWidth = totalWidth - rightWidth
          }

          const newArray = elementsWidths.map((value, index) =>
            index === arrowIndex
              ? leftWidth
              : index === arrowIndex + 1
              ? rightWidth
              : value
          )
          if (elementsWidths[arrowIndex+1] > 0 && totalWidth - leftWidth > 0)
            setElementsWidths(newArray)
        }
      }
    },
    [
      size,
      camera,
      raycaster,
      elementsWidths,
      arrowIndex,
      elementSpaceInfo,
      width,
      flag
    ]
  )

  const handleDragEnd = useCallback((state) => {
    state.event.stopPropagation()
    setDragging(false)
    // setFlag(true)
  }, [])

  const useGestureOptions = useMemo(
    () => ({
      onDragStart: handleDragStart,
      onDrag: handleDrag,
      onDragEnd: handleDragEnd,
    }),
    [handleDragStart, handleDrag, handleDragEnd]
  )

  const useGesture = createUseGesture([dragAction, pinchAction])

  const bind = useGesture(useGestureOptions, {
    enabled: viewOption === Config.view.front,
  })

  return (
    <>
      <Plane
        ref={ref}
        castShadow
        args={[width, height]}
        rotateZ={Math.PI / 2}
        position={[width / 2, height / 2, depth]}
        visible={false}
      >
        <meshStandardMaterial opacity={0} transparent />
      </Plane>
      {elementSpaceInfo.map((info, index) => (
        <group key={index} castShadow>
          {!dragging && (
            <Plane
              visible={false}
              key={index}
              castShadow
              args={info.size}
              rotateZ={Math.PI / 2}
              position={info.pos}
              onPointerOver={(e) => {
                e.stopPropagation()
                if (dragging) return
                setSelectedIndex(index)
              }}
              onPointerOut={(e) => {
                e.stopPropagation()
                if (dragging) return
                setSelectedIndex(-1)
              }}
            >
              <meshStandardMaterial opacity={0} transparent />
            </Plane>
          )}
          {index !== 0 && (
            <mesh
              {...bind()}
              position={[
                info.pos[0] - info.size[0] / 2,
                (baseType === Config.baseType.panel
                  ? Config.plate.plinthHeight
                  : Config.glider.height) +
                  Config.plate.thickness +
                  8,
                depth + Config.plate.thickness + 0.5,
              ]}
              visible={
                dragging
                  ? arrowIndex + 1 === index
                  : selectedIndex === index || selectedIndex + 1 === index
              }
              onPointerOver={() => {
                document.body.style.cursor = "pointer";
                if (dragging) return
                setArrowIndex(index - 1)
              }}
              onPointerOut={() => {
                document.body.style.cursor = "auto";
              }}
            >
              <circleGeometry args={[5]} />
              <meshBasicMaterial map={arrowMap} />
            </mesh>
          )}
        </group>
      ))}
    </>
  )
})

export default EWidthControl
