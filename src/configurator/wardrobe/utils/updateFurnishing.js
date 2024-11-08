import Config from "../../config"
import { getDefaultScale, getPosZAvailable } from "./draggingInfo"

export const updateFurnishing = (elementsWidths, depth, furnishingAssets) => {
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

  const updatedFurnishingAsset = furnishingAssets.map((asset) => {
    const defaultScale = getDefaultScale(asset.type, asset.scale[1], depth)
    const xIndex = asset.inDivider ? asset.d_xIndex : asset.xIndex
    const width = elementsWidths[xIndex]

    const position = [
      asset.inDivider ? asset.position[0] : elementsXInfo[xIndex],
      asset.position[1],
      getPosZAvailable(asset.type, depth),
    ]

    let scale
    if (asset.inDivider || asset.type === Config.furnishing.type.divider) {
      scale = [
        asset.scale[0],
        asset.type === Config.furnishing.type.divider
          ? asset.scale[1]
          : defaultScale[1],
        defaultScale[2],
      ]
    } else {
      scale = [
        asset.type === Config.furnishing.type.shelf ||
          asset.type === Config.furnishing.type.foldBottom ||
          asset.type === Config.furnishing.type.glassBottom ||
          asset.type === Config.furnishing.type.pantsPullout
          ? width - Config.furnishing.default.spaceSides * 2
          : asset.type === Config.furnishing.type.drawer
            ? width - Config.furnishing.drawer.sideIncident * 2
            : asset.type === Config.furnishing.type.internalDrawer
              ? width -
              (Config.furnishing.internalDrawer.panelSpace +
                Config.furnishing.internalDrawer.panelWidth) *
              2
              : asset.type === Config.furnishing.type.clothesRail ||
                asset.type === Config.furnishing.type.clothesLift ||
                asset.type === Config.furnishing.type.slopingFloor ||
                asset.type === Config.furnishing.type.divider
                ? width
                : defaultScale[0],
        asset.type === Config.furnishing.type.divider
          ? asset.scale[1]
          : defaultScale[1],
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

  const result = doorAssets.map((asset) => {
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
