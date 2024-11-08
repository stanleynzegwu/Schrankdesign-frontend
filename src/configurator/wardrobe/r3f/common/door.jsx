/* eslint-disable react/no-unknown-property */
import React, { useMemo, useRef, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"

import Config from "../../../config"
import useCornerStore from "../../zustand/cornerStore"
import { getDoorHeight, getDoorPositionX, getDoorPositionY, getDoorWidth } from "../../utils/getInfo"
import Plate from "./Plate"
import useDimensionStore from "../../zustand/dimensionStore";
import useFurnishingStore from "../../zustand/furnishingStore"
const Door = React.memo(function Door(props) {
  let {
    scale,
    visible,
    door_type,
    elementIndex,
    topAsset,
    bottomAsset,
    withAnimation,
    xIndex,
    yPos
  } = props
  const minHeight = useDimensionStore.use.minHeight()
  const pushOpen = useDimensionStore.use.pushOpen()
  const removeDoor = useFurnishingStore.use.removeDoor()
  const removeGriff = useFurnishingStore.use.removeGriff()
  // console.log(scale)
  if ( scale[1] < minHeight && !pushOpen) {
    visible = false
    removeDoor({ xIndex: xIndex, posY: yPos })
    removeGriff({ xIndex: xIndex, posY: yPos})
  }
  const posX = useMemo(() => {
    let temp = 0
    if (elementIndex === Config.elementIndex.first) {
      temp -=
        (Config.plate.thickness - Config.furnishing.default.frontInterval) / 2
    } else {
      temp -= Config.furnishing.default.shelfOverlapping / 2
    }

    if (elementIndex === Config.elementIndex.last) {
      temp +=
        (Config.plate.thickness - Config.furnishing.default.frontInterval) / 2
    } else {
      temp += Config.furnishing.default.shelfOverlapping / 2
    }

    return temp
  }, [elementIndex])

  const posY = useMemo(() => {
    let temp = 0
    if (topAsset === "none") {
      temp +=
        (Config.plate.thickness - Config.furnishing.default.frontInterval) / 2
    } else {
      temp += Config.furnishing.default.shelfOverlapping / 2
    }

    // stretch to the bottom
    if (bottomAsset === "none") {
      temp -=
        (Config.plate.thickness - Config.furnishing.default.frontInterval) / 2
    } else {
      temp -= Config.furnishing.default.shelfOverlapping / 2
    }

    return temp
  }, [topAsset, bottomAsset])

  const korpusType = useDimensionStore.use.korpusType()
  const width = useMemo(() => {
    return getDoorWidth(scale[0], elementIndex, korpusType)
  }, [scale[0], elementIndex, korpusType, door_type])

  const height = useMemo(() => {
    return getDoorHeight(scale[1], topAsset, bottomAsset, korpusType)
  }, [scale[1], topAsset, bottomAsset, korpusType, door_type])

  const positionX = useMemo(() => {
    return getDoorPositionX(door_type, posX, posY, width, korpusType, elementIndex)
  }, [ door_type, posX, posX, width, elementIndex]);

  const positionY = useMemo(() => {
    return getDoorPositionY(door_type, posX, posY, korpusType, topAsset, bottomAsset)
  }, [ door_type, posX, posY, korpusType, topAsset, bottomAsset]);

  const leftRef = useRef()
  const rightRef = useRef()
  const leftDoubleRef = useRef()
  const rightDoubleRef = useRef()

  const openDoor = useCornerStore.use.openDoor()

  const { clock } = useThree()

  useEffect(() => {
    clock.start()
  }, [openDoor])

  useFrame(({ clock }) => {
    if (!withAnimation) return
    
    if (
      door_type === Config.door.type.revolving_left &&
      leftRef.current === undefined
    )
      return
    if (
      door_type === Config.door.type.revolving_right &&
      rightRef.current === undefined
    )
      return
    if (
      door_type === Config.door.type.revolving_double &&
      leftDoubleRef.current === undefined &&
      rightDoubleRef.current === undefined
    )
      return

    const elapsedTime = clock.getElapsedTime()
    if (openDoor) {
      switch (door_type) {
        case Config.door.type.revolving_left:
          if (leftRef.current.rotation.y > -(Math.PI / 2 - 0.1))
            leftRef.current.rotation.y = -elapsedTime
          else clock.stop()
          break
        case Config.door.type.revolving_right:
          if (rightRef.current.rotation.y < Math.PI / 2 - 0.1)
            rightRef.current.rotation.y = elapsedTime
          else clock.stop()
          break
        case Config.door.type.revolving_double:
          if (
            leftDoubleRef.current.rotation.y > -(Math.PI / 2 - 0.1) ||
            rightDoubleRef.current.rotation.y < Math.PI / 2 - 0.1
          ) {
            leftDoubleRef.current.rotation.y = -elapsedTime
            rightDoubleRef.current.rotation.y = elapsedTime
          } else clock.stop()
          break
        default:
          break
      }
    } else {
      switch (door_type) {
        case Config.door.type.revolving_left:
          if (leftRef.current.rotation.y < 0)
            leftRef.current.rotation.y = -(Math.PI / 2 - 0.1) + elapsedTime
          else {
            leftRef.current.rotation.y = 0
            clock.stop()
          }
          break
        case Config.door.type.revolving_right:
          if (rightRef.current.rotation.y > 0)
            rightRef.current.rotation.y = Math.PI / 2 - 0.1 - elapsedTime
          else {
            rightRef.current.rotation.y = 0
            clock.stop()
          }
          break
        case Config.door.type.revolving_double:
          if (
            leftDoubleRef.current.rotation.y < 0 ||
            rightDoubleRef.current.rotation.y > 0
          ) {
            leftDoubleRef.current.rotation.y =
              -(Math.PI / 2 - 0.1) + elapsedTime
            rightDoubleRef.current.rotation.y = Math.PI / 2 - 0.1 - elapsedTime
          } else {
            leftDoubleRef.current.rotation.y = 0
            rightDoubleRef.current.rotation.y = 0
            clock.stop()
          }
          break
        default:
          break
      }
    }
  })
  return (
    <group visible={visible}>
      {door_type === Config.door.type.revolving_left && (
        <group
          ref={leftRef}
          position={[posX - width / 2, posY, Config.plate.thickness / 2]}
        >
          <Plate
            args={[width, height, scale[2]]}
            position={[positionX, positionY, -Config.plate.thickness / 2]}
            type={Config.plate.type.back}
            category={Config.color.category.front}
          />
        </group>
      )}
      {door_type === Config.door.type.revolving_right && (
        <group
          ref={rightRef}
          position={[posX + width / 2, posY, Config.plate.thickness / 2]}
        >
          <Plate
            args={[width, height, scale[2]]}
            position={[positionX, positionY, -Config.plate.thickness / 2]}
            type={Config.plate.type.back}
            catergory={Config.color.category.front}
          />
        </group>
      )}
      {door_type === Config.door.type.revolving_double && (
        <>
          {/* left part */}
          <group
            ref={leftDoubleRef}
            position={[
              posX -
                Config.furnishing.default.frontInterval -
                (width / 2 - Config.furnishing.default.frontInterval),
              posY,
              Config.plate.thickness / 2,
            ]}
          >
            <Plate
              args={[
                width / 2 - Config.furnishing.default.frontInterval,
                height,
                scale[2],
              ]}
              position={[
                (korpusType === Config.korpusType.uShap || korpusType === Config.korpusType.innerShap) && elementIndex === Config.elementIndex.first ?
                (width / 2 - Config.furnishing.default.frontInterval) / 2 + 0.95 :
                (korpusType === Config.korpusType.uShap || korpusType === Config.korpusType.innerShap) && elementIndex === Config.elementIndex.last ?
                (width / 2 - Config.furnishing.default.frontInterval) / 2 - 0.95 :
                (korpusType === Config.korpusType.innerShap2 && elementIndex === Config.elementIndex.first) ?
                (width / 2 - Config.furnishing.default.frontInterval) / 2 + 0.475 :
                (korpusType === Config.korpusType.innerShap2 && elementIndex === Config.elementIndex.last) ?
                (width / 2 - Config.furnishing.default.frontInterval) / 2 - 0.475 : (width / 2 - Config.furnishing.default.frontInterval) / 2,
                positionY,
                -Config.plate.thickness / 2,
              ]}
              type={Config.plate.type.back}
              catergory={Config.color.category.front}
            />
          </group>
          {/* right part */}
          <group
            ref={rightDoubleRef}
            position={[
              posX +
                Config.furnishing.default.frontInterval +
                (width / 2 - Config.furnishing.default.frontInterval),
              posY,
              Config.plate.thickness / 2,
            ]}
          >
            <Plate
              args={[
                width / 2 - Config.furnishing.default.frontInterval,
                height,
                scale[2],
              ]}
              position={[
                (korpusType === Config.korpusType.uShap || korpusType === Config.korpusType.innerShap) && elementIndex === Config.elementIndex.first ?
                -(width / 2 - Config.furnishing.default.frontInterval) / 2 + 0.95 :
                (korpusType === Config.korpusType.uShap || korpusType === Config.korpusType.innerShap) && elementIndex === Config.elementIndex.last ?
                -(width / 2 - Config.furnishing.default.frontInterval) / 2 - 0.95 :
                (korpusType === Config.korpusType.innerShap2 && elementIndex === Config.elementIndex.first) ?
                -(width / 2 - Config.furnishing.default.frontInterval) / 2 + 0.475 :
                (korpusType === Config.korpusType.innerShap2 && elementIndex === Config.elementIndex.last) ?
                -(width / 2 - Config.furnishing.default.frontInterval) / 2 - 0.475 : -(width / 2 - Config.furnishing.default.frontInterval) / 2,
                positionY,
                -Config.plate.thickness / 2,
              ]}
              type={Config.plate.type.back}
              catergory={Config.color.category.front}
            />
          </group>
        </>
      )}
    </group>
  )
})

export default Door
