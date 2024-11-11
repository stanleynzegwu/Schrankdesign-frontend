import Config from "../../config"
import { getDefaultScale, getPosZAvailable } from "./draggingInfo"

export const updateFurnishing = (elementsWidths, depth, furnishingAssets) => {

  const {thickness} = Config.plate;
  const {divider, shelf, foldBottom, glassBottom, pantsPullout, clothesRail, clothesLift, slopingFloor, drawer, internalDrawer} = Config.furnishing.type;
  const {spaceSides} = Config.furnishing.default;
  const {sideIncident} = Config.furnishing.drawer;
  const {panelSpace, panelWidth} = Config.furnishing.internalDrawer;

  const elementsXInfo = elementsWidths.reduce((acc, width, index) => {
    const prevX = index === 0
      ? thickness
      : acc[index - 1] + elementsWidths[index - 1] / 2 + thickness;
      
    acc.push(prevX + width / 2)
    return acc;
  }, [])

  const updatedFurnishingAsset = furnishingAssets.map((asset, i) => {
    const defaultScale = getDefaultScale(asset.type, asset.scale[1], depth);
    const xIndex = asset.inDivider ? asset.d_xIndex : asset.xIndex;
    const width = elementsWidths[xIndex];

    const position = [
      asset.inDivider ? asset.position[0] : elementsXInfo[xIndex],
      asset.position[1],
      getPosZAvailable(asset.type, depth),
    ]

    let scale;
    if (asset.inDivider || asset.type === divider) {
      scale = [
        asset.scale[0],
        asset.type === divider ? asset.scale[1] : defaultScale[1],
        defaultScale[2],
      ]
    } else {
      scale = [ 
        [shelf, foldBottom, glassBottom, pantsPullout].includes(asset.type) 
          ? width - spaceSides * 2
          : asset.type === drawer
            ? width - sideIncident * 2
            : asset.type === internalDrawer
              ? width - (panelSpace + panelWidth) * 2
              : [clothesRail, clothesLift, slopingFloor, divider].includes(asset.type) 
                ? width
                : defaultScale[0],
        asset.type === divider ? asset.scale[1] : defaultScale[1],
        defaultScale[2],
      ]
    }

    asset.isShowControl = false;

    return {
      ...asset,
      position,
      scale,
    }
  })

  return updatedFurnishingAsset
}

export const updateLedAssets = (
  elementsWidths,
  height,
  depth,
  baseType,
  ledAssets
) => {
  const elementsXInfo = elementsWidths.reduce((acc, width, index) => {
    const prevX =
      index === 0
        ? Config.plate.thickness
        : acc[index - 1] +
        elementsWidths[index - 1] / 2 +
        Config.plate.thickness
    acc.push(prevX + width / 2)
    return acc
  }, [])

  const elementsTop = height - Config.plate.thickness
  const elementsBottom =
    (baseType == Config.baseType.panel
      ? Config.plate.plinthHeight
      : Config.glider.height) + Config.plate.thickness

  const result = ledAssets.map((asset) => {
    return {
      ...asset,
      position: [
        elementsXInfo[asset.xIndex],
        (elementsTop + elementsBottom) / 2,
        depth -
        Config.furnishing.ledLighting.frontInnerSpace -
        Config.furnishing.ledLighting.defaultDepth / 2,
      ],
      scale: [
        elementsWidths[asset.xIndex],
        elementsTop - elementsBottom,
        Config.furnishing.ledLighting.defaultDepth,
      ],
    }
  })

  return result
}

export const updateDoorAssets = (elementsWidths, height, depth, doorAssets) => {
  const elementsXInfo = elementsWidths.reduce((acc, width, index) => {
    const prevX =
      index === 0
        ? Config.plate.thickness
        : acc[index - 1] +
        elementsWidths[index - 1] / 2 +
        Config.plate.thickness
    acc.push(prevX + width / 2)
    return acc
  }, [])

  const elementsTop = height - Config.plate.thickness;
  const plateThicknessHalf = Config.plate.thickness * 0.5;

  const result = doorAssets.map((asset) => {
    const {revolving_left, revolving_right, revolving_double} = Config.door.type;
    const {left_type_range, double_type_range} = Config.door;

    const positionY =
      asset.topAsset === "none"
        ? (elementsTop + (asset.position[1] - asset.scale[1] * 0.5)) * 0.5
        : asset.position[1]
    const scaleY =
      asset.topAsset === "none"
        ? elementsTop - (asset.position[1] - asset.scale[1] * 0.5)
        : asset.scale[1]

    let updatedDoorType = asset.doorType;

    // console.log({
    //   scale: asset.scale[0], 
    //   leftMin: left_type_range.min, 
    //   leftMax: left_type_range.max, 
    //   doubleMin: double_type_range.min, 
    //   doubleMax: double_type_range.max
    // })

    if (asset.doorType === revolving_left || asset.doorType === revolving_right) {
      if (asset.scale[0] >= left_type_range.min && asset.scale[0] <= left_type_range.max) {
        updatedDoorType = asset.doorType
      } else {
        updatedDoorType = revolving_double
      }
    } else if (asset.doorType === revolving_double) {
      if (asset.scale[0] >= double_type_range.min && asset.scale[0] <= double_type_range.max) {
        updatedDoorType = revolving_left
      } else {
        updatedDoorType = asset.doorType
      }
    }

    return {
      ...asset,
      doorType: updatedDoorType,
      position: [
        elementsXInfo[asset.xIndex],
        positionY,
        depth + plateThicknessHalf,
      ],
      scale: [elementsWidths[asset.xIndex], scaleY, Config.plate.thickness],
    }
  })

  return result
}

export const updateFlapAssets = (elementsWidths, height, depth, flapAssets) => {
  // x position for elements
  const elementsXInfo = elementsWidths.reduce((acc, width, index) => {
    const prevX =
      index === 0
        ? Config.plate.thickness
        : acc[index - 1] +
        elementsWidths[index - 1] / 2 +
        Config.plate.thickness
    acc.push(prevX + width / 2)
    return acc
  }, [])

  const elementsTop = height - Config.plate.thickness
  const plateThicknessHalf = Config.plate.thickness * 0.5

  const result = flapAssets.map((asset) => {
    const positionY =
      asset.topAsset === "none"
        ? (elementsTop + (asset.position[1] - asset.scale[1] * 0.5)) * 0.5
        : asset.position[1]
    const scaleY =
      asset.topAsset === "none"
        ? elementsTop - (asset.position[1] - asset.scale[1] * 0.5)
        : asset.scale[1]

    let updatedDoorType = asset.doorType
    if (
      asset.doorType === Config.door.type.revolving_left ||
      asset.doorType === Config.door.type.revolving_right
    ) {
      if (asset.scale[0] > Config.door.left_type_range.max)
        updatedDoorType = Config.door.type.revolving_double
    } else if (asset.doorType === Config.door.type.revolving_double) {
      if (asset.scale[0] < Config.door.double_type_range.min)
        updatedDoorType = Config.door.type.revolving_left
    }

    return {
      ...asset,
      doorType: updatedDoorType,
      position: [
        elementsXInfo[asset.xIndex],
        positionY,
        depth + plateThicknessHalf,
      ],
      scale: [elementsWidths[asset.xIndex], scaleY, Config.plate.thickness],
    }
  })

  return result
}

export const updateFurnishingBaseType = (baseType, furnishingAssets) => {
  const difference = Config.plate.plinthHeight - Config.glider.height

  const result = furnishingAssets.map((asset) => ({
    ...asset,
    position: [
      asset.position[0],
      baseType === Config.baseType.gliders
        ? asset.position[1] - difference
        : asset.position[1] + difference,
      asset.position[2],
    ],
  }))

  return result
}
