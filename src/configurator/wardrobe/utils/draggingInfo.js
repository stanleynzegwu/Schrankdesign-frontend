import Config from "../../config"
import { CalcInfo } from "../../../api/api";
import useCalcStore from "../zustand/calcStore";

const getDefaultScale = (type, drawerHeight, depth) => {
  const furnishingConfigs = {
    [Config.furnishing.type.shelf]: {
      width:
        (Config.furnishing.shelf.minWidth + Config.furnishing.shelf.maxWidth) /
          2 -
        Config.furnishing.default.spaceSides * 2,
      height: Config.furnishing.shelf.thickness1,
      depth:
        depth -
        Config.furnishing.default.spaceFront -
        Config.plate.backThickness -
        Config.plate.backIncident,
    },
    [Config.furnishing.type.foldBottom]: {
      width:
        (Config.furnishing.foldBottom.minWidth +
          Config.furnishing.foldBottom.maxWidth) /
          2 -
        Config.furnishing.default.spaceSides * 2,
      height: Config.furnishing.foldBottom.thickness1,
      depth:
        depth -
        Config.furnishing.default.spaceFront -
        Config.plate.backThickness -
        Config.plate.backIncident,
    },
    [Config.furnishing.type.pantsPullout]: {
      width:
        (Config.furnishing.shelf.minWidth + Config.furnishing.shelf.maxWidth) /
          2 -
        Config.furnishing.default.spaceSides * 2,
      height: Config.furnishing.shelf.thickness1,
      depth:
        depth -
        Config.furnishing.default.spaceFront -
        Config.plate.backThickness -
        Config.plate.backIncident,
    },
    [Config.furnishing.type.glassBottom]: {
      width:
        (Config.furnishing.shelf.minWidth + Config.furnishing.shelf.maxWidth) /
          2 -
        Config.furnishing.default.spaceSides * 2,
      height: Config.furnishing.glassBottom.thickness,
      depth:
        depth -
        Config.furnishing.default.spaceFront -
        Config.plate.backThickness -
        Config.plate.backIncident,
    },
    [Config.furnishing.type.drawer]: {
      width: Config.furnishing.drawer.defaultWidth,
      height: drawerHeight,
      depth: getDrawerDepth(type, depth),
    },
    [Config.furnishing.type.internalDrawer]: {
      width: Config.furnishing.drawer.defaultWidth,
      height: drawerHeight,
      depth: getDrawerDepth(type, depth),
    },
    [Config.furnishing.type.clothesRail]: {
      width: Config.furnishing.clothesRail.defaultWidth,
      height: Config.furnishing.clothesRail.defaultHeight,
      depth: Config.furnishing.clothesRail.defaultDepth,
    },
    [Config.furnishing.type.clothesLift]: {
      width: Config.furnishing.clothesLift.defaultWidth,
      height: Config.furnishing.clothesLift.defaultHeight,
      depth: Config.furnishing.clothesLift.defaultDepth,
    },
    [Config.furnishing.type.ledLighting]: {
      width: Config.furnishing.default.elementWidth,
      height: Config.furnishing.default.elementHeight,
      depth: Config.furnishing.ledLighting.defaultDepth,
    },
    [Config.furnishing.type.slopingFloor]: {
      width: Config.furnishing.slopingFloor.defaultWidth,
      height:
        (Config.furnishing.slopingFloor.wallHeight +
          Config.furnishing.slopingFloor.thickness) *
          Math.cos(Config.furnishing.slopingFloor.angle) +
        (depth -
          2 * Config.furnishing.slopingFloor.zIncident -
          (Config.furnishing.slopingFloor.wallHeight +
            Config.furnishing.slopingFloor.thickness) *
            Math.sin(Config.furnishing.slopingFloor.angle)) *
          Math.tan(Config.furnishing.slopingFloor.angle),
      depth: depth - Config.plate.backIncident - Config.plate.backThickness,
    },
    [Config.furnishing.type.divider]: {
      width: Config.furnishing.divider.thickness,
      height: Config.furnishing.divider.defaultHeight,
      depth: depth - Config.plate.backIncident - Config.plate.backThickness,
    },
    [Config.furnishing.type.door]: {
      width: Config.door.defaultWidth,
      height: Config.door.defaultHeight,
      depth: Config.plate.thickness,
    },
    [Config.furnishing.type.flap]: {
      width: Config.door.defaultFlapWidth,
      height: Config.door.defaultFlapHeight,
      depth: Config.plate.thickness,
    }
  }

  const config = furnishingConfigs[type]
  if (config) {
    return [config.width || 0, config.height || 0, config.depth || 0]
  }
  return [0, 0, 0]
}

const getPosZAvailable = (type, depth) => {
  const positionZConfigs = {
    [Config.furnishing.type.shelf]:
      depth / 2 +
      Config.plate.backThickness / 2 +
      Config.plate.backIncident / 2 -
      Config.furnishing.default.spaceFront / 2,
    [Config.furnishing.type.glassBottom]:
      depth / 2 +
      Config.plate.backThickness / 2 +
      Config.plate.backIncident / 2 -
      Config.furnishing.default.spaceFront / 2,
    [Config.furnishing.type.foldBottom]:
      depth / 2 +
      Config.plate.backThickness / 2 +
      Config.plate.backIncident / 2 -
      Config.furnishing.default.spaceFront / 2,
    [Config.furnishing.type.pantsPullout]:
      depth / 2 +
      Config.plate.backThickness / 2 +
      Config.plate.backIncident / 2 -
      Config.furnishing.default.spaceFront / 2,
    [Config.furnishing.type.drawer]:
      depth +
      Config.furnishing.drawer.bodyFrontIncident -
      getDrawerDepth(type, depth) / 2,
    [Config.furnishing.type.internalDrawer]:
      depth -
      Config.furnishing.internalDrawer.frontInnerSpace -
      Config.plate.thickness -
      getDrawerDepth(type, depth) / 2,
    [Config.furnishing.type.clothesRail]:
      depth / 2 +
      Config.plate.backThickness / 2 +
      Config.plate.backIncident / 2,
    [Config.furnishing.type.clothesLift]:
      depth / 2 +
      Config.plate.backThickness / 2 +
      Config.plate.backIncident / 2,
    [Config.furnishing.type.ledLighting]:
      depth -
      Config.furnishing.ledLighting.frontInnerSpace -
      Config.furnishing.ledLighting.defaultDepth / 2,
    [Config.furnishing.type.slopingFloor]:
      depth -
      Config.furnishing.slopingFloor.zIncident -
      (Config.furnishing.slopingFloor.wallHeight +
        Config.furnishing.slopingFloor.thickness) *
        Math.sin(Config.furnishing.slopingFloor.angle),
    [Config.furnishing.type.divider]:
      depth / 2 + (Config.plate.backThickness + Config.plate.backIncident) / 2,
    [Config.furnishing.type.door]: depth + Config.plate.thickness / 2,
    [Config.furnishing.type.flap]: depth + Config.plate.thickness / 2,
  }

  return positionZConfigs[type] || 0
}

// const getDrawerDepth = (type, depth) => {
//   const { backIncident, backThickness } = Config.plate
//   const { backSpace, depthRange } = Config.furnishing.drawer
//   const frontInnerSpace =
//     type === Config.furnishing.type.internalDrawer
//       ? (Config.furnishing.internalDrawer.frontInnerSpace + Config.plate.thickness)
//       : 0

//   const drawerDepthLimit =
//     depth - backIncident - backThickness - backSpace - frontInnerSpace

//   let index = depthRange.length - 1
//   for (let i = 0; i < depthRange.length; i++) {
//     if (depthRange[i] > drawerDepthLimit) {
//       index = i - 1
//       break
//     }
//   }

const getDrawerDepth = (type, depth) => {
  const calcInfo = useCalcStore.getState().calcInfo.assets;
  if(!calcInfo) return 
  // so I'll get data like this [25, 30, 35, 40, 45, 50, 55, 60], but now not hardcoded but fetched
        const depthRange = [
        Number(calcInfo['A_0001'].name.split('-')[2])/10,
        Number(calcInfo['A_0009'].name.split('-')[2])/10,
        Number(calcInfo['A_0016'].name.split('-')[2])/10,
        Number(calcInfo['A_0017'].name.split('-')[2])/10,
        Number(calcInfo['A_0018'].name.split('-')[2])/10,
        Number(calcInfo['A_0019'].name.split('-')[2])/10,
        Number(calcInfo['A_0020'].name.split('-')[2])/10,
        Number(calcInfo['A_0021'].name.split('-')[2])/10,
      ]

  const { backIncident, backThickness } = Config.plate
  const { backSpace } = Config.furnishing.drawer
  const frontInnerSpace =
    type === Config.furnishing.type.internalDrawer
      ? (Config.furnishing.internalDrawer.frontInnerSpace + Config.plate.thickness)
      : 0

  const drawerDepthLimit =
    depth - backIncident - backThickness - backSpace - frontInnerSpace

  let index = depthRange.length - 1
  for (let i = 0; i < depthRange.length; i++) {
    if (depthRange[i] > drawerDepthLimit) {
      index = i - 1
      break
    }
  }
  
  return depthRange[index] // Returns the last depth if no depth found
}


const getDraggingInfo = ({
  type,
  top,
  bottom,
  topAsset,
  bottomAsset,
  initialPosY,
  raster,
  availableWidth,
  objectHeight,
}) => {

  const {shelf, foldBottom, glassBottom, pantsPullout, clothesRail, clothesLift, drawer, internalDrawer, slopingFloor} = Config.furnishing.type;

  let posY = initialPosY
  let objectWidth = availableWidth
  let topVisible = true
  let bottomVisible = true
  let topConnected = false
  let bottomConnected = false

  if (
    type === shelf ||
    type === foldBottom ||
    type === glassBottom ||
    type === pantsPullout
  ) {
    if (posY > top) posY = top

    posY = bottom + Math.floor((posY - bottom) / raster) * raster + objectHeight / 2

    objectWidth = availableWidth - Config.furnishing.default.spaceSides * 2
  } else if (type === slopingFloor) {
    if (posY > top) posY = top
    else posY = bottom + Math.floor((posY - bottom) / raster) * raster

    objectWidth = availableWidth
  } else if (type === clothesRail || type === clothesLift) {
    if (posY > top) posY = top + objectHeight / 2
    else
      posY =
        bottom +
        Math.floor((posY - bottom) / raster) * raster +
        objectHeight / 2

    objectWidth = availableWidth
  } else if (type === drawer || type === internalDrawer) {
    const bottomShelfDistance = type === drawer
      ? Config.furnishing.drawer.bottomShelfDistance
      : Config.furnishing.internalDrawer.bottomShelfDistance
    if (
      posY >
      top +
        Config.furnishing.shelf.thickness1 +
        bottomShelfDistance +
        objectHeight / 2 -
        Config.furnishing.default.interval
    ) {
      if (topAsset === "none") {
        posY =
          top +
          2 * Config.furnishing.shelf.thickness1 +
          bottomShelfDistance +
          objectHeight / 2

        topVisible = false
      } else {
        posY =
          top +
          Config.furnishing.shelf.thickness1 +
          bottomShelfDistance +
          objectHeight / 2

        if (topAsset === drawer || topAsset === internalDrawer) {
          topVisible = false
          topConnected = true
        } else {
          topVisible = true
        }
      }
    } else if (
      posY <
      bottom +
        Config.furnishing.shelf.thickness1 +
        bottomShelfDistance +
        objectHeight / 2 +
        Config.furnishing.default.interval
    ) {
      if (bottomAsset === "none") {
        posY = bottom + bottomShelfDistance + objectHeight / 2

        bottomVisible = false
      } else {
        posY =
          bottom +
          Config.furnishing.shelf.thickness1 +
          bottomShelfDistance +
          objectHeight / 2

        if (
          bottomAsset === drawer ||
          bottomAsset === internalDrawer
        ) {
          bottomVisible = false
          bottomConnected = true
        } else {
          bottomVisible = true
        }
      }
    } else {
      posY =
        bottom +
        Math.floor(
          (posY -
            Config.furnishing.shelf.thickness1 -
            bottomShelfDistance -
            objectHeight / 2 -
            bottom) /
            raster
        ) *
          raster +
        Config.furnishing.shelf.thickness1 +
        bottomShelfDistance +
        objectHeight / 2

      topVisible = true
      topConnected = false

      bottomVisible = true
      bottomConnected = false
    }

    if (type === drawer) {
      objectWidth = availableWidth - Config.furnishing.drawer.sideIncident * 2
    } else if (type === internalDrawer) {
      objectWidth =
        availableWidth -
        Config.furnishing.internalDrawer.panelWidth * 2 -
        Config.furnishing.internalDrawer.panelSpace * 2
    }
  }

  return {
    posY,
    objectWidth,
    topVisible,
    bottomVisible,
    topConnected,
    bottomConnected,
  }
}

export { getDefaultScale, getPosZAvailable, getDraggingInfo }
