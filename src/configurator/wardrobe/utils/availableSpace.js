import Config from "../../config"

import useDimensionStore from "../zustand/dimensionStore";

const getThickness = (type, drawerHeight, drawerTopDistance, depth) => {
  return type === Config.furnishing.type.shelf ||
    type === Config.furnishing.type.foldBottom ||
    type === Config.furnishing.type.pantsPullout
    ? Config.furnishing.shelf.thickness1
    : type === Config.furnishing.type.glassBottom
      ? Config.furnishing.glassBottom.thickness
      : type === Config.furnishing.type.drawer
        ? drawerHeight +
        drawerTopDistance +
        Config.furnishing.drawer.bottomShelfDistance +
        Config.furnishing.shelf.thickness1 * 2
        : type === Config.furnishing.type.internalDrawer
          ? drawerHeight +
          Config.furnishing.internalDrawer.topShelfDistance +
          Config.furnishing.internalDrawer.bottomShelfDistance +
          Config.furnishing.shelf.thickness1 * 2
          : type === Config.furnishing.type.clothesRail
            ? Config.furnishing.clothesRail.defaultHeight
            : type === Config.furnishing.type.clothesLift
              ? Config.furnishing.clothesLift.defaultHeight
              : type === Config.furnishing.type.slopingFloor
                ? (Config.furnishing.slopingFloor.wallHeight +
                  Config.furnishing.slopingFloor.thickness) *
                Math.cos(Config.furnishing.slopingFloor.angle) +
                (depth -
                  2 * Config.furnishing.slopingFloor.zIncident -
                  (Config.furnishing.slopingFloor.wallHeight +
                    Config.furnishing.slopingFloor.thickness) *
                  Math.sin(Config.furnishing.slopingFloor.angle)) *
                Math.tan(Config.furnishing.slopingFloor.angle)
                : Config.furnishing.shelf.thickness1
}

export const getTop = (positionY, scaleY, type) => {
  let top = positionY - scaleY / 2

  if (type === Config.furnishing.type.drawer) {
    top -=
      Config.furnishing.drawer.bottomShelfDistance +
      Config.furnishing.shelf.thickness1
  } else if (type === Config.furnishing.type.internalDrawer) {
    top -=
      Config.furnishing.internalDrawer.bottomShelfDistance +
      Config.furnishing.shelf.thickness1
  } else if (type === Config.furnishing.type.clothesRail) {
    top =
      top +
      scaleY +
      Config.furnishing.clothesRail.topSpace -
      Config.furnishing.clothesRail.availableSpace
  } else if (type === Config.furnishing.type.clothesLift) {
    top =
      top +
      scaleY +
      Config.furnishing.clothesLift.topSpace -
      Config.furnishing.clothesLift.availableSpace
  } else if (type === Config.furnishing.type.pantsPullout) {
    top = top - Config.furnishing.pantsPullout.availableSpace
  } else if (type === Config.furnishing.type.slopingFloor) {
    top = top + scaleY / 2
  } else if (type === Config.furnishing.type.door) {
    top -= Config.furnishing.shelf.thickness1
  }

  return top
}

export const getBottom = (positionY, scaleY, type, topShelfDistance) => {
  let bottom = positionY + scaleY / 2

  if (type === Config.furnishing.type.drawer) {
    bottom += topShelfDistance + Config.furnishing.shelf.thickness1
  } else if (type === Config.furnishing.type.internalDrawer) {
    bottom +=
      Config.furnishing.internalDrawer.topShelfDistance +
      Config.furnishing.shelf.thickness1
  } else if (type === Config.furnishing.type.clothesRail) {
    bottom += Config.furnishing.clothesRail.topSpace
  } else if (type === Config.furnishing.type.clothesLift) {
    bottom += Config.furnishing.clothesLift.topSpace
  } else if (type === Config.furnishing.type.slopingFloor) {
    bottom += scaleY / 2
  } else if (type === Config.furnishing.type.door) {
    bottom += Config.furnishing.shelf.thickness1
  }

  return bottom;
}

const getSpace = ({
  result,
  elementsXInfo,
  elementsWidths,
  elementsTop,
  elementsBottom,
  type,
  drag_thickness,
  original_assets,
  depth,
  inDivider,
  d_xIndex,
  d_yPos,
  korpusMaterial,
  doorCategory,
  hanging,
  withFeet,
  withOutFeet
}) => {
  const { shelf, glassBottom, drawer, internalDrawer, clothesRail, clothesLift, pantsPullout, door, flap, divider, foldBottom } = Config.furnishing.type;
  const assets = [];
  original_assets?.forEach((origin) => {
    if (!assets[origin.xIndex]) assets[origin.xIndex] = [];
    assets[origin.xIndex].push(origin);
  });

  const drag_type = (() => {
    switch (type) {
      case shelf:
      case glassBottom: return shelf;
      case drawer:
      case internalDrawer: return drawer;
      case clothesRail: return clothesRail;
      case clothesLift: return clothesLift;
      case pantsPullout: return pantsPullout;
      case divider: return divider;
      case door: return door;
      case flap: return flap;
      default: return "Other";
    }
  })();


  for (let i = 0; i < elementsXInfo.length; i++) {
    if (assets[i] === undefined || assets[i].length === 0) {
      let tempSpace = {
        width: elementsWidths[i],
        top:
          elementsTop -
          (drag_type === shelf
            ? Config.furnishing.shelf.interval
            : drag_type === drawer ||
              drag_type === divider ||
              drag_type === door
              ? drag_thickness
              : drag_type === clothesRail
                ? Config.furnishing.clothesRail.topSpace + 2 * drag_thickness
                : drag_type === clothesLift
                  ? Config.furnishing.clothesLift.topSpace + 2 * drag_thickness
                  : Config.furnishing.default.interval + drag_thickness) - 0,
        bottom: 
          elementsBottom +
          (drag_type === shelf
            ? Config.furnishing.shelf.interval - drag_thickness
            : drag_type === drawer ||
              drag_type === divider ||
              drag_type === door
              ? 0
              : drag_type === clothesRail
                ? Config.furnishing.clothesRail.availableSpace -
                drag_thickness -
                Config.furnishing.clothesRail.topSpace
                : drag_type === clothesLift
                  ? Config.furnishing.clothesLift.availableSpace -
                  drag_thickness -
                  Config.furnishing.clothesLift.topSpace
                  : drag_type === pantsPullout
                    ? Config.furnishing.pantsPullout.availableSpace
                    : Config.furnishing.default.interval) + 0,
        posX: elementsXInfo[i],
        posZ: depth + 0.5,
        topAsset: "none",
        bottomAsset: "none",
        availableTop: elementsTop,
        availableBottom: elementsBottom,
        inDivider,
        xIndex: i,
        d_xIndex,
        d_yPos,
      }
      // console.log(hanging, withFeet, withOutFeet)
      tempSpace.height = tempSpace.top + drag_thickness - tempSpace.bottom
      tempSpace.posY = (tempSpace.top + drag_thickness + tempSpace.bottom) / 2
      if (tempSpace.top > tempSpace.bottom) {
        if (doorCategory !== flap) {
          if ((type === drawer || 
            type === shelf ||
            type === glassBottom ||
            type === foldBottom
          ) && (hanging || withFeet)) {
            tempSpace.bottom = tempSpace.bottom + 25
            tempSpace.top = tempSpace.top + 25
            result.push(tempSpace)
          } else {
            result.push(tempSpace)
          }
        }
      }
    } else {
      let top, bottom, availableTop, availableBottom

      for (let j = 0; j < assets[i].length; j++) {
        top = getTop(
          assets[i][j].position[1],
          assets[i][j].scale[1],
          assets[i][j].type
        )
        availableTop = top
        if (
          assets[i][j].type === clothesRail ||
          assets[i][j].type === clothesLift ||
          assets[i][j].type === pantsPullout
        ) {
          if (drag_type === clothesRail)
            top =
              top - Config.furnishing.clothesRail.topSpace - 2 * drag_thickness
          else if (drag_type === clothesLift)
            top =
              top - Config.furnishing.clothesLift.topSpace - 2 * drag_thickness
          else top = top - drag_thickness
        } else {
          switch (drag_type) {
            case shelf:
              top -= Config.furnishing.shelf.interval
              break
            case drawer:
              if (assets[i][j].type === shelf)
                top =
                  top -
                  Config.furnishing.shelf.interval +
                  Config.furnishing.shelf.thickness1 -
                  drag_thickness
              else if (
                assets[i][j].type === drawer ||
                assets[i][j].type === internalDrawer
              ) {
                if (
                  type === internalDrawer &&
                  assets[i][j].type === internalDrawer
                ) {
                  top =
                    top -
                    drag_thickness +
                    Config.furnishing.shelf.thickness1 +
                    Config.furnishing.internalDrawer.topShelfDistance
                } else if (
                  type === drawer &&
                  assets[i][j].type === drawer
                ) {
                  top =
                    top -
                    drag_thickness +
                    Config.furnishing.shelf.thickness1
                } else {
                  top = top - Config.furnishing.default.interval - drag_thickness
                }
              } else
                top = top - Config.furnishing.default.interval - drag_thickness
              break
            case clothesRail:
              top =
                top -
                Config.furnishing.clothesRail.topSpace -
                2 * drag_thickness
              break
            case clothesLift:
              top =
                top -
                Config.furnishing.clothesLift.topSpace -
                2 * drag_thickness
              break
            case divider:
              top = top - drag_thickness
              break
            case door:
              top = top - drag_thickness
              break
            case flap:
              top = top - Config.door.flap_height_range.min
              // top = top - drag_thickness
              break
            default:
              if (assets[i][j].type === shelf)
                top =
                  top -
                  Config.furnishing.shelf.interval +
                  assets[i][j].scale[1] -
                  drag_thickness
              else
                top = top - Config.furnishing.default.interval - drag_thickness
              break
          }
        }

        let bottomAsset
        if (j == 0) {
          bottom =
            elementsBottom +
            (drag_type === shelf
              ? Config.furnishing.shelf.interval - drag_thickness
              : drag_type === drawer ||
                drag_type === divider ||
                drag_type === door
                ? 0
                : drag_type === clothesRail
                  ? Config.furnishing.clothesRail.availableSpace -
                  Config.furnishing.clothesRail.topSpace -
                  drag_thickness
                  : drag_type === clothesLift
                    ? Config.furnishing.clothesLift.availableSpace -
                    Config.furnishing.clothesLift.topSpace -
                    drag_thickness
                    : drag_type === pantsPullout
                      ? Config.furnishing.pantsPullout.availableSpace
                      : flap
                        ? 0 : Config.furnishing.default.interval)

          availableBottom = elementsBottom
          bottomAsset = "none"
        } else {
          bottom = getBottom(
            assets[i][j - 1].position[1],
            assets[i][j - 1].scale[1],
            assets[i][j - 1].type,
            assets[i][j - 1].topShelfDistance
          )
          availableBottom = bottom

          if (
            assets[i][j - 1].type === clothesRail ||
            assets[i][j - 1].type === clothesLift
          ) {
            switch (drag_type) {
              case clothesRail:
                bottom =
                  bottom +
                  Config.furnishing.clothesRail.availableSpace -
                  Config.furnishing.clothesRail.topSpace -
                  drag_thickness
                break
              case clothesLift:
                bottom =
                  bottom +
                  Config.furnishing.clothesLift.availableSpace -
                  Config.furnishing.clothesLift.topSpace -
                  drag_thickness
                break
              case pantsPullout:
                bottom += Config.furnishing.pantsPullout.availableSpace
                break
              default:
                break
            }
          } else {
            switch (drag_type) {
              case shelf:
                bottom +=
                  Config.furnishing.shelf.interval -
                  Config.furnishing.shelf.thickness1
                break
              case drawer:
                if (
                  assets[i][j - 1].type === drawer ||
                  assets[i][j - 1].type ===
                  internalDrawer
                ) {
                  if (
                    type === internalDrawer &&
                    assets[i][j - 1].type ===
                    internalDrawer
                  ) {
                    bottom =
                      bottom -
                      Config.furnishing.shelf.thickness1 -
                      Config.furnishing.internalDrawer.topShelfDistance
                  } else if (
                    type === drawer &&
                    assets[i][j - 1].type === drawer
                  ) {
                    bottom = bottom - Config.furnishing.shelf.thickness1
                  } else {
                    bottom += Config.furnishing.default.interval
                  }
                } else if (
                  assets[i][j - 1].type === shelf
                )
                  bottom +=
                    Config.furnishing.shelf.interval -
                    Config.furnishing.shelf.thickness1
                else bottom += Config.furnishing.default.interval
                break
              case clothesRail:
                bottom =
                  bottom +
                  Config.furnishing.clothesRail.availableSpace -
                  Config.furnishing.clothesRail.topSpace -
                  drag_thickness
                break
              case clothesLift:
                bottom =
                  bottom +
                  Config.furnishing.clothesLift.availableSpace -
                  Config.furnishing.clothesLift.topSpace -
                  drag_thickness
                break
              case pantsPullout:
                bottom += Config.furnishing.pantsPullout.availableSpace
                break
              case divider:
                break
              case door:
                break
              case flap:
                break
              default:
                if (assets[i][j - 1].type === shelf)
                  bottom +=
                    Config.furnishing.shelf.interval - assets[i][j - 1].scale[1]
                else bottom = bottom + Config.furnishing.default.interval
                break
            }
          }

          bottomAsset = assets[i][j - 1].type
        }

        const tempSpace = {
          top: top,
          bottom: bottom,
          availableTop: availableTop,
          availableBottom: availableBottom,
          width: elementsWidths[i],
          height: top + drag_thickness - bottom,
          posX: elementsXInfo[i],
          posY: (top + drag_thickness + bottom) / 2,
          posZ: depth + 0.5,
          topAsset: assets[i][j].type,
          bottomAsset: bottomAsset,
          inDivider,
          d_xIndex,
          d_yPos,
          xIndex: i,
        }
        // console.log(top, bottom) consider drawer top, bottom shelf thickness on topasset, bottomasset is none

        if (top > bottom) {
          if ( doorCategory === flap){
            if (((tempSpace.availableTop - tempSpace.availableBottom) <= Config.door.flap_height_range.max && 
              (tempSpace.availableTop - tempSpace.availableBottom) >= Config.door.flap_height_range.min) &&
              tempSpace.width <= Config.door.flap_width_range.max && tempSpace.width >= Config.door.flap_width_range.min)
            {
              result.push(tempSpace)
            }
          } else {
            if ((type === drawer || 
              type === shelf
            ) && (hanging || withFeet)) {
              tempSpace.bottom = tempSpace.bottom + 25
              tempSpace.top = tempSpace.top + 25
              result.push(tempSpace)
            } else {
              result.push(tempSpace)
            }
          }
        }
        

      }
      // console.log(drag_thickness)
      top =
        elementsTop -
        (drag_type === shelf
          ? Config.furnishing.shelf.interval
          : drag_type === drawer ||
            drag_type === divider ||
            drag_type === door
            ? drag_thickness
            : drag_type === clothesRail
              ? Config.furnishing.clothesRail.topSpace + 2 * drag_thickness
              : drag_type === clothesLift
                ? Config.furnishing.clothesLift.topSpace + 2 * drag_thickness
                : flap
                  ? drag_thickness 
                    : Config.furnishing.default.interval + drag_thickness)

      bottom = getBottom(
        assets[i][assets[i].length - 1].position[1],
        assets[i][assets[i].length - 1].scale[1],
        assets[i][assets[i].length - 1].type,
        assets[i][assets[i].length - 1].topShelfDistance
      )

      availableBottom = bottom

      if (
        assets[i][assets[i].length - 1].type === clothesRail ||
        assets[i][assets[i].length - 1].type === clothesLift
      ) {
        switch (drag_type) {
          case clothesRail:
            bottom =
              bottom +
              Config.furnishing.clothesRail.availableSpace -
              Config.furnishing.clothesRail.topSpace -
              drag_thickness
            break
          case clothesLift:
            bottom =
              bottom +
              Config.furnishing.clothesLift.availableSpace -
              Config.furnishing.clothesLift.topSpace -
              drag_thickness
            break
          case pantsPullout:
            bottom += Config.furnishing.pantsPullout.availableSpace
            break
          default:
            break
        }
      } else {
        switch (drag_type) {
          case shelf:
            bottom +=
              Config.furnishing.shelf.interval -
              Config.furnishing.shelf.thickness1
            break
          case drawer:
            if (
              assets[i][assets[i].length - 1].type === drawer ||
              assets[i][assets[i].length - 1].type === internalDrawer
            ) {
              if (
                type === internalDrawer &&
                assets[i][assets[i].length - 1].type === internalDrawer
              ) {
                bottom =
                  bottom -
                  Config.furnishing.shelf.thickness1 -
                  Config.furnishing.internalDrawer.topShelfDistance
              } else if (
                type === drawer &&
                assets[i][assets[i].length - 1].type === drawer
              ) {
                bottom = bottom - Config.furnishing.shelf.thickness1
              } else {
                bottom += Config.furnishing.default.interval
              }
            } else if (
              assets[i][assets[i].length - 1].type === shelf
            )
              bottom +=
                Config.furnishing.shelf.interval -
                Config.furnishing.shelf.thickness1
            else bottom += Config.furnishing.default.interval
            break
          case clothesRail:
            bottom =
              bottom +
              Config.furnishing.clothesRail.availableSpace -
              Config.furnishing.clothesRail.topSpace -
              drag_thickness
            break
          case clothesLift:
            bottom =
              bottom +
              Config.furnishing.clothesLift.availableSpace -
              Config.furnishing.clothesLift.topSpace -
              drag_thickness
            break
          case pantsPullout:
            bottom += Config.furnishing.pantsPullout.availableSpace
            break
          case divider:
            break
          case door:
            break
          case flap:
            console.log(top, bottom, top-bottom)
            // if ( ((top-bottom) > Config.door.flap_height_range.max) &&
            //   ((top-bottom) < Config.door.flap_height_range.min)) {
            //   bottom = top
            // }
            break
          default:
            if (assets[i][assets[i].length - 1].type === shelf)
              bottom +=
                Config.furnishing.shelf.interval -
                assets[i][assets[i].length - 1].scale[1]
            else bottom = bottom + Config.furnishing.default.interval
            break
        }
      }
      const tempSpace = {
        top: top,
        bottom: bottom,
        availableTop: elementsTop,
        availableBottom: availableBottom,
        width: elementsWidths[i],
        height: top + drag_thickness - bottom,
        posX: elementsXInfo[i],
        posY: (top + drag_thickness + bottom) / 2,
        posZ: depth + 0.5,
        topAsset: "none",
        bottomAsset: assets[i][assets[i].length - 1].type,
        inDivider,
        d_xIndex,
        d_yPos,
        xIndex: i,
      }

      if (top > bottom) {
        if (doorCategory === flap) {

          if ((tempSpace.availableTop - tempSpace.availableBottom) <= Config.door.flap_height_range.max 
            && (tempSpace.availableTop - tempSpace.availableBottom) >= Config.door.flap_height_range.min &&
            tempSpace.width <= Config.door.flap_width_range.max && tempSpace.width >= Config.door.flap_width_range.min) {
            result.push(tempSpace)
          }
            
        } else {
          if ((type === drawer || type === shelf) && (hanging || withFeet)) {
            tempSpace.bottom = tempSpace.bottom + 25
            tempSpace.top = tempSpace.top + 25
          }
          result.push(tempSpace)
        }
      }
    }
  }

  return result
}


const getUnavailableSpace = ({
  result,
  elementsXInfo,
  elementsWidths,
  elementsTop,
  elementsBottom,
  type,
  drag_thickness,
  original_assets,
  depth,
  inDivider,
  d_xIndex,
  d_yPos,
  korpusMaterial,
  doorCategory,
  hanging,
  withFeet,
  withOutFeet,
  furnishingAssets
}) => {
  getSpace({
    result, // This gets filled by getSpace
    elementsXInfo,
    elementsWidths,
    elementsTop,
    elementsBottom,
    type, 
    drag_thickness,
    original_assets,
    depth,
    inDivider,
    d_xIndex, // Not used for unavailable space calculation
    d_yPos,
    korpusMaterial,
    undefined,
    hanging,
    withFeet,
    withOutFeet
  });

  const { shelf, glassBottom, drawer, internalDrawer, clothesRail, clothesLift, pantsPullout, door, flap, divider, foldBottom } = Config.furnishing.type;
  const shelfTypes = [shelf, foldBottom, glassBottom];
  const drawerTypes = [drawer, internalDrawer];
  const unavailableSpaces = [];
  const sections = {};

  const info = (type) => {
    const match = Object.keys(Config.furnishing.type).find(key => Config.furnishing.type[key] === type);
    return Config.furnishing[match];
  };

  result.forEach((item, i) => {
    const sectionIndex = item.xIndex;
    if (!sections[sectionIndex]) sections[sectionIndex] = [];
    item.spaceType = 'available';
    item.id = `${item.xIndex}available${i}`;
    sections[sectionIndex].push(item);
  });

  Object.keys(sections).forEach(sectionKey => {
    const section = sections[sectionKey];

    if (shelfTypes.includes(type)) {
      unavailableSpaces.push({ // top
        top: elementsTop,
        bottom: elementsTop - 14,
        width: section[section.length - 1].width,
        height: 14,
        posX: section[section.length - 1].posX,
        posY: elementsTop - (14 / 2),
        posZ: depth + 0.5,
        inDivider: false,
        xIndex: parseInt(sectionKey),
        type: 'top',
        id: `top${sectionKey}`,
        spaceType: 'unavailable',
      })
      unavailableSpaces.push({ // bottom
        top: elementsBottom + 14,
        bottom: elementsBottom,
        width: section[0].width,
        height: 14,
        posX: section[0].posX,
        posY: elementsBottom + (14 / 2),
        posZ: depth + 0.5,
        inDivider: false,
        xIndex: sectionKey,
        type: 'bottom',
        id: `bottom${sectionKey}`,
        spaceType: 'unavailable',
      })
    }
  })

  original_assets.forEach((asset, i) => {
    const {xIndex, position, scale} = asset;
    const assetInfo = info(asset.type);

    const top = position[1] + (scale[1]) + assetInfo.minDistance;
    const bottom = position[1] - (scale[1]) - assetInfo.minDistance;

    // now if we got a drawer, and we are dragging a shelf, the drawer should have unavailable space minDistance as per shelf

    const obj = { // furniture items
      top,
      bottom,
      width: sections[xIndex][0].width,
      height: top - bottom,
      posX: position[0],
      posY: position[1],
      posZ: depth + 0.5,
      inDivider: false,
      xIndex: xIndex,
      type: asset.type,
      id: `${asset.type}${i}`,
      spaceType: 'unavailable',
    }

    unavailableSpaces.push(obj)
  })

  // unavailableSpaces.forEach(unavailable => {
  //   const xIndex = unavailable.xIndex;
  //   sections[xIndex].push(unavailable);
  // });

  // Object.keys(sections).forEach(key => sections[key].sort((a, b) => a.bottom - b.bottom));

  // Object.keys(sections).forEach(key => {
  //   const section = sections[key];

  //   if (key !== '0') return;

  //   section.forEach((space, i) => {
  //     const { id, spaceType, top, bottom } = space; // id is unique (to find unavailableSpaces) space type = available || unavailable

  //     if (spaceType === 'unavailable') {

  //       if (i !== section.length - 1) { // check above
  //         const nextSpace = section[i + 1];
  //         const nextBottom = nextSpace.bottom;
  //         const gapAbove = nextBottom - top;
  //         if (gapAbove > 0) console.log(`${id} Above: ${gapAbove}`);
  //       }

  //       if (i !== 0) { // check below
  //         const previousSpace = section[i - 1];
  //         const previousTop = previousSpace.top;
  //         const gapBelow = bottom - previousTop;
  //         if (gapBelow > 0) console.log(`${id} Below: ${gapBelow}`);
  //       }
  //     }

  //   });
  // });

  // console.log('---------------------------')

  return unavailableSpaces;
};


export const unavailableSpace = ({
  elementsWidths,
  baseType,
  height,
  depth,
  type,
  drawerHeight,
  drawerTopDistance,
  furnishingAssets,
  doorAssets,
  assetDragging,
  selectionInfo,
  korpusMaterial,
  hanging,
  withFeet,
  withOutFeet,
  currentIndex
}) => {

  const {shelf, foldBottom, glassBottom} = Config.furnishing.type;
  const shelfTypes = [shelf, foldBottom, glassBottom];
  const drag_thickness = getThickness(type, drawerHeight, drawerTopDistance, depth);
  let elementsXInfo = [];

  for (let index = 0; index < elementsWidths.length; index++) {
    if (index === 0) {
      elementsXInfo.push(Config.plate.thickness + elementsWidths[index] / 2)
    } else {
      elementsXInfo.push(
        elementsXInfo[index - 1] +
        elementsWidths[index - 1] / 2 +
        Config.plate.thickness +
        elementsWidths[index] / 2
      )
    }
  }

  let elementsTop = height - Config.plate.thickness;
  let elementsBottom =
    (baseType == Config.baseType.panel && !hanging && !withFeet && !withOutFeet
      ? Config.plate.plinthHeight
      : Config.glider.height) + Config.plate.thickness;

  const dividerArrays = {};
  let updatedAssets = [...furnishingAssets];

  // if (currentIndex) updatedAssets.splice(currentIndex, 1);

  if ((shelfTypes.includes(type)) && assetDragging) {
    updatedAssets = furnishingAssets.filter(asset => !shelfTypes.includes(asset.type))
  }

  updatedAssets.forEach((item) => {
    let selected = false

    if (
      item.xIndex === selectionInfo.xIndex &&
      item.position[1] === selectionInfo.yPos &&
      item.d_xIndex === selectionInfo.d_xIndex &&
      item.d_yPos === selectionInfo.d_yPos
    )
      selected = true

    if (item.inDivider && !selected) {
      const key = `${item.d_xIndex}_${item.d_yPos}`;
      if (!dividerArrays[key]) {
        dividerArrays[key] = []
      }
      dividerArrays[key].push(item)
    }
  })

  Object.values(dividerArrays).forEach((sublist) => {
    sublist.sort((a, b) => {
      if (a.xIndex !== b.xIndex) {
        return a.xIndex - b.xIndex
      }
      return a.position[1] - b.position[1]
    })
  })

  const f_assets = updatedAssets
    .filter((asset) => {
      let selected = asset.xIndex === selectionInfo.xIndex && asset.position[1] === selectionInfo.yPos;
      return !asset.inDivider && !selected
    })
    .sort((a, b) => {
      if (a.xIndex !== b.xIndex) return a.xIndex - b.xIndex;
      return a.position[1] - b.position[1];
    })

  const result = [];

  const unavailableSpaces = getUnavailableSpace({
    result,
    elementsXInfo,
    elementsWidths,
    elementsTop,
    elementsBottom,
    type,
    drag_thickness,
    original_assets: f_assets,
    depth,
    inDivider: false,
    d_xIndex: 0,
    d_yPos: 0,
    korpusMaterial,
    doorCategory: '',
    hanging,
    withFeet,
    withOutFeet,
    furnishingAssets
  })

  return unavailableSpaces;
}

export const getAvailableSpace = ({
  elementsWidths,
  baseType,
  height,
  depth,
  type,
  drawerHeight,
  drawerTopDistance,
  furnishingAssets,
  doorAssets,
  assetDragging,
  selectionInfo,
  korpusMaterial,
  hanging,
  withFeet,
  withOutFeet,
  currentIndex,
  isPlus
}) => {
  const {shelf, foldBottom, glassBottom} = Config.furnishing.type;
  const shelfTypes = [shelf, foldBottom, glassBottom];
  const drag_thickness = getThickness(type, drawerHeight, drawerTopDistance, depth);
  let elementsXInfo = [];

  for (let index = 0; index < elementsWidths.length; index++) {
    if (index === 0) {
      elementsXInfo.push(Config.plate.thickness + elementsWidths[index] / 2)
    } else {
      elementsXInfo.push(
        elementsXInfo[index - 1] +
        elementsWidths[index - 1] / 2 +
        Config.plate.thickness +
        elementsWidths[index] / 2
      )
    }
  }

  let elementsTop = height - Config.plate.thickness;
  let elementsBottom =
    (baseType == Config.baseType.panel && !hanging && !withFeet && !withOutFeet
      ? Config.plate.plinthHeight
      : Config.glider.height) + Config.plate.thickness;

  const dividerArrays = {};
  let updatedAssets = [...furnishingAssets];

  // if (currentIndex) updatedAssets.splice(currentIndex, 1);

  if ((shelfTypes.includes(type)) && assetDragging) {
    updatedAssets = furnishingAssets.filter(asset => !shelfTypes.includes(asset.type))
  }

  updatedAssets.forEach((item) => {
    let selected = false

    if (
      item.xIndex === selectionInfo.xIndex &&
      item.position[1] === selectionInfo.yPos &&
      item.d_xIndex === selectionInfo.d_xIndex &&
      item.d_yPos === selectionInfo.d_yPos
    )
      selected = true

    if (item.inDivider && !selected) {
      const key = `${item.d_xIndex}_${item.d_yPos}`;
      if (!dividerArrays[key]) {
        dividerArrays[key] = []
      }
      dividerArrays[key].push(item)
    }
  })

  Object.values(dividerArrays).forEach((sublist) => {
    sublist.sort((a, b) => {
      if (a.xIndex !== b.xIndex) {
        return a.xIndex - b.xIndex
      }
      return a.position[1] - b.position[1]
    })
  })

  const f_assets = updatedAssets
    .filter((asset) => {
      let selected = asset.xIndex === selectionInfo.xIndex && asset.position[1] === selectionInfo.yPos;
      return !asset.inDivider && !selected
    })
    .sort((a, b) => {
      if (a.xIndex !== b.xIndex) return a.xIndex - b.xIndex;
      return a.position[1] - b.position[1];
    })

  const result = [];
  
  getSpace({
    result,
    elementsXInfo,
    elementsWidths,
    elementsTop,
    elementsBottom,
    type,
    drag_thickness,
    original_assets: f_assets,
    depth,
    inDivider: undefined,
    d_xIndex: 0,
    d_yPos: 0,
    korpusMaterial,
    undefined,
    hanging,
    withFeet,
    withOutFeet
  })

  if (type !== Config.furnishing.type.divider) {
    f_assets
      .filter((asset) => asset.type === Config.furnishing.type.divider)
      .forEach((divider_asset) => {
        const d_assets =
          dividerArrays[divider_asset.xIndex + "_" + divider_asset.position[1]]

        const e_widths = [
          divider_asset.dividerLeftWidth,
          divider_asset.scale[0] -
          divider_asset.dividerLeftWidth -
          Config.furnishing.divider.thickness,
        ]

        elementsXInfo = [
          divider_asset.position[0] -
          divider_asset.scale[0] / 2 +
          e_widths[0] / 2,
          divider_asset.position[0] +
          divider_asset.scale[0] / 2 -
          e_widths[1] / 2,
        ]

        elementsBottom = divider_asset.position[1] - divider_asset.scale[1] / 2
        elementsTop =
          divider_asset.position[1] +
          divider_asset.scale[1] / 2 -
          (divider_asset.topShelfVisible
            ? Config.furnishing.divider.thickness
            : 0)

        getSpace(
          result,
          elementsXInfo,
          e_widths,
          elementsTop,
          elementsBottom,
          type,
          drag_thickness,
          d_assets,
          depth,
          true,
          divider_asset.xIndex,
          divider_asset.position[1],
          korpusMaterial
        )
      })
  }

  if (type === Config.furnishing.type.drawer) {
    return result.filter(space => {
      const filteredAssets = doorAssets.filter(door => door.xIndex === space.xIndex);

      for (let i = 0; i < filteredAssets.length; i++) {
        if (
          space.availableTop <
          filteredAssets[i].position[1] +
          filteredAssets[i].scale[1] * 0.5 +
          0.1 &&
          space.availableBottom >
          filteredAssets[i].position[1] -
          filteredAssets[i].scale[1] * 0.5 -
          0.1
        ) return false;
      }
      return true;
    })
  }

  return result;
}

export const getDimensions = (
  original_assets,
  elementsTop,
  elementsBottom,
  elementsInfo,
  temp
) => {
  const assets = []
  original_assets?.forEach((origin) => {
    if (!assets[origin.xIndex]) assets[origin.xIndex] = []

    assets[origin.xIndex].push(origin)
  })

  for (let i = 0; i < elementsInfo.length; i++) {
    if (assets[i] === undefined || assets[i].length === 0) {
      temp.push({
        top: elementsTop,
        bottom: elementsBottom,
        x: elementsInfo[i],
      })
    } else {
      let availableTop, availableBottom
      for (let j = 0; j < assets[i].length; j++) {
        availableTop = getTop(
          assets[i][j].position[1],
          assets[i][j].scale[1],
          assets[i][j].type
        )

        const objectTop = getBottom(
          assets[i][j].position[1],
          assets[i][j].scale[1],
          assets[i][j].type,
          assets[i][j].topShelfDistance
        )

        if (j === 0) availableBottom = elementsBottom
        else
          availableBottom = getBottom(
            assets[i][j - 1].position[1],
            assets[i][j - 1].scale[1],
            assets[i][j - 1].type,
            assets[i][j - 1].topShelfDistance
          )

        if (availableTop - availableBottom > 10)
          temp.push({
            top: availableTop,
            bottom: availableBottom,
            x: elementsInfo[i],
          })

        if (
          assets[i][j].type !== Config.furnishing.type.shelf &&
          assets[i][j].type !== Config.furnishing.type.foldBottom &&
          assets[i][j].type !== Config.furnishing.type.glassBottom &&
          assets[i][j].type !== Config.furnishing.type.divider
        ) {
          if (objectTop - availableTop > 10)
            temp.push({
              top: objectTop,
              bottom: availableTop,
              x: elementsInfo[i],
            })
        }
      }

      availableTop = elementsTop
      availableBottom = getBottom(
        assets[i][assets[i].length - 1].position[1],
        assets[i][assets[i].length - 1].scale[1],
        assets[i][assets[i].length - 1].type,
        assets[i][assets[i].length - 1].topShelfDistance
      )

      if (availableTop - availableBottom > 10)
        temp.push({
          top: availableTop,
          bottom: availableBottom,
          x: elementsInfo[i],
        })
    }
  }

  return temp
}

export const getDoorSpace = ({
  elementsWidths,
  baseType,
  height,
  depth,
  furnishingAssets,
  doorAssets,
  assetDragging,
  selectionInfo,
  korpusMaterial,
  korpusType,
  type,
  withFeetFlag
}) => {
  // x position for elements
  let elementsXInfo = []
  for (let index = 0; index < elementsWidths.length; index++) {
    if (index === 0) {
      elementsXInfo.push(Config.plate.thickness + elementsWidths[index] / 2)
    } else {
      elementsXInfo.push(
        elementsXInfo[index - 1] +
        elementsWidths[index - 1] / 2 +
        Config.plate.thickness +
        elementsWidths[index] / 2
      )
    }
  }

  let elementsTop = height - Config.plate.thickness
  let elementsBottom = (type === Config.furnishing.type.door || type === Config.furnishing.type.flap) && withFeetFlag ? Config.plate.thickness :
    (baseType == Config.baseType.panel
      ? Config.plate.plinthHeight
      : Config.glider.height) + Config.plate.thickness

  const assets = [
    ...furnishingAssets.filter(
      (asset) =>
        !asset.inDivider && (asset.type === Config.furnishing.type.drawer || (asset.type === Config.furnishing.type.foldBottom && korpusType === Config.korpusType.innerShap2)) 
    ),
    ...doorAssets.filter((asset) => {
      if (
        assetDragging &&
        asset.xIndex === selectionInfo.xIndex &&
        asset.posY === selectionInfo.yPos
      )
        return false
      return true
    }),
  ].sort((a, b) => {
    if (a.xIndex !== b.xIndex) {
      return a.xIndex - b.xIndex
    }
    return a.position[1] - b.position[1]
  })

  const result = []
  getSpace({
    result,
    elementsXInfo,
    elementsWidths,
    elementsTop,
    elementsBottom,
    type: Config.furnishing.type.door,
    drag_thickness: Config.door.min_height,
    original_assets: assets,
    depth,
    inDivider: false,
    d_xIndex: 0,
    d_yPos: 0,
    korpusMaterial,
    doorCategory: type,
  })
  return result;
}

export const getLedSpace = (
  elementsWidths,
  baseType,
  height,
  depth,
  ledAssets
) => {
  const space = []

  // x position for elements
  const elementsXInfo = []
  for (let index = 0; index < elementsWidths.length; index++) {
    if (index === 0) {
      elementsXInfo.push(Config.plate.thickness + elementsWidths[index] / 2)
    } else {
      elementsXInfo.push(
        elementsXInfo[index - 1] +
        elementsWidths[index - 1] / 2 +
        Config.plate.thickness +
        elementsWidths[index] / 2
      )
    }
  }

  const elementsTop = height - Config.plate.thickness
  const elementsBottom =
    (baseType == Config.baseType.panel
      ? Config.plate.plinthHeight
      : Config.glider.height) + Config.plate.thickness

  for (let i = 0; i < elementsWidths.length; i++) {
    if (ledAssets.filter((asset) => asset.xIndex === i)[0]?.xIndex === i)
      continue

    const tempSpace = {
      xIndex: i,
      width: elementsWidths[i],
      top: elementsTop,
      bottom: elementsBottom,
      height: elementsTop - elementsBottom,
      posX: elementsXInfo[i],
      posY: (elementsTop + elementsBottom) / 2,
      posZ: depth + 0.5,
    }

    space[i] = tempSpace
  }

  // const result = []
  // result.push(space)

  return space
}
