import { number } from "prop-types";
import Config from "../../config";

export const getArrayIndex = (
  assets,
  xIndex,
  yPos,
  inDivider,
  d_xIndex,
  d_yPos
) => {
  return assets.findIndex((asset) => {
    const condition =
      (!inDivider &&
        asset.inDivider === false &&
        asset.xIndex === xIndex &&
        asset.position[1] === yPos) ||
      (inDivider &&
        asset.inDivider === true &&
        asset.xIndex === xIndex &&
        asset.position[1] === yPos &&
        asset.d_xIndex === d_xIndex &&
        asset.d_yPos === d_yPos);

    return condition;
  });
};

export const getMaxHeight = (posY, scaleY, type) => {
  if (
    type === Config.furnishing.type.shelf ||
    type === Config.furnishing.type.glassBottom
  ) {
    return (
      posY -
      scaleY / 2 +
      Config.furnishing.shelf.interval +
      Config.plate.thickness
    );
  } else if (type === Config.furnishing.type.drawer) {
    return (
      posY +
      scaleY / 2 +
      Config.furnishing.drawer.topShelfDistance +
      Config.plate.thickness
    );
  } else if (type === Config.furnishing.type.internalDrawer) {
    return (
      posY +
      scaleY / 2 +
      Config.furnishing.internalDrawer.topShelfDistance +
      Config.plate.thickness
    );
  } else if (type === Config.furnishing.type.clothesRail) {
    return posY + scaleY / 2 + Config.furnishing.clothesRail.topSpace;
  } else if (type === Config.furnishing.type.clothesLift) {
    return posY + scaleY / 2 + Config.furnishing.clothesLift.topSpace;
  }

  return (
    posY +
    scaleY / 2 +
    Config.furnishing.default.interval +
    Config.plate.thickness
  );
};

const getMaxDepth = (type) => {
  if (type === Config.furnishing.type.pantsPullout)
    return (
      Config.furnishing.pantsPullout.availableDepth +
      Config.plate.backIncident +
      Config.plate.backThickness +
      Config.furnishing.default.spaceFront
    );
  else if (type === Config.furnishing.type.clothesLift)
    return (
      Config.furnishing.clothesLift.availableDepth +
      Config.plate.backIncident +
      Config.plate.backThickness
    );
  else if (type === Config.furnishing.type.slopingFloor)
    return (
      Config.furnishing.slopingFloor.availableDepth +
      Config.plate.backIncident +
      Config.plate.backThickness
    );

  return Config.plate.minDepth;
};

export const getMaxVariables = (assets) => {
  let maxHeight = 0;
  let maxDepth = 0;

  assets.forEach((asset) => {
    const tempMaxHeight = getMaxHeight(
      asset.position[1],
      asset.scale[1],
      asset.type
    );
    const tempMaxDepth = getMaxDepth(asset.type);

    maxHeight = Math.max(maxHeight, tempMaxHeight);
    maxDepth = Math.max(maxDepth, tempMaxDepth);
  });

  return { maxHeight, maxDepth };
};

export const getInternalDrawerSides = (assets) => {
  const result = [];

  // assets.map((xAssets, xIndex) => {
  //   result[xIndex] = []
  //   const sideData = {}
  //   let isSequential = false
  //   const tempAssets = [...xAssets]
  //   tempAssets
  //     .sort((a, b) => a.position[1] - b.position[1])
  //     .map((asset, yIndex) => {
  //       if (
  //         asset.type !== Config.furnishing.type.internalDrawer ||
  //         asset.bottomVisible === true
  //       ) {
  //         if (isSequential && sideData.stopYIndex !== undefined) {
  //           result[xIndex].push({ ...sideData })
  //           for (const key in sideData) {
  //             delete sideData[key]
  //           }
  //         }
  //         isSequential = false
  //       }

  //       if (asset.type === Config.furnishing.type.internalDrawer) {
  //         if (!isSequential && asset.topVisible === false) {
  //           isSequential = true
  //           sideData.startPosY = asset.position[1]
  //           sideData.startYIndex = yIndex
  //         } else if (isSequential && asset.bottomVisible === false) {
  //           sideData.stopPosY = asset.position[1]
  //           sideData.stopYIndex = yIndex
  //         }
  //       }

  //       if (yIndex === xAssets.length - 1 && sideData.stopYIndex === yIndex) {
  //         result[xIndex].push({ ...sideData })
  //       }
  //     })
  // })

  return result;
};

export const calculateSidesPanelInfo = (
  baseType,
  elementsWidths,
  height,
  depth
) => {
  const result = [];
  for (let index = 0; index < elementsWidths.length + 1; index++) {
    const isFirstPanel = index === 0;
    const isLastPanel = index === elementsWidths.length;

    let pos, size;
    if (baseType === Config.baseType.panel) {
      if (isFirstPanel) {
        pos = [Config.plate.thickness / 2, height / 2, depth / 2];
        size = [Config.plate.thickness, height, depth];
      } else if (!isLastPanel) {
        const prevPanel = result[index - 1];
        pos = [
          prevPanel.pos[0] + elementsWidths[index - 1] + Config.plate.thickness,
          height / 2 +
            Config.plate.plinthHeight / 2 +
            Config.plate.thickness / 2,
          depth / 2,
        ];
        size = [
          Config.plate.thickness,
          height - Config.plate.plinthHeight - Config.plate.thickness,
          depth,
        ];
      } else {
        const prevPanel = result[index - 1];
        pos = [
          prevPanel.pos[0] + elementsWidths[index - 1] + Config.plate.thickness,
          height / 2,
          depth / 2,
        ];
        size = [Config.plate.thickness, height, depth];
      }
    } else if (baseType === Config.baseType.gliders) {
      if (isFirstPanel) {
        pos = [
          Config.plate.thickness / 2,
          height / 2 + Config.glider.height / 2,
          depth / 2,
        ];
        size = [Config.plate.thickness, height - Config.glider.height, depth];
      } else if (!isLastPanel) {
        const prevPanel = result[index - 1];
        pos = [
          prevPanel.pos[0] + elementsWidths[index - 1] + Config.plate.thickness,
          height / 2 + Config.glider.height / 2 + Config.plate.thickness / 2,
          depth / 2,
        ];
        size = [
          Config.plate.thickness,
          height - Config.glider.height - Config.plate.thickness,
          depth,
        ];
      } else {
        const prevPanel = result[index - 1];
        pos = [
          prevPanel.pos[0] + elementsWidths[index - 1] + Config.plate.thickness,
          height / 2 + Config.glider.height / 2,
          depth / 2,
        ];
        size = [Config.plate.thickness, height - Config.glider.height, depth];
      }
    }
    result.push({ pos, size });
  }
  return result;
};

export const calculateAboveFloorInfo = (elementsWidths, height, depth, korpusType) => {
  const result = [];
  if (korpusType === Config.korpusType.empty) {
    let cumulativeWidth = Config.plate.thickness / 2;
  
    elementsWidths.forEach((width) => {
      const xPos = cumulativeWidth + Config.plate.thickness / 2 + width / 2;
      result.push({
        size: [width, Config.plate.thickness, depth],
        pos: [xPos, height - Config.plate.thickness / 2, depth / 2],
      });
      cumulativeWidth += width + Config.plate.thickness;
    });
  } else {
    let totalWidth = 0;
    let totalDepth = depth;
    elementsWidths.forEach((width) => {
      totalWidth += width + Config.plate.thickness;
    })
    totalWidth += Config.plate.thickness;
    if (korpusType === Config.korpusType.outerShap) {
      result.push({
        size: [totalWidth, Config.plate.thickness, depth],
        pos: [totalWidth / 2, height - Config.plate.thickness / 2, depth / 2],
      });
    }
    if (korpusType === Config.korpusType.innerShap || korpusType === Config.korpusType.innerShap2
      || korpusType ===Config.korpusType.topShap || korpusType === Config.korpusType.uShap
    ) {
      totalDepth += Config.plate.thickness;
      result.push({
        size: [totalWidth, Config.plate.thickness, totalDepth],
        pos: [totalWidth / 2, height - Config.plate.thickness / 2, totalDepth / 2],
      });
    }
  }

  // console.log(result)

  return result;
};

export const calculateBackPanelInfo = (elementsWidths, height, baseType) => {
  const result = [];
  let accumulatedXPos = Config.plate.thickness + elementsWidths[0] / 2;
  elementsWidths.forEach((width, index) => {
    if (index !== 0)
      accumulatedXPos +=
        elementsWidths[index - 1] / 2 + width / 2 + Config.plate.thickness;

    result.push({
      size: [
        width + Config.plate.backOverlapping * 2,
        height -
          (baseType === Config.baseType.panel
            ? Config.plate.plinthHeight
            : Config.glider.height) -
          Config.plate.thickness * 2 +
          Config.plate.backOverlapping * 2,
        Config.plate.backThickness,
      ],
      pos: [
        accumulatedXPos,
        height / 2 +
          (baseType === Config.baseType.panel
            ? Config.plate.plinthHeight
            : Config.glider.height) /
            2,
        Config.plate.backIncident + Config.plate.backThickness / 2,
      ],
    });
  });
  return result;
};

export const calculatePlinthXInfo = (elementsWidths) => {
  let accumulatedWidth = 0;
  let finalXPos = Config.plate.thickness;
  const result = [];
  for (let i = 0; i < elementsWidths.length; i++) {
    accumulatedWidth =
      accumulatedWidth + elementsWidths[i] + Config.plate.thickness;

    if (accumulatedWidth > Config.plate.plinthMaxWidth) {
      result.push({
        width: accumulatedWidth - elementsWidths[i] - Config.plate.thickness,
        xPos:
          finalXPos +
          (accumulatedWidth - elementsWidths[i] - Config.plate.thickness) / 2,
      });

      finalXPos =
        finalXPos +
        accumulatedWidth -
        elementsWidths[i] -
        Config.plate.thickness;

      accumulatedWidth = elementsWidths[i] + Config.plate.thickness;
    }
  }

  result.push({
    width: accumulatedWidth - Config.plate.thickness,
    xPos: finalXPos + (accumulatedWidth - Config.plate.thickness) / 2,
  });

  return result;
};

export const calculateGlidersPosXInfo = (elementsWidths) => {
  const result = [];
  let prevXPos = 0;

  elementsWidths.forEach((width, index) => {
    if (index === 0) {
      // left glider
      result.push(Config.plate.thickness + Config.glider.radius);
      prevXPos =
        Config.plate.thickness + elementsWidths[0] + Config.plate.thickness / 2;

      // second glider
      result.push(prevXPos);

      // center glider
      if (elementsWidths[0] > Config.plate.maxDoorLength) {
        result.push(Config.plate.thickness + elementsWidths[0] / 2);
      }
    } else if (index === elementsWidths.length - 1) {
      // right glider
      result.push(width - Config.plate.thickness - Config.glider.radius);

      if (width > Config.plate.maxDoorLength) {
        result.push(width - Config.plate.thickness - width / 2);
      }
    } else {
      // need center glider if we have double door
      if (width > Config.plate.maxDoorLength) {
        result.push(prevXPos + Config.plate.thickness / 2 + width / 2);
      }

      // middlesides glider
      prevXPos += width + Config.plate.thickness;
      result.push(prevXPos);
    }
  });

  return result;
};

export const getDrawerPlateScale = (scale) => {
  return {
    left_right: [Config.furnishing.drawer.thickness, scale[1], scale[2]],
    bottom: [
      scale[0] -
        2 *
          (Config.furnishing.drawer.thickness -
            Config.furnishing.drawer.bottomOverlapping),
      Config.furnishing.drawer.thickness,
      scale[2],
    ],
    back: [
      scale[0] - 2 * Config.furnishing.drawer.thickness,
      scale[1] -
        Config.furnishing.drawer.bottomIncident -
        Config.furnishing.drawer.thickness -
        Config.furnishing.drawer.backHeightDifference,
      Config.furnishing.drawer.thickness,
    ],
  };
};

const getOuterDrawerScaleX = (scale, elementIndex, korpusType) => {
  let tempX =
    scale[0] +
    Config.furnishing.drawer.sideIncident * 2 +
    Config.plate.thickness -
    Config.furnishing.default.frontInterval * 2;

  if (
    (elementIndex === Config.elementIndex.first ||
      elementIndex === Config.elementIndex.last) &&
    (korpusType === Config.korpusType.uShap ||
      korpusType === Config.korpusType.innerShap)
  ) {
    tempX -= 0.95;
    return tempX;
  }
  if (
    (elementIndex === Config.elementIndex.first ||
      elementIndex === Config.elementIndex.last) &&
    korpusType === Config.korpusType.innerShap2
  ) {
    tempX -= 1.9;
    return tempX;
  }
  if (
    elementIndex === Config.elementIndex.middle &&
    korpusType === Config.korpusType.innerShap2
  ) {
    tempX -= 1.9;
    return tempX;
  }
  if (
    elementIndex === Config.elementIndex.first ||
    elementIndex === Config.elementIndex.last
  ) {
    tempX += 0.95;
  }
  return tempX;
};

const getOuterDrawerScaleY = (
  scale,
  topShelfDistance,
  korpusType,
  topVisible,
  bottomVisible,
  topAsset,
  bottomAsset
) => {
  let tempY =
    scale[1] +
    topShelfDistance +
    Config.furnishing.drawer.bottomShelfDistance +
    2 * Config.furnishing.default.shelfOverlapping;
    // console.log(topVisible, topAsset)
  if ( (korpusType === Config.korpusType.empty || korpusType === Config.korpusType.outerShap) && topVisible === false ) {
    if(topAsset !== Config.furnishing.type.drawer)
      return tempY += 0.95
  }
  if ( (korpusType === Config.korpusType.empty || korpusType === Config.korpusType.outerShap ||
    korpusType === Config.korpusType.topShap || korpusType === Config.korpusType.uShap
  ) && bottomVisible === false) {
    if(bottomAsset !== Config.furnishing.type.drawer)
      return tempY += 0.95
  }
  if (
    korpusType === Config.korpusType.topShap ||
    korpusType === Config.korpusType.uShap ||
    korpusType === Config.korpusType.innerShap ||
    korpusType === Config.korpusType.innerShap2
  ) {
    if (korpusType === Config.korpusType.innerShap2) {
      return (tempY -= 1.9);
    }
    if (topAsset !== Config.furnishing.type.drawer && topVisible === false) {
      return (tempY -= 0.95);
    }
  }

  if (
    korpusType === Config.korpusType.innerShap ||
    korpusType === Config.korpusType.innerShap2
  ) {
    if (korpusType === Config.korpusType.innerShap2) {
      return (tempY -= 1.9);
    }
    if (
      bottomAsset !== Config.furnishing.type.drawer &&
      bottomVisible === false
    ) {
      return (tempY -= 0.95);
    }
  }

  return tempY;
};

export const getOuterDrawerScale = (
  scale,
  depth,
  elementIndex,
  topShelfDistance,
  korpusType,
  topVisible,
  bottomVisible,
  topAsset,
  bottomAsset
) => {
  return {
    top: [
      scale[0] + Config.furnishing.drawer.sideIncident * 2,
      Config.furnishing.shelf.thickness1,
      depth -
        Config.plate.backThickness -
        Config.plate.backIncident +
        (korpusType === Config.korpusType.innerShap2 ? 1.9 : 0),
    ],
    bottom: [
      scale[0] + Config.furnishing.drawer.sideIncident * 2,
      Config.furnishing.shelf.thickness1,
      depth -
        Config.plate.backThickness -
        Config.plate.backIncident +
        (korpusType === Config.korpusType.innerShap2 ? 1.9 : 0),
    ],
    front: [
      getOuterDrawerScaleX(scale, elementIndex, korpusType),

      getOuterDrawerScaleY(
        scale,
        topShelfDistance,
        korpusType,
        topVisible,
        bottomVisible,
        topAsset,
        bottomAsset
      ),

      Config.furnishing.drawer.frontThickness,
    ],
  };
};

export const getInternalDrawerScale = (scale, depth) => {
  return {
    side: [
      Config.furnishing.internalDrawer.panelWidth,
      scale[1] + Config.furnishing.internalDrawer.bottomShelfDistance,
      depth -
        Config.plate.backThickness -
        Config.plate.backIncident -
        Config.furnishing.internalDrawer.frontInnerSpace,
    ],
    top: [
      scale[0] +
        Config.furnishing.internalDrawer.panelSpace * 2 +
        Config.furnishing.internalDrawer.panelWidth * 2,
      Config.furnishing.shelf.thickness1,
      depth -
        Config.plate.backThickness -
        Config.plate.backIncident -
        Config.furnishing.internalDrawer.frontInnerSpace,
    ],
    bottom: [
      scale[0] +
        Config.furnishing.internalDrawer.panelSpace * 2 +
        Config.furnishing.internalDrawer.panelWidth * 2,
      Config.furnishing.shelf.thickness1,
      depth -
        Config.plate.backThickness -
        Config.plate.backIncident -
        Config.furnishing.internalDrawer.frontInnerSpace,
    ],
    front: [
      scale[0] +
        Config.furnishing.internalDrawer.panelSpace * 2 -
        Config.furnishing.internalDrawer.frontSpace * 2,
      scale[1] +
        Config.furnishing.internalDrawer.bottomShelfDistance -
        Config.furnishing.internalDrawer.frontSpace,
      Config.plate.thickness,
    ],
  };
};

export const calculatePlatesInfo = (
  sidespanelinfo,
  aboveFloorInfo,
  backPanelInfo,
  plinthInfo,
  width,
  depth,
  korpusType
) => {
  const result = [];

  sidespanelinfo.forEach((info, index) => {
    if (index === 0 || index === sidespanelinfo.length - 1) {
      result.push({
        color: "White",
        id: "Side",
        length: info.size[1],
        depth: info.size[2],
        thickness: info.size[0],
      });
    } else {
      result.push({
        color: "White",
        id: "Middle-Side",
        length: info.size[1],
        depth: info.size[2],
        thickness: info.size[0],
      });
    }
  });

  aboveFloorInfo.forEach((info) => {
    result.push({
      color: "White",
      id: "Floor-Top",
      length: info.size[0],
      depth: info.size[2],
      thickness: info.size[1],
    });
  });
  

  backPanelInfo.forEach((info) => {
    result.push({
      color: "White",
      id: "Back-Plate",
      length: info.size[1],
      depth: info.size[0],
      thickness: info.size[2],
    });
  });

  plinthInfo.forEach((info) => {
    result.push({
      color: "White",
      id: "Plinth",
      length: info.width,
      depth: Config.plate.plinthHeight,
      thickness: Config.plate.thickness,
    });

    result.push({
      color: "White",
      id: "Floor-Bottom",
      length: info.width,
      depth: depth,
      thickness: Config.plate.thickness,
    });
  });

  // console.log(result)
  return result;
};

// get door size
export const getDoorWidth = (width, elementIndex, korpusType) => {
  let tempWidth = width;
  if (elementIndex === Config.elementIndex.first) {
    tempWidth +=
      Config.plate.thickness - Config.furnishing.default.frontInterval;
  } else {
    tempWidth += Config.furnishing.default.shelfOverlapping;
  }

  if (elementIndex === Config.elementIndex.last) {
    tempWidth +=
      Config.plate.thickness - Config.furnishing.default.frontInterval;
  } else {
    tempWidth += Config.furnishing.default.shelfOverlapping;
  }

  if (
    korpusType === Config.korpusType.uShap ||
    korpusType === Config.korpusType.innerShap
  ) {
    if (
      elementIndex === Config.elementIndex.first ||
      elementIndex === Config.elementIndex.last
    )
      tempWidth -= 1.9;
  }

  if (korpusType === Config.korpusType.innerShap2) {
    if (
      elementIndex === Config.elementIndex.first ||
      elementIndex === Config.elementIndex.last
    )
      tempWidth -= 0.95;

    tempWidth -= 1.9;
  }

  return tempWidth;
};

export const getDoorHeight = (height, topAsset, bottomAsset, korpusType) => {
  let temp = height;
  if (topAsset === "none") {
    temp += Config.plate.thickness - Config.furnishing.default.frontInterval;
  } else {
    temp += Config.furnishing.default.shelfOverlapping;
  }

  // stretch to the bottom
  if (bottomAsset === "none") {
    temp += Config.plate.thickness - Config.furnishing.default.frontInterval;
  } else {
    temp += Config.furnishing.default.shelfOverlapping;
  }

  if (
    korpusType === Config.korpusType.topShap ||
    korpusType === Config.korpusType.uShap
  ) {
    if (topAsset === "none") {
      temp -= 1.9;
    }
  }
  if (
    korpusType === Config.korpusType.innerShap ||
    korpusType === Config.korpusType.innerShap2
  ) {
    if (
      topAsset === Config.furnishing.type.drawer &&
      bottomAsset === Config.furnishing.type.drawer
    ) {
      temp = temp;
    }
    if (topAsset === "none" && bottomAsset === "none") {
      temp -= 1.9;
    }
    if (topAsset === "none" || bottomAsset === "none") {
      temp -= 1.9;
    }
  }
  if (korpusType === Config.korpusType.innerShap2) {
    if (
      topAsset === Config.furnishing.type.foldBottom ||
      topAsset === Config.furnishing.type.drawer
    ) {
      temp -= 0.95;
    }
    if (
      bottomAsset === Config.furnishing.type.foldBottom ||
      bottomAsset === Config.furnishing.type.drawer
    ) {
      temp -= 0.95;
    }
  }
  return temp;
};

export const getDoorPositionX = (
  door_type,
  posX,
  posY,
  width,
  korpusType,
  elementIndex
) => {
  let temp = width / 2;
  if (door_type === Config.door.type.revolving_right) temp = -width / 2;
  if (
    korpusType === Config.korpusType.uShap ||
    korpusType === Config.korpusType.innerShap
  ) {
    if (elementIndex === Config.elementIndex.first) {
      temp += 0.95;
    } else if (elementIndex == Config.elementIndex.last) {
      temp -= 0.95;
    }
  }
  if (korpusType === Config.korpusType.innerShap2) {
    if (elementIndex === Config.elementIndex.first) {
      temp += 0.475;
    }
    if (elementIndex === Config.elementIndex.last) {
      temp -= 0.475;
    }
  }
  return temp;
};

export const getDoorPositionY = (
  door_type,
  posX,
  posY,
  korpusType,
  topAsset,
  bottomAsset
) => {
  let temp = 0;
  if (
    korpusType === Config.korpusType.topShap ||
    korpusType === Config.korpusType.uShap
  ) {
    if (topAsset === "none") {
      temp -= 0.95;
    }
  }
  if (korpusType === Config.korpusType.innerShap) {
    if (topAsset === "none" && bottomAsset === "none") {
      temp = 0;
      return temp;
    }
    if (topAsset === "none") {
      temp -= 0.95;
    } else if (bottomAsset === "none") {
      temp += 0.95;
    }
  }
  if (korpusType === Config.korpusType.innerShap2) {
    if (
      topAsset === Config.furnishing.type.foldBottom ||
      topAsset === Config.furnishing.type.drawer
    ) {
      temp += 0.475;
    }
    if (
      bottomAsset === Config.furnishing.type.foldBottom ||
      bottomAsset === Config.furnishing.type.drawer
    ) {
      temp -= 0.475;
    }
    // if ( topAsset === Config.furnishing.type.drawer) {
    //   temp += 0.95
    // }
    // if ( bottomAsset === Config.furnishing.type.drawer) {
    //   temp -= 0.95
    // }
  }
  return temp;
};

// flap size

export const getFlapWidth = (width, elementIndex, korpusType) => {
  let tempWidth = width;
  if (elementIndex === Config.elementIndex.first) {
    tempWidth +=
      Config.plate.thickness - Config.furnishing.default.frontInterval;
  } else {
    tempWidth += Config.furnishing.default.shelfOverlapping;
  }

  if (elementIndex === Config.elementIndex.last) {
    tempWidth +=
      Config.plate.thickness - Config.furnishing.default.frontInterval;
  } else {
    tempWidth += Config.furnishing.default.shelfOverlapping;
  }

  if (
    korpusType === Config.korpusType.uShap ||
    korpusType === Config.korpusType.innerShap
  ) {
    if (
      elementIndex === Config.elementIndex.first ||
      elementIndex === Config.elementIndex.last
    )
      tempWidth -= 1.9;
  }

  if (korpusType === Config.korpusType.innerShap2) {
    if (
      elementIndex === Config.elementIndex.first ||
      elementIndex === Config.elementIndex.last
    )
      tempWidth -= 0.95;

    tempWidth -= 1.9;
  }

  return tempWidth;
};

export const getFlapPositionX = (
  door_type,
  posX,
  posY,
  width,
  korpusType,
  elementIndex
) => {
  let temp = 0;
  if ( korpusType === Config.korpusType.empty || korpusType === Config.korpusType.outerShap || korpusType === Config.korpusType.topShap) {
    if (elementIndex === Config.elementIndex.first) {
      temp -= 0.475;
    } else if (elementIndex == Config.elementIndex.last) {
      temp += 0.475;
    }
  }
  if (
    korpusType === Config.korpusType.uShap ||
    korpusType === Config.korpusType.innerShap
  ) {
    if (elementIndex === Config.elementIndex.first) {
      temp += 0.475;
    } else if (elementIndex == Config.elementIndex.last) {
      temp -= 0.475;
    }
  }
  // if (korpusType === Config.korpusType.innerShap2) {
  //   if (elementIndex === Config.elementIndex.first) {
  //     temp += 0.475;
  //   }
  //   if (elementIndex === Config.elementIndex.last) {
  //     temp -= 0.475;
  //   }
  // }
  return temp;
};

export const getFlapPositionY = (
  door_type,
  posX,
  posY,
  korpusType,
  topAsset,
  bottomAsset
) => {
  let temp = 0;
  if ( (korpusType === Config.korpusType.empty || korpusType === Config.korpusType.outerShap)) {
    if (topAsset === "none")
      temp += 0.475
    if (bottomAsset === "none")
      temp -= 0.457
  }
  if (
    korpusType === Config.korpusType.topShap ||
    korpusType === Config.korpusType.uShap
  ) {
    if (topAsset === "none" || bottomAsset === "none") {
      temp -= 0.475;
    }
  }
  if (korpusType === Config.korpusType.innerShap) {
    if (topAsset === "none" && bottomAsset === "none") {
      temp = 0;
      return temp;
    }
    if (topAsset === "none") {
      temp -= 0.475;
    } else if (bottomAsset === "none") {
      temp += 0.475;
    }
  }
  // if (korpusType === Config.korpusType.innerShap2) {
  //   if (
  //     topAsset === Config.furnishing.type.foldBottom ||
  //     topAsset === Config.furnishing.type.drawer
  //   ) {
  //     temp += 0.475;
  //   }
  //   if (
  //     bottomAsset === Config.furnishing.type.foldBottom ||
  //     bottomAsset === Config.furnishing.type.drawer
  //   ) {
  //     temp -= 0.475;
  //   }
  // }
  return temp;
};

// get handle size
export const getHandleInfo = (handle, index, handleListIndex) => {
  let handleInfo = {}
  const tempstandardHeight =Number(handle[index]?.handle?.standardHeight)
  const tempminHeight = Number(handle[index]?.handle?.minHeight)
  const tempminLength = Number(handle[index]?.handle?.minLength) 
  const temphorizontalX = Number(handle[index]?.handle?.horizontal?.handleX)
  const temphorizontalY = Number(handle[index]?.handle?.horizontal?.handleY)
  const tempverticalX = Number(handle[index]?.handle?.vertical?.handleX)
  const tempverticalY = Number(handle[index]?.handle?.vertical?.handleY)
  handleInfo.xOffset = Number(handle[index]?.xOffset)
  handleInfo.yOffset = Number(handle[index]?.yOffset)
  handleInfo.zOffset = Number(handle[index]?.zOffset)
  handleInfo.gltf = handleListIndex === -1 ? handle[index]?.gltf : handle[index]?.list[handleListIndex]?.gltf 
  handleInfo.minHeight = tempminHeight === 0 ? 40 : tempminHeight
  handleInfo.minLength = tempminLength === 0 ? 30 : tempminLength
  handleInfo.horizontalX = temphorizontalX === 0 || temphorizontalX < 8 ? 15 : temphorizontalX
  handleInfo.horizontalY = temphorizontalY === 0 ? 10 : temphorizontalY
  handleInfo.verticalX = tempverticalX === 0 ? 10 : temphorizontalX 
  handleInfo.verticalY = tempverticalY === 0 ? 15 : temphorizontalY
  handleInfo.standardHeight = tempstandardHeight === 0 ? 140 : tempstandardHeight
  return handleInfo
}

// get handle side
export const getHandleSide = (position, scale, handleInfo, handleDirection) => {

  let side = 0
  if (position && scale) {
    const standardHeight = handleInfo.standardHeight
    const verticalY = handleInfo.verticalY
    const horizontalY = handleInfo.horizontalY
    const point = position[1]
    const height = scale[1]
    // console.log(standardHeight, point, height, handleDirection)
    if (point > standardHeight-10 && (point - height/2) > standardHeight-10 ) {
      if(handleDirection === "V"){
        side += verticalY
      } else {
        side += horizontalY
      }
      side -= height/2
      return side
    }
    if (point < standardHeight+10 && (point + height/2) < standardHeight+10) {
      if(handleDirection === "V") {
        side -= verticalY
      } else {
        side -= horizontalY
      }
      side += height/2
      return side
    }
    side += (standardHeight - point)
    return side
  }
  

  return side
}

//get feet info
export const getFeetInfo =(feet, width, index, feetListIndex) => {
  let feetInfo = {};
  feetInfo.addFeet = Number(feet[index]?.feet?.addFeet)
  feetInfo.backFeetX = Number(feet[index]?.feet?.backFeetX )
  feetInfo.backFeetZ = Number(feet[index]?.feet?.backFeetZ )
  feetInfo.feetHeight = Number(feet[index]?.feet?.feetHeight)
  feetInfo.frontFeetX = Number(feet[index]?.feet?.frontFeetX)
  feetInfo.frontFeetZ = Number(feet[index]?.feet?.frontFeetZ)
  feetInfo.middleOffset = Number(feet[index]?.feet?.middleOffset)
  feetInfo.xOffset = Number(feet[index]?.xOffset)
  feetInfo.yOffset = Number(feet[index]?.yOffset)
  feetInfo.zOffset = Number(feet[index]?.zOffset)
  feetInfo.offSet = Number(feet[index]?.offSet)
  feetInfo.gltf = feetListIndex === -1 ? feet[index]?.gltf : feet[index]?.list[feetListIndex]?.gltf
  feetInfo.middleFeetCount = feetInfo.addFeet !== 0 ? Math.round((width - feetInfo.frontFeetX - feetInfo.backFeetX)/feetInfo.addFeet) - 1 : Math.round((width - feetInfo.frontFeetX - feetInfo.backFeetX)/50)
  feetInfo.middleGap = Math.round((width - feetInfo.frontFeetX - feetInfo.backFeetX)/(feetInfo.middleFeetCount+1))
  return feetInfo
}

// get divider info

export const getDividerHeight = () => {
  
}
