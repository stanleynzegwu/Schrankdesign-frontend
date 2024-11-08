import { useLoader, useThree } from "@react-three/fiber"
import { Plane, Html } from "@react-three/drei" // RoundedBox, PositionPoint
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import * as THREE from "three"
// import { Html, Select } from "@react-three/drei"
import { createUseGesture, dragAction, pinchAction } from "@use-gesture/react"

import Config from "../../../config"
import { getDraggingInfo } from "../../utils/draggingInfo"
import { getBottom, getTop } from "../../utils/availableSpace"
// import { formatNumber } from "../../utils/formatNumber"
import Drawer from "../common/drawer"
import InternalDrawer from "../common/internalDrawer"
import MeasureComponent from "./MeasureComponent"

import useDndStore from "../../zustand/dndStore"
import useDimensionStore from "../../zustand/dimensionStore"
import useCornerStore from "../../zustand/cornerStore"
import useFurnishingStore from "../../zustand/furnishingStore"

import { Griff } from "../common/griff"

import PlusIcon  from "/images/configurator/icons/plus-1.png?url"
import MinusIcon  from "/images/configurator/icons/minus.png?url"
// import {  Vector2 } from 'three';
let intersects = new Array(1)
// const findClosestElement = (array, target) => {
//   let closestElement = array[0] // Assume the first element is closest initially
//   let minDifference = Math.abs(target - array[0]) // Initialize with the difference of the first element

//   for (let i = 1; i < array.length; i++) {
//     const difference = Math.abs(target - array[i])

//     if (difference < minDifference) {
//       minDifference = difference
//       closestElement = array[i]
//     }
//   }

//   return closestElement
// }
// show or hide top and bottom shelf of drawer
let drawerTopVisible = true
let drawerBottomVisible = true

// show or hide shelf of neighbors
let topConnected = false
let bottomConnected = false

// let g_availableTop = 0
// let g_availableBottom = 0

let topAssetType = "none"
let result = {}
const DrawerComponent = React.memo(function DrawerComponent({
  xIndex,
  inDivider,
  d_xIndex,
  d_yPos,
  type,
  initialScale,
  initialPosition,
  spaceRef,
  topVisible,
  bottomVisible,
  sideVisible,
  topShelfDistance,
  // isShowControl,
  topAsset,
  bottomAsset,
  drawerType,
  initialDrawerGroup,
  initialDrawerGroupScale
}) {
  const { size, camera, raycaster } = useThree()

  const [scale, setScale] = useState(initialScale)
  const [position, setPosition] = useState(initialPosition)
  const setDrawerHeight = useDndStore.use.setDrawerHeight()
  const setDrawerTopDistance = useDndStore.use.setDrawerTopDistance()
  const setType = useDndStore.use.setType()

  const setShowDimensions = useCornerStore.use.setShowDimensions()

  const furnishingAssets = useFurnishingStore.use.furnishingAssets()
  const addAsset = useFurnishingStore.use.addAsset()
  const removeAsset = useFurnishingStore.use.removeAsset()
  const showDrawerShelf = useFurnishingStore.use.showDrawerShelf()
  const setSelectionInfo = useFurnishingStore.use.setSelectionInfo()

  const setAssetDragging = useDndStore.use.setAssetDragging()
  const assetDragging = useDndStore.use.assetDragging()

  const totalSpaceS = useFurnishingStore.use.totalSpace()

  const removeGriff = useFurnishingStore.use.removeGriff()

  // const updateDrawerScale = useFurnishingStore.use.updateDrawerScale()

  const hanging = useDimensionStore.use.hanging()
  const withFeet = useDimensionStore.use.withFeet()

  const [planPositionX, setPlanPositionX] = useState()
  const [planPositionY, setPlanPositionY] = useState()
  const [totalSpace, setTotalSpace] = useState(totalSpaceS)
  // update scale based on initial scale change
  useEffect(() => {
    setScale(initialScale)
    setPosition(initialPosition)
    setPlanPositionX(initialPosition[0])
    setPlanPositionY(initialPosition[1])
  }, [initialScale, initialPosition])

  useEffect(() => {
    setTotalSpace(totalSpaceS)
  }, [totalSpaceS])
  const pointer = useMemo(() => new THREE.Vector2(), [])
  // const mouse = useRef(new Vector2());

  const ref = useRef()

  const viewOption = useCornerStore.use.viewOption()

  const height = useDimensionStore.use.height()
  const depth = useDimensionStore.use.depth()
  const width = useDimensionStore.use.width()
  const elementsCount = useDimensionStore.use.elementsCount()

  const [dragStarted, setDragStarted] = useState(true)

  const [showControl, setShowControl] = useState(false)


  const [showDimentionControl, setShowDimensionControl] = useState(false)
  const [showDimen, setShowDimen] = useState(false)

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
      setPlanPositionX(position[0])
      setPlanPositionY(position[1])
      setSelectionInfo({
        xIndex,
        yPos: position[1],
        inDivider,
        d_xIndex,
        d_yPos,
      })
      setAssetDragging(true)
      if (!topVisible || !bottomVisible) {
        showDrawerShelf({
          type,
          xIndex,
          yPos: position[1],
          inDivider,
          d_xIndex,
          d_yPos,
        })
      }
      setShowControl(false)
    }
  }, [dragStarted])

  const handleDragStart = useCallback(() => {
    setType(type)
    setDrawerHeight(scale[1])
    if (type === Config.furnishing.type.drawer) {
      setDrawerTopDistance(topShelfDistance)
    }
    setDragStarted(true)
  }, [type, scale, topShelfDistance, xIndex, position])

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
            // xIndex,
            top,
            bottom,
            topAsset,
            bottomAsset,
            availableTop,
            availableBottom,
          } = intersects[0].object.userData
          
          topAssetType = topAsset
          result = getDraggingInfo({
            type,
            top,
            bottom,
            topAsset,
            bottomAsset,
            initialPosY: intersects[0].point.y * 100 + height / 2,
            raster: Config.furnishing.default.raster,
            availableWidth: intersects[0].object.geometry.parameters.width,
            objectHeight: scale[1],
          })

          drawerTopVisible = result.topVisible
          drawerBottomVisible = result.bottomVisible
          topConnected = result.topConnected
          bottomConnected = result.bottomConnected
          ref.current?.position.set(
            intersects[0].object.position.x,
            hanging || withFeet ? result.posY-25 : result.posY,
            position[2]
          )
          setPlanPositionX(intersects[0].object.position.x)
          setPlanPositionY(result.posY)

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
            aboveBottom: getBottom(
              hanging || withFeet ? result.posY-25 : result.posY,
              scale[1],
              type,
              topShelfDistance
            ),
            belowTop: getTop(
              hanging || withFeet ? result.posY-25 : result.posY,
              scale[1], 
              type
            ),
            belowBottom: availableBottom,
          }
          if (JSON.stringify(measureInfo) !== JSON.stringify(tempMeasureInfo)) {
            setMeasureInfo(tempMeasureInfo)
          }
        } else {
          drawerTopVisible = true
          topConnected = false

          drawerBottomVisible = true
          bottomConnected = false

          ref.current?.position.set(
            intersects[0].point.x * 100 + width / 2,
            intersects[0].point.y * 100 + height / 2,
            depth + depth / 2
          )

          setShowMeasure(false)
        }
      }
    },
    [ref, spaceRef, measureInfo, hanging, withFeet]
    // [ref, scale, initialScale, spaceRef, dragStarted, showMeasure]
  )

  const handleDragEnd = useCallback(
    (state) => {
      setPlanPositionX(ref.current.position.x)
      setPlanPositionY(ref.current.position.y)
      setShowMeasure(false)
      if (
        state.values[0] === state.initial[0] &&
        state.values[1] === state.initial[1]
      ) {
        // dispatch(updateSelected({ xIndex, yIndex, selected: true }))
        return
      }

      if (intersects[0].object.name === "available") {
        let drawerScale = scale
        let drawerPosition = [
          ref.current.position.x,
          ref.current.position.y,
          ref.current.position.z,
        ]
        let tempDrawerGroupScale = initialDrawerGroupScale
        let tempDrawerGroup = initialDrawerGroup
        const payload = {}
        if (type === Config.furnishing.type.drawer) {
          if(!drawerTopVisible) {
            const filteredAssets = furnishingAssets.filter((asset) => {
              return asset.xIndex === intersects[0].object.userData.xIndex &&
                asset.position[1] > ref.current.position.y
            })
            const sortAssets = filteredAssets.sort((a, b) => {
              return a.position[1] - b.position[1]
            })
            const topAsset = sortAssets[0]

            if (topAsset && topAsset?.type === Config.furnishing.type.drawer) {
              tempDrawerGroup = initialDrawerGroup + 1
              topAsset.drawerGroupScale.map((asset) => {
                tempDrawerGroupScale.push(asset)
              })
              drawerScale = [
                scale[0],
                scale[1] + topAsset?.scale[1] + 0.475
                          + Config.furnishing.drawer.bottomShelfDistance + Config.furnishing.shelf.thickness1,
                scale[2],
              ]
              drawerPosition = [
                ref.current.position.x,
                ref.current.position.y + drawerScale[1]/2 - scale[1]/2,
                ref.current.position.z,
              ]
              removeAsset({ xIndex: topAsset.xIndex, yPos: topAsset.position[1] })
            }
          }
          if(!drawerBottomVisible) {
            const filteredAssets = furnishingAssets.filter((asset) => {
              return asset.xIndex === intersects[0].object.userData.xIndex &&
                asset.position[1] < ref.current.position.y
            })
            const sortAssets = filteredAssets.sort((a, b) => {
              return b.position[1] - a.position[1]
            })
            const topAsset = sortAssets[0]
            if (topAsset && topAsset?.type === Config.furnishing.type.drawer) {
              tempDrawerGroup = initialDrawerGroup + 1
              topAsset.drawerGroupScale.map((asset) => {
                tempDrawerGroupScale.unshift(asset)
              })
              drawerScale = [
                scale[0],
                scale[1] + topAsset?.scale[1] + Config.furnishing.drawer.topShelfDistance 
                          + Config.furnishing.drawer.bottomShelfDistance + Config.furnishing.shelf.thickness1,
                scale[2],
              ]
              drawerPosition = [
                ref.current.position.x,
                ref.current.position.y - drawerScale[1]/2 + scale[1]/2,
                ref.current.position.z,
              ]
              removeAsset({ xIndex: topAsset.xIndex, yPos: topAsset.position[1] })
            }
          }
        }
        if (type === Config.furnishing.type.internalDrawer) {
          if (topConnected) {
            const filteredAssets = furnishingAssets.filter((asset) => {
              return asset.xIndex === intersects[0].object.userData.xIndex &&
                asset.position[1] > ref.current.position.y
            })
            const sortAssets = filteredAssets.sort((a, b) => {
              return a.position[1] - b.position[1]
            })
            const topAsset = sortAssets[0]
            if (topAsset && topAsset?.type === Config.furnishing.type.internalDrawer) {
              drawerScale = [
                scale[0],
                scale[1] + topAsset?.scale[1] + Config.furnishing.internalDrawer.topShelfDistance 
                  + Config.furnishing.internalDrawer.panelSpace,
                scale[2],
              ]
              drawerPosition = [
                ref.current.position.x,
                ref.current.position.y + drawerScale[1]/2 - scale[1]/2,
                ref.current.position.z,
              ]
              removeAsset({ xIndex: topAsset?.xIndex, yPos: topAsset?.position[1] })
            }
          }
          if (bottomConnected) {
            const filteredAssets = furnishingAssets.filter((asset) => {
              return asset.xIndex === intersects[0].object.userData.xIndex &&
                asset.position[1] < ref.current.position.y
            })
            const sortAssets = filteredAssets.sort((a, b) => {
              return b.position[1] - a.position[1]
            })
            const topAsset = sortAssets[0]
            if (topAsset && topAsset?.type === Config.furnishing.type.internalDrawer) {
              drawerScale = [
                scale[0],
                scale[1] + topAsset.scale[1]  + Config.furnishing.internalDrawer.topShelfDistance 
                          + Config.furnishing.internalDrawer.panelSpace,
                scale[2],
              ]
              drawerPosition = [
                ref.current.position.x,
                ref.current.position.y - drawerScale[1]/2 + scale[1]/2,
                ref.current.position.z,
              ]
              removeAsset({ xIndex: topAsset.xIndex, yPos: topAsset.position[1] })
            }
          }
        }
        payload.removal = {
          xIndex,
          yPos: initialPosition[1],
          inDivider,
          d_xIndex,
          d_yPos,
        }

        payload.asset = {
          xIndex: intersects[0].object.userData.xIndex,
          inDivider: intersects[0].object.userData.inDivider,
          d_xIndex: intersects[0].object.userData.d_xIndex,
          d_yPos: intersects[0].object.userData.d_yPos,

          position: drawerPosition,
          scale: drawerScale,
          type,
          drawerType,
          topVisible,
          bottomVisible,
          sideVisible: true,
          drawerGroup: tempDrawerGroup,
          drawerGroupScale: tempDrawerGroupScale,
          topShelfDistance:
            type === Config.furnishing.type.drawer
              ? topShelfDistance
              : undefined,
          topShelfVisible:
            type === Config.furnishing.type.divider &&
            (topAssetType === Config.furnishing.type.slopingFloor ||
              topAssetType === Config.furnishing.type.clothesLift ||
              topAssetType === Config.furnishing.type.clothesRail ||
              topAssetType === Config.furnishing.type.pantsPullout)
              ? true
              : false,
          dividerLeftWidth:
            type === Config.furnishing.type.divider
              ? (scale[0] - Config.furnishing.divider.thickness) / 2
              : undefined,
        }

        payload.drawerShelf = []
        if (topConnected) {
          payload.drawerShelf.push({
            location: "top",
            bottomVisible: !topConnected,
          })
        }
        if (bottomConnected) {
          payload.drawerShelf.push({
            location: "bottom",
            topVisible: !bottomConnected,
          })
        }

        addAsset(payload)
        setShowControl(true)
      } else {
        removeAsset({ xIndex, yPos: position[1] })
      }

      setAssetDragging(false)
    },
    [ref, scale, topShelfDistance, xIndex, position, furnishingAssets]
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

  const [drawerHeightValue, setDrawerHeightValue] = useState()

  useEffect(() => {
    setDrawerHeightValue(
      (topShelfDistance === undefined
        ? 0
        : initialScale[1] +
          topShelfDistance +
          Config.furnishing.drawer.bottomShelfDistance +
          2 * Config.furnishing.shelf.thickness1
      ).toFixed(1)
    )
  }, [initialScale, topShelfDistance])

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
  }, [type, xIndex, scale, spaceRef])

  // const handleDrawerHeight = useCallback(
  //   (drawerHeight) => {
  //     const tempTopShelfDistance =
  //       drawerHeight -
  //       scale[1] -
  //       Config.furnishing.drawer.bottomShelfDistance -
  //       Config.furnishing.shelf.thickness1 * 2

  //     if (tempTopShelfDistance < Config.furnishing.drawer.topShelfDistance) {
  //       alert(
  //         "Minimum of drawer front height is ",
  //         scale[1] +
  //           Config.furnishing.drawer.bottomShelfDistance +
  //           Config.furnishing.drawer.topShelfDistance +
  //           Config.furnishing.shelf.thickness1 * 2
  //       )
  //       return false
  //     }

  //     if (drawerHeight > scale[1] + 10) {
  //       alert("Maximum is ", scale[1] + 10)
  //       return false
  //     }

  //     if (g_availableTop === 0 && g_availableBottom === 0) {
  //       alert("not enough available space!")
  //       return false
  //     }

  //     if (
  //       position[1] +
  //         scale[1] / 2 +
  //         tempTopShelfDistance +
  //         Config.furnishing.shelf.thickness1 <
  //       g_availableTop
  //     ) {
  //       updateDrawerInfo({
  //         xIndex,
  //         yPos: position[1],
  //         topShelfDistance: tempTopShelfDistance,
  //         inDivider,
  //         d_xIndex,
  //         d_yPos,
  //       })
  //     } else if (
  //       position[1] -
  //         scale[1] / 2 -
  //         Config.furnishing.drawer.bottomShelfDistance -
  //         Config.furnishing.shelf.thickness1 >
  //       g_availableBottom
  //     ) {
  //       updateDrawerInfo({
  //         xIndex,
  //         yPos: position[1],
  //         topShelfDistance: tempTopShelfDistance,
  //         positionY:
  //           g_availableTop -
  //           Config.furnishing.shelf.thickness1 -
  //           tempTopShelfDistance -
  //           scale[1] / 2,
  //         inDivider,
  //         d_xIndex,
  //         d_yPos,
  //       })
  //     } else {
  //       alert("not enough available space!")
  //       return false
  //     }

  //     return true
  //   },
  //   [scale, position, topShelfDistance]
  // )

  const handleBlur = useCallback(() => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setShowDimensionControl(false);
      const flagValue = position[1] + scale[1]/2 + topShelfDistance + Config.furnishing.shelf.thickness1+0.5
      const {availableTop} = getAvailableSpace(xIndex, totalSpace, flagValue) // aboveBottom
      const scaleY = topShelfDistance === undefined ? 0 
        : drawerHeightValue - topShelfDistance -
          Config.furnishing.drawer.bottomShelfDistance -
          2 * Config.furnishing.shelf.thickness1
      const tempAvailableTop = scaleY - scale[1]
      const positionY = position[1] -scale[1]/2 + scaleY/2
      if (availableTop > 0) {
        customDrawer(scaleY, positionY)
      } else {
        if (tempAvailableTop < 0) {
          customDrawer(scaleY, positionY)
        } else {
          const filteredAssets = furnishingAssets.filter((asset) => {
            return asset.xIndex === xIndex &&
              asset.position[1] > position[1]
          })
          const sortAssets = filteredAssets.sort((a, b) => {
            return a.position[1] - b.position[1]
          })
          let available
          if ( sortAssets.length > 0 ) {
            available = (sortAssets[0].position[1] - sortAssets[0].scale[1]/2) - 
                  (position[1] + scale[1]/2)
          } else {
            available = height - (position[1] + scale[1]/2)
          }
          if (tempAvailableTop < available) {
            customDrawer(scaleY, positionY)
          } else {
            setDrawerHeightValue(
              (topShelfDistance === undefined
                ? 0
                : scale[1] +
                  topShelfDistance +
                  Config.furnishing.drawer.bottomShelfDistance +
                  2 * Config.furnishing.shelf.thickness1
              ).toFixed(1)
            )
          }
        }
      }
    }
    setShowControl(false)
  }, [drawerHeightValue, position])

  const onRemoveObject = useCallback(() => {
    removeAsset({ xIndex, yPos: position[1] })
    removeGriff({ xIndex: xIndex, posY: position[1]})
  }, [xIndex, position, inDivider])

  const getAvailableSpace = (initialXIndex, totalSpace, flagValue) => {
    const filter = totalSpace.filter((space) => {
      return space.xIndex === initialXIndex &&
        space.availableBottom <= flagValue &&
        space.availableTop >= flagValue
    })
    // const aboveTop = filter[0]?.availableTop
    const aboveBottom = getBottom(
      hanging || withFeet ? position[1]-25 : position[1],
      scale[1],
      type,
      topShelfDistance
    )
    // const availableTop = aboveTop-aboveBottom
    const availableTop = filter[0]?.height
    return {availableTop, aboveBottom}
  }
  const updateDrawer = (scaleY, positionY, tempDrawerGroupScale) => { 
    const payload = {}

        payload.removal = {
          xIndex,
          yPos: position[1],
          inDivider,
          d_xIndex,
          d_yPos,
        }

        payload.asset = {
          xIndex,
          inDivider,
          d_xIndex,
          d_yPos,
          position: [
            position[0],
            positionY,
            position[2],
          ],
          scale: [scale[0], scaleY, scale[2]],
          // scale: scale,
          type,
          drawerType,
          // isShowControl: true,
          topVisible,
          bottomVisible,
          sideVisible: true,
          topShelfDistance:
            type === Config.furnishing.type.drawer
              ? topShelfDistance
              : undefined,
          topShelfVisible:
            type === Config.furnishing.type.divider &&
            (topAssetType === Config.furnishing.type.slopingFloor ||
              topAssetType === Config.furnishing.type.clothesLift ||
              topAssetType === Config.furnishing.type.clothesRail ||
              topAssetType === Config.furnishing.type.pantsPullout)
              ? true
              : false,
          dividerLeftWidth:
            type === Config.furnishing.type.divider
              ? (scale[0] - Config.furnishing.divider.thickness) / 2
              : undefined,
          bottomAsset,
          drawerGroup: initialDrawerGroup + 1,
          drawerGroupScale: tempDrawerGroupScale,
        }

        payload.drawerShelf = []
        if (topConnected) {
          payload.drawerShelf.push({
            location: "top",
            bottomVisible: !topConnected,
          })
        }
        if (bottomConnected) {
          payload.drawerShelf.push({
            location: "bottom",
            topVisible: !bottomConnected,
          })
        }
        addAsset(payload)
  }
  const customDrawer = (scaleY, positionY) => { 
    const payload = {}

        payload.removal = {
          xIndex,
          yPos: position[1],
          inDivider,
          d_xIndex,
          d_yPos,
        }

        payload.asset = {
          xIndex,
          inDivider,
          d_xIndex,
          d_yPos,
          position: [
            position[0],
            positionY,
            position[2],
          ],
          scale: [scale[0], scaleY, scale[2]],
          // scale: scale,
          type,
          drawerType,
          // isShowControl: true,
          topVisible,
          bottomVisible,
          sideVisible: true,
          topShelfDistance:
            type === Config.furnishing.type.drawer
              ? topShelfDistance
              : undefined,
          topShelfVisible:
            type === Config.furnishing.type.divider &&
            (topAssetType === Config.furnishing.type.slopingFloor ||
              topAssetType === Config.furnishing.type.clothesLift ||
              topAssetType === Config.furnishing.type.clothesRail ||
              topAssetType === Config.furnishing.type.pantsPullout)
              ? true
              : false,
          dividerLeftWidth:
            type === Config.furnishing.type.divider
              ? (scale[0] - Config.furnishing.divider.thickness) / 2
              : undefined,
          bottomAsset,
          drawerGroup: 1,
          drawerGroupScale: [scaleY],
        }

        payload.drawerShelf = []
        if (topConnected) {
          payload.drawerShelf.push({
            location: "top",
            bottomVisible: !topConnected,
          })
        }
        if (bottomConnected) {
          payload.drawerShelf.push({
            location: "bottom",
            topVisible: !bottomConnected,
          })
        }
        addAsset(payload)
  }
  const onPlusMap = useCallback(() => {
    if (type === Config.furnishing.type.drawer)  {
      const flagValue = position[1] + scale[1]/2 + topShelfDistance + Config.furnishing.shelf.thickness1+1
      const {availableTop} = getAvailableSpace(xIndex, totalSpace, flagValue) // aboveBottom
      if (drawerType !== Config.furnishing.drawer.type.customDrawer) {
        const scaleY = scale[1] + initialDrawerGroupScale[0] + 0.475
        + Config.furnishing.drawer.bottomShelfDistance + Config.furnishing.shelf.thickness1
        const positionY = position[1] - scale[1]/2 + scaleY/2
        if ( initialDrawerGroupScale[0] < availableTop) {
          let tempDrawerGroupScale = initialDrawerGroupScale
          tempDrawerGroupScale.push(initialDrawerGroupScale[0])
          // console.log(tempDrawerGroupScale, initialDrawerGroupScale)
          updateDrawer(scaleY, positionY, tempDrawerGroupScale)
        }
      } else {
        if (drawerHeightValue < availableTop) {
  
          const scaleY = topShelfDistance === undefined ? 0 
            : 40 - topShelfDistance -
              Config.furnishing.drawer.bottomShelfDistance -
              2 * Config.furnishing.shelf.thickness1
    
          const positionY = position[1] -scale[1]/2 + scaleY/2
          customDrawer(scaleY, positionY)
  
        } else {
  
          const filteredAssets = furnishingAssets.filter((asset) => {
            return asset.xIndex === xIndex &&
              asset.position[1] > position[1]
          })
          const sortAssets = filteredAssets.sort((a, b) => {
            return a.position[1] - b.position[1]
          })
  
          let available = topShelfDistance
          if ( sortAssets.length > 0 ) {
            available = (sortAssets[0].position[1] - sortAssets[0].scale[1]/2) - 
                  (position[1] + scale[1]/2) - topShelfDistance -Config.furnishing.shelf.thickness1
          } else {
            available = height - (position[1] + scale[1]/2)
          }
  
          const scaleY = topShelfDistance === undefined ? 0 
            : Number(drawerHeightValue) + available - topShelfDistance*2 -
              Config.furnishing.drawer.bottomShelfDistance -
              3 * Config.furnishing.shelf.thickness1
          
          const positionY = position[1] -scale[1]/2 + scaleY/2
          customDrawer(scaleY, positionY)
        }
      }
    }

    if (type === Config.furnishing.type.internalDrawer) {
      const filteredAssets = furnishingAssets.filter((asset) => {
        return asset.xIndex === xIndex &&
          asset.position[1] > position[1]
      })
      const sortAssets = filteredAssets.sort((a, b) => {
        return a.position[1] - b.position[1]
      })

      let available = topShelfDistance
      if ( sortAssets.length > 0 ) {
        available = (sortAssets[0].position[1] - sortAssets[0].scale[1]/2) - 
              (position[1] + scale[1]/2) - Config.furnishing.internalDrawer.topShelfDistance
              - Config.furnishing.internalDrawer.panelSpace
      } else {
        available = height - (position[1] + scale[1]/2) - Config.furnishing.internalDrawer.topShelfDistance
              -  Config.furnishing.internalDrawer.panelSpace
      }
      if (initialDrawerGroupScale[0] < available) {
        const scaleY = initialDrawerGroupScale[0] + scale[1] + Config.furnishing.internalDrawer.topShelfDistance
                        + Config.furnishing.internalDrawer.panelSpace
        const positionY = position[1] - scale[1]/2 + scaleY/2
        customDrawer(scaleY, positionY)
      }
    }

  }, [totalSpace, xIndex, drawerHeightValue, scale, position, furnishingAssets, height, initialDrawerGroupScale, initialDrawerGroup]);  

  const [, , plusMap] = useLoader(THREE.TextureLoader, [ // trashMap, arrowUpDownMap, plusMap
    "/images/furnishing/doors/trash_blue.png",
    "/images/configurator/icons/arrow_up_down.png",
    "/images/configurator/icons/plus.png",
  ])
    plusMap.anisotropy = 16;  // Set anisotropy to a higher value
    plusMap.minFilter = THREE.LinearFilter; // Use linear filtering
    plusMap.magFilter = THREE.LinearFilter;
    plusMap.generateMipmaps = false; // Disable mipmaps
  return (
    <group
      // visible={scale[2] !== 0}
    >
      <Plane
        args={[scale[0], 25]}
        position={[
          planPositionX == undefined ? position[0] : planPositionX,
          planPositionY == undefined ? position[1] : planPositionY,
          depth + 3.2,
        ]}
        rotateX={Math.PI / 2}
        visible={false}
        onPointerOver={(e) => {
          e.stopPropagation()
          if (assetDragging) return
          
          setShowControl(true)
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          if (assetDragging) return
          if (showDimen) return
          setShowControl(false)
        }}
      />
      <group
        {...bind()}
        ref={ref}
        // position={position}
      >
        {type === Config.furnishing.type.drawer && (
          <>
            <Drawer
              scale={scale}
              depth={depth}
              elementIndex={
                (inDivider ? d_xIndex : xIndex) === 0
                  ? Config.elementIndex.first
                  : xIndex === elementsCount - 1
                  ? Config.elementIndex.last
                  : Config.elementIndex.middle
              }
              topVisible={topVisible}
              bottomVisible={bottomVisible}
              topShelfDistance={topShelfDistance}
              position={position}
              type={type}
              topAsset={topAsset}
              bottomAsset={bottomAsset}
              visible={true}
              xIndex={xIndex}
              drawerGroup={initialDrawerGroup}
              drawerGroupScale={initialDrawerGroupScale}
              drag={false}
            />
            <Griff
              type={type}
              visible={true}
              position={position}
              scale={scale}
              depth={depth}
              drawerGroupScale={initialDrawerGroupScale}
              topShelfDistance={topShelfDistance}
            />
          </>
        )}

        {type === Config.furnishing.type.internalDrawer && (
          <InternalDrawer
            scale={scale}
            depth={depth}
            topVisible={true}
            bottomVisible={bottomVisible}
            sideVisible={sideVisible}
            position={position}
          />
        )}
        {!assetDragging && showControl && drawerType !== Config.furnishing.drawer.type.customDrawer && (
          <group>
            <mesh
              onPointerOver={() => {
                document.body.style.cursor = "pointer"
              }}
              onPointerOut={() => {
                document.body.style.cursor = "auto"
              }}
              // position={[0, -5, depth + 3.21 - position[2]]}
            >
              <circleGeometry 
                // args={[5]}
              />
              <meshBasicMaterial 
                // map={arrowUpDownMap} 
              />
            </mesh>
            <mesh
              onPointerOver={() => {
                document.body.style.cursor = "pointer"
              }}
              onPointerOut={() => {
                document.body.style.cursor = "auto"
              }}
              onClick={() => onRemoveObject()}
              // position={[-scale[0] / 2 + 5, 4.5, depth + 3.21 - position[2]]}
            >
              <circleGeometry 
                // args={[5]}
              />
              <meshBasicMaterial 
                // map={trashMap}
              />
            </mesh>
            <mesh
              onPointerOver={() => {
                document.body.style.cursor = "pointer"
              }}
              onPointerOut={() => {
                document.body.style.cursor = "auto"
              }}
              onClick={() => onPlusMap()}
              // position={[scale[0] / 2 - 5, 4.5, depth + 3.21 - position[2]]}
            >
              <circleGeometry 
                // args={[5]} 
              />
              <meshBasicMaterial 
                // map={plusMap} 
              />
            </mesh>
          </group>
        )}

        {showControl && drawerType === Config.furnishing.drawer.type.customDrawer && (
          <group>
            <group>
              {/* Arrow Icon */}
              <mesh
                onPointerOver={() => {
                  document.body.style.cursor = "pointer"
                }}
                onPointerOut={() => {
                  document.body.style.cursor = "auto"
                }}
                // position={[0, -5, depth + 3.21 - position[2]]}
              >
                <circleGeometry 
                // args={[5]} 
                />
                <meshBasicMaterial 
                  // map={arrowUpDownMap} 
                />
              </mesh>
              {/* Trash Icon */}
              <mesh
                onPointerOver={() => {
                  document.body.style.cursor = "pointer"
                }}
                onPointerOut={() => {
                  document.body.style.cursor = "auto"
                }}
                onClick={() => onRemoveObject()}
                // position={[-scale[0] / 2 + 5, 4.5, depth + 3.21 - position[2]]}
              >
                <circleGeometry 
                  // args={[5]} 
                />
                <meshBasicMaterial 
                  // map={trashMap} 
                />
              </mesh>
              {/* Plus Icon */}
              <mesh
                onPointerOver={() => {
                  document.body.style.cursor = "pointer"
                }}
                onPointerOut={() => {
                  document.body.style.cursor = "auto"
                }}
                onClick={() => onPlusMap()}
                // position={[scale[0] / 2 - 5, 4.5, depth + 3.21 - position[2]]}
              >
                <circleGeometry 
                  // args={[5]} 
                />
                <meshBasicMaterial 
                  // map={plusMap} 
                />
              </mesh>
            </group>
            <group 
              // visible={drawerHeightValue < 41 ? true : false}
            >
              <mesh
                onPointerOver={() => {}}
                onPointerOut={() => {}}
              >
                <Html 
                  position={[0, showDimentionControl ? -0.1 : 4.5, depth + 3.21 - position[2]]} 
                  center args={[scale[0], scale[1]]}
                  pointerEvents="auto"
                >
                    {!showDimentionControl? (
                          <div 
                            className="w-[60px] bg-white h-[21px] rounded-[6px] cursor-pointer border border-[#36695C] text-center text-[14px] m-auto"
                            style={{width: `${scale[0] < 43 ? "30px" : "55px"}`}}
                            onClick={() => setShowDimensionControl(true)}  
                            tabIndex={0} // Makes this element focusable
                            onMouseOver={() => {
                              setShowDimen(true)
                            }}
                            onMouseLeave={() => {
                              setShowDimen(false)
                            }}
                          >
                            {scale[0] < 43 ? `${Math.round(drawerHeightValue)}` : `${Math.round(drawerHeightValue)} cm`}
                          </div>
                    ) : (
                      <div 
                        className={` bg-[#b6b6b6e0] justify-center gap-1 flex flex-row`}
                        style={{width: Math.round(11*(screen.width/1600)*55/camera.position.z)+'px', height: Math.round(11*(screen.height/900)*drawerHeightValue/camera.position.z)+'px'}}
                        tabIndex={0}  // Makes this element focusable
                        onBlur={() => {
                          if (!event.currentTarget.contains(event.relatedTarget)) {
                            setShowDimensionControl(false);
                            setShowControl(false)
                            handleBlur()
                          }
                        }}
                        > 
                        <div className="w-[30px] flex items-center mx-auto"
                          onClick={() => {
                            if (Math.round(drawerHeightValue) > 10)
                              setDrawerHeightValue(Number(drawerHeightValue - 1))
                          }}
                          >
                          <img src={MinusIcon} className="w-full cursor-pointer"/>
                        </div>
                        <div className="text-[14px] h-[22px] m-auto border border-[#36695C] rounded-[6px] px-1 bg-white flex flex-row"
                          style={{width: "65px"}}
                          onBlur={() => {
                            handleBlur()
                          }} // Handles blur event
                        
                        >
                          <input
                            className="w-[35px] bg-transparent text-center outline-none"
                            type="number"
                            value={Math.round(drawerHeightValue)}
                            onChange={(e) => {setDrawerHeightValue(Number(e.target.value))}}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault()
                                setShowDimensionControl(false);
                                setShowControl(false)
                                setShowDimen(false)
                                handleBlur()
                              }
                            }}
                          />
                          cm
                        </div>
                        <div className="w-[30px] flex items-center mx-auto"
                          onClick={() => {
                            if (Math.round(drawerHeightValue) < 40)
                              setDrawerHeightValue(Number(drawerHeightValue + 1))
                          }}
                        >
                          <img src={PlusIcon} className="w-full cursor-pointer"/>
                        </div>
                      </div>
                    )}
                </Html>
              </mesh>
            </group>
          </group>
        )}
      </group>

      <MeasureComponent
        measureInfo={measureInfo}
        showMeasure={showMeasure}
        depth={depth}
      />
    </group>
  )
})

export default DrawerComponent
