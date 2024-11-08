import Config from "../../config"

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

  return bottom
}

const getSpace = (
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
) => {
  const assets = []
  original_assets?.forEach((origin) => {
    if (!assets[origin.xIndex]) assets[origin.xIndex] = []

    assets[origin.xIndex].push(origin)
  })
 
  // dragged asset type
  const drag_type =
    type === Config.furnishing.type.shelf ||
      type === Config.furnishing.type.glassBottom
      ? Config.furnishing.type.shelf
      : type === Config.furnishing.type.drawer ||
        type === Config.furnishing.type.internalDrawer
        ? Config.furnishing.type.drawer
        : type === Config.furnishing.type.clothesRail
          ? Config.furnishing.type.clothesRail
          : type === Config.furnishing.type.clothesLift
            ? Config.furnishing.type.clothesLift
            : type === Config.furnishing.type.pantsPullout
              ? Config.furnishing.type.pantsPullout
              : type === Config.furnishing.type.divider
                ? Config.furnishing.type.divider
                : type === Config.furnishing.type.door
                  ? Config.furnishing.type.door
                  : type === Config.furnishing.type.flap ?
                    Config.furnishing.type.flap : "Other";


  for (let i = 0; i < elementsXInfo.length; i++) {
    if (assets[i] === undefined || assets[i].length === 0) {
      let tempSpace = {
        width: elementsWidths[i],
        top:
          elementsTop -
          (drag_type === Config.furnishing.type.shelf
            ? Config.furnishing.shelf.interval
            : drag_type === Config.furnishing.type.drawer ||
              drag_type === Config.furnishing.type.divider ||
              drag_type === Config.furnishing.type.door
              ? drag_thickness
              : drag_type === Config.furnishing.type.clothesRail
                ? Config.furnishing.clothesRail.topSpace + 2 * drag_thickness
                : drag_type === Config.furnishing.type.clothesLift
                  ? Config.furnishing.clothesLift.topSpace + 2 * drag_thickness
                  : Config.furnishing.default.interval + drag_thickness) - 0,
        bottom: 
          elementsBottom +
          (drag_type === Config.furnishing.type.shelf
            ? Config.furnishing.shelf.interval - drag_thickness
            : drag_type === Config.furnishing.type.drawer ||
              drag_type === Config.furnishing.type.divider ||
              drag_type === Config.furnishing.type.door
              ? 0
              : drag_type === Config.furnishing.type.clothesRail
                ? Config.furnishing.clothesRail.availableSpace -
                drag_thickness -
                Config.furnishing.clothesRail.topSpace
                : drag_type === Config.furnishing.type.clothesLift
                  ? Config.furnishing.clothesLift.availableSpace -
                  drag_thickness -
                  Config.furnishing.clothesLift.topSpace
                  : drag_type === Config.furnishing.type.pantsPullout
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
        if (doorCategory !== Config.furnishing.type.flap) {
          if ((type === Config.furnishing.type.drawer || 
            type === Config.furnishing.type.shelf ||
            type === Config.furnishing.type.glassBottom ||
            type === Config.furnishing.type.foldBottom
          ) && (hanging || withFeet)) {
            tempSpace.availableTop = tempSpace.availableTop
            tempSpace.availableBottom = tempSpace.availableBottom
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
          assets[i][j].type === Config.furnishing.type.clothesRail ||
          assets[i][j].type === Config.furnishing.type.clothesLift ||
          assets[i][j].type === Config.furnishing.type.pantsPullout
        ) {
          if (drag_type === Config.furnishing.type.clothesRail)
            top =
              top - Config.furnishing.clothesRail.topSpace - 2 * drag_thickness
          else if (drag_type === Config.furnishing.type.clothesLift)
            top =
              top - Config.furnishing.clothesLift.topSpace - 2 * drag_thickness
          else top = top - drag_thickness
        } else {
          switch (drag_type) {
            case Config.furnishing.type.shelf:
              top -= Config.furnishing.shelf.interval
              break
            case Config.furnishing.type.drawer:
              if (assets[i][j].type === Config.furnishing.type.shelf)
                top =
                  top -
                  Config.furnishing.shelf.interval +
                  Config.furnishing.shelf.thickness1 -
                  drag_thickness
              else if (
                assets[i][j].type === Config.furnishing.type.drawer ||
                assets[i][j].type === Config.furnishing.type.internalDrawer
              ) {
                if (
                  type === Config.furnishing.type.internalDrawer &&
                  assets[i][j].type === Config.furnishing.type.internalDrawer
                ) {
                  top =
                    top -
                    drag_thickness +
                    Config.furnishing.shelf.thickness1 +
                    Config.furnishing.internalDrawer.topShelfDistance
                } else if (
                  type === Config.furnishing.type.drawer &&
                  assets[i][j].type === Config.furnishing.type.drawer
                ) {
                  top =
                    top -
                    drag_thickness +
                    Config.furnishing.shelf.thickness1
                } else {
                  top =
                    top - Config.furnishing.default.interval - drag_thickness
                }
              } else
                top = top - Config.furnishing.default.interval - drag_thickness
              break
            case Config.furnishing.type.clothesRail:
              top =
                top -
                Config.furnishing.clothesRail.topSpace -
                2 * drag_thickness
              break
            case Config.furnishing.type.clothesLift:
              top =
                top -
                Config.furnishing.clothesLift.topSpace -
                2 * drag_thickness
              break
            case Config.furnishing.type.divider:
              top = top - drag_thickness
              break
            case Config.furnishing.type.door:
              top = top - drag_thickness
              break
            case Config.furnishing.type.flap:
              top = top - Config.door.flap_height_range.min
              // top = top - drag_thickness
              break
            default:
              if (assets[i][j].type === Config.furnishing.type.shelf)
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
            (drag_type === Config.furnishing.type.shelf
              ? Config.furnishing.shelf.interval - drag_thickness
              : drag_type === Config.furnishing.type.drawer ||
                drag_type === Config.furnishing.type.divider ||
                drag_type === Config.furnishing.type.door
                ? 0
                : drag_type === Config.furnishing.type.clothesRail
                  ? Config.furnishing.clothesRail.availableSpace -
                  Config.furnishing.clothesRail.topSpace -
                  drag_thickness
                  : drag_type === Config.furnishing.type.clothesLift
                    ? Config.furnishing.clothesLift.availableSpace -
                    Config.furnishing.clothesLift.topSpace -
                    drag_thickness
                    : drag_type === Config.furnishing.type.pantsPullout
                      ? Config.furnishing.pantsPullout.availableSpace
                      : Config.furnishing.type.flap
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
            assets[i][j - 1].type === Config.furnishing.type.clothesRail ||
            assets[i][j - 1].type === Config.furnishing.type.clothesLift
          ) {
            switch (drag_type) {
              case Config.furnishing.type.clothesRail:
                bottom =
                  bottom +
                  Config.furnishing.clothesRail.availableSpace -
                  Config.furnishing.clothesRail.topSpace -
                  drag_thickness
                break
              case Config.furnishing.type.clothesLift:
                bottom =
                  bottom +
                  Config.furnishing.clothesLift.availableSpace -
                  Config.furnishing.clothesLift.topSpace -
                  drag_thickness
                break
              case Config.furnishing.type.pantsPullout:
                bottom += Config.furnishing.pantsPullout.availableSpace
                break
              default:
                break
            }
          } else {
            switch (drag_type) {
              case Config.furnishing.type.shelf:
                bottom +=
                  Config.furnishing.shelf.interval -
                  Config.furnishing.shelf.thickness1
                break
              case Config.furnishing.type.drawer:
                if (
                  assets[i][j - 1].type === Config.furnishing.type.drawer ||
                  assets[i][j - 1].type ===
                  Config.furnishing.type.internalDrawer
                ) {
                  if (
                    type === Config.furnishing.type.internalDrawer &&
                    assets[i][j - 1].type ===
                    Config.furnishing.type.internalDrawer
                  ) {
                    bottom =
                      bottom -
                      Config.furnishing.shelf.thickness1 -
                      Config.furnishing.internalDrawer.topShelfDistance
                  } else if (
                    type === Config.furnishing.type.drawer &&
                    assets[i][j - 1].type === Config.furnishing.type.drawer
                  ) {
                    bottom = bottom - Config.furnishing.shelf.thickness1
                  } else {
                    bottom += Config.furnishing.default.interval
                  }
                } else if (
                  assets[i][j - 1].type === Config.furnishing.type.shelf
                )
                  bottom +=
                    Config.furnishing.shelf.interval -
                    Config.furnishing.shelf.thickness1
                else bottom += Config.furnishing.default.interval
                break
              case Config.furnishing.type.clothesRail:
                bottom =
                  bottom +
                  Config.furnishing.clothesRail.availableSpace -
                  Config.furnishing.clothesRail.topSpace -
                  drag_thickness
                break
              case Config.furnishing.type.clothesLift:
                bottom =
                  bottom +
                  Config.furnishing.clothesLift.availableSpace -
                  Config.furnishing.clothesLift.topSpace -
                  drag_thickness
                break
              case Config.furnishing.type.pantsPullout:
                bottom += Config.furnishing.pantsPullout.availableSpace
                break
              case Config.furnishing.type.divider:
                break
              case Config.furnishing.type.door:
                break
              case Config.furnishing.type.flap:
                break
              default:
                if (assets[i][j - 1].type === Config.furnishing.type.shelf)
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
          if ( doorCategory === Config.furnishing.type.flap){
            if (((tempSpace.availableTop - tempSpace.availableBottom) <= Config.door.flap_height_range.max && 
              (tempSpace.availableTop - tempSpace.availableBottom) >= Config.door.flap_height_range.min) &&
              tempSpace.width <= Config.door.flap_width_range.max && tempSpace.width >= Config.door.flap_width_range.min)
            {
              result.push(tempSpace)
            }
          } else {
            if ((type === Config.furnishing.type.drawer || 
              type === Config.furnishing.type.shelf
            ) && (hanging || withFeet)) {
              tempSpace.availableTop = tempSpace.availableTop
              tempSpace.availableBottom = tempSpace.availableBottom
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
        (drag_type === Config.furnishing.type.shelf
          ? Config.furnishing.shelf.interval
          : drag_type === Config.furnishing.type.drawer ||
            drag_type === Config.furnishing.type.divider ||
            drag_type === Config.furnishing.type.door
            ? drag_thickness
            : drag_type === Config.furnishing.type.clothesRail
              ? Config.furnishing.clothesRail.topSpace + 2 * drag_thickness
              : drag_type === Config.furnishing.type.clothesLift
                ? Config.furnishing.clothesLift.topSpace + 2 * drag_thickness
                : Config.furnishing.type.flap
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
        assets[i][assets[i].length - 1].type ===
        Config.furnishing.type.clothesRail ||
        assets[i][assets[i].length - 1].type ===
        Config.furnishing.type.clothesLift
      ) {
        switch (drag_type) {
          case Config.furnishing.type.clothesRail:
            bottom =
              bottom +
              Config.furnishing.clothesRail.availableSpace -
              Config.furnishing.clothesRail.topSpace -
              drag_thickness
            break
          case Config.furnishing.type.clothesLift:
            bottom =
              bottom +
              Config.furnishing.clothesLift.availableSpace -
              Config.furnishing.clothesLift.topSpace -
              drag_thickness
            break
          case Config.furnishing.type.pantsPullout:
            bottom += Config.furnishing.pantsPullout.availableSpace
            break
          default:
            break
        }
      } else {
        switch (drag_type) {
          case Config.furnishing.type.shelf:
            bottom +=
              Config.furnishing.shelf.interval -
              Config.furnishing.shelf.thickness1
            break
          case Config.furnishing.type.drawer:
            if (
              assets[i][assets[i].length - 1].type ===
              Config.furnishing.type.drawer ||
              assets[i][assets[i].length - 1].type ===
              Config.furnishing.type.internalDrawer
            ) {
              if (
                type === Config.furnishing.type.internalDrawer &&
                assets[i][assets[i].length - 1].type ===
                Config.furnishing.type.internalDrawer
              ) {
                bottom =
                  bottom -
                  Config.furnishing.shelf.thickness1 -
                  Config.furnishing.internalDrawer.topShelfDistance
              } else if (
                type === Config.furnishing.type.drawer &&
                assets[i][assets[i].length - 1].type ===
                Config.furnishing.type.drawer
              ) {
                bottom = bottom - Config.furnishing.shelf.thickness1
              } else {
                bottom += Config.furnishing.default.interval
              }
            } else if (
              assets[i][assets[i].length - 1].type ===
              Config.furnishing.type.shelf
            )
              bottom +=
                Config.furnishing.shelf.interval -
                Config.furnishing.shelf.thickness1
            else bottom += Config.furnishing.default.interval
            break
          case Config.furnishing.type.clothesRail:
            bottom =
              bottom +
              Config.furnishing.clothesRail.availableSpace -
              Config.furnishing.clothesRail.topSpace -
              drag_thickness
            break
          case Config.furnishing.type.clothesLift:
            bottom =
              bottom +
              Config.furnishing.clothesLift.availableSpace -
              Config.furnishing.clothesLift.topSpace -
              drag_thickness
            break
          case Config.furnishing.type.pantsPullout:
            bottom += Config.furnishing.pantsPullout.availableSpace
            break
          case Config.furnishing.type.divider:
            break
          case Config.furnishing.type.door:
            break
          case Config.furnishing.type.flap:
            console.log(top, bottom, top-bottom)
            // if ( ((top-bottom) > Config.door.flap_height_range.max) &&
            //   ((top-bottom) < Config.door.flap_height_range.min)) {
            //   bottom = top
            // }
            break
          default:
            if (
              assets[i][assets[i].length - 1].type ===
              Config.furnishing.type.shelf
            )
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
        if (doorCategory === Config.furnishing.type.flap) {

          if ((tempSpace.availableTop - tempSpace.availableBottom) <= Config.door.flap_height_range.max 
            && (tempSpace.availableTop - tempSpace.availableBottom) >= Config.door.flap_height_range.min &&
            tempSpace.width <= Config.door.flap_width_range.max && tempSpace.width >= Config.door.flap_width_range.min) {
            result.push(tempSpace)
          }
            
        } else {
          if ((type === Config.furnishing.type.drawer || 
            type === Config.furnishing.type.shelf
          ) && (hanging || withFeet)) {
            tempSpace.availableTop = tempSpace.availableTop
            tempSpace.availableBottom = tempSpace.availableBottom
            tempSpace.bottom = tempSpace.bottom + 25
            tempSpace.top = tempSpace.top + 25
            result.push(tempSpace)
          } else {
            result.push(tempSpace)
          }
        }
      }
    }
  }

  return result
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

export const getDoorSpace = (
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
) => {
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
  getSpace(
    result,
    elementsXInfo,
    elementsWidths,
    elementsTop,
    elementsBottom,
    Config.furnishing.type.door,
    Config.door.min_height,
    assets,
    depth,
    false,
    0,
    0,
    korpusMaterial,
    type,
  )

  return result
}

export const getAvailableSpace = (
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
  withOutFeet
) => {
  // dragged asset thickness
  const drag_thickness = getThickness(
    type,
    drawerHeight,
    drawerTopDistance,
    depth
  )

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
  let elementsBottom =
    (baseType == Config.baseType.panel && !hanging && !withFeet && !withOutFeet
      ? Config.plate.plinthHeight
      : Config.glider.height) + Config.plate.thickness

  const dividerArrays = {}

  let updatedAssets

  if ((type === Config.furnishing.type.shelf || type === Config.furnishing.type.foldBottom || type === Config.furnishing.type.glassBottom) && assetDragging) {
    updatedAssets = furnishingAssets.filter(asset => asset.type !== type)
  } else {
    updatedAssets = [ ...furnishingAssets]
  }

  updatedAssets.forEach((item) => {
    let selected = false

    if (
      // assetDragging &&
      item.xIndex === selectionInfo.xIndex &&
      item.position[1] === selectionInfo.yPos &&
      item.d_xIndex === selectionInfo.d_xIndex &&
      item.d_yPos === selectionInfo.d_yPos
    )
      selected = true

    if (item.inDivider && !selected) {
      const key = `${item.d_xIndex}_${item.d_yPos}`
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
      let selected = false
      if (
        // assetDragging &&
        asset.xIndex === selectionInfo.xIndex &&
        asset.position[1] === selectionInfo.yPos
      )
        selected = true

      return !asset.inDivider && !selected
    })
    .sort((a, b) => {
      if (a.xIndex !== b.xIndex) {
        return a.xIndex - b.xIndex
      }
      return a.position[1] - b.position[1]
    })

  const result = []
  getSpace(
    result,
    elementsXInfo,
    elementsWidths,
    elementsTop,
    elementsBottom,
    type,
    drag_thickness,
    f_assets,
    depth,
    false,
    0,
    0,
    korpusMaterial,
    undefined,
    hanging,
    withFeet,
    withOutFeet
  )

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
    return result.filter((space) => {
      const filteredAssets = doorAssets.filter(
        (door) => door.xIndex === space.xIndex
      )
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
        )
          return false
      }

      return true
    })
  }

  return result
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
