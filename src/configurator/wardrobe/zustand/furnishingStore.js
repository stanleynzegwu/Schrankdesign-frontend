import createSelectors from "./createSelectors"
import Config from "../../config"
import { create } from "zustand"
import { getArrayIndex, getMaxVariables } from "../utils/getInfo"

const useFurnishingStore = createSelectors(
  create((set, get) => ({
    initFurnishing: (payload) => {
      set(payload)
    },
    furnishingAssets: [
      // {
      //     "xIndex": 0,
      //     "inDivider": false,
      //     "d_xIndex": 0,
      //     "position": [
      //         25.7,
      //         194.54999999999998,
      //         30.65
      //     ],
      //     "scale": [
      //         47.4,
      //         1.9,
      //         57.7
      //     ],
      //     "type": "Shelf",
      //     "selected": false
      // },
      // {
      //     "xIndex": 0,
      //     "inDivider": false,
      //     "d_xIndex": 0,
      //     "position": [
      //         25.7,
      //         50.550000000000004,
      //         30.65
      //     ],
      //     "scale": [
      //         47.4,
      //         1.9,
      //         57.7
      //     ],
      //     "type": "Shelf",
      //     "selected": false
      // },
      // {
      //     "xIndex": 0,
      //     "inDivider": false,
      //     "d_xIndex": 0,
      //     "position": [
      //         25.7,
      //         98.55000000000001,
      //         30.65
      //     ],
      //     "scale": [
      //         47.4,
      //         1.9,
      //         57.7
      //     ],
      //     "type": "Shelf",
      //     "selected": false
      // },
      // {
      //     "xIndex": 0,
      //     "inDivider": false,
      //     "d_xIndex": 0,
      //     "position": [
      //         25.7,
      //         146.55,
      //         30.65
      //     ],
      //     "scale": [
      //         47.4,
      //         1.9,
      //         57.7
      //     ],
      //     "type": "Shelf",
      //     "selected": false
      // },
      // {
      //     "xIndex": 1,
      //     "inDivider": false,
      //     "d_xIndex": 0,
      //     "position": [
      //         75.2,
      //         194.54999999999998,
      //         30.65
      //     ],
      //     "scale": [
      //         47.4,
      //         1.9,
      //         57.7
      //     ],
      //     "type": "Shelf",
      //     "selected": false
      // },
      // {
      //     "xIndex": 1,
      //     "inDivider": false,
      //     "d_xIndex": 0,
      //     "position": [
      //         75.2,
      //         146.55,
      //         30.65
      //     ],
      //     "scale": [
      //         47.4,
      //         1.9,
      //         57.7
      //     ],
      //     "type": "Shelf",
      //     "selected": false
      // },
      // {
      //     "xIndex": 1,
      //     "inDivider": false,
      //     "d_xIndex": 0,
      //     "position": [
      //         75.2,
      //         98.55000000000001,
      //         30.65
      //     ],
      //     "scale": [
      //         47.4,
      //         1.9,
      //         57.7
      //     ],
      //     "type": "Shelf",
      //     "selected": false
      // },
      // {
      //     "xIndex": 1,
      //     "inDivider": false,
      //     "d_xIndex": 0,
      //     "position": [
      //         75.2,
      //         50.550000000000004,
      //         30.65
      //     ],
      //     "scale": [
      //         47.4,
      //         1.9,
      //         57.7
      //     ],
      //     "type": "Shelf",
      //     "selected": false
      // },
      // {
      //     "xIndex": 2,
      //     "inDivider": false,
      //     "d_xIndex": 0,
      //     "position": [
      //         124.7,
      //         194.54999999999998,
      //         30.65
      //     ],
      //     "scale": [
      //         47.4,
      //         1.9,
      //         57.7
      //     ],
      //     "type": "Shelf",
      //     "selected": true
      // },
      // {
      //     "xIndex": 2,
      //     "inDivider": false,
      //     "d_xIndex": 0,
      //     "position": [
      //         124.7,
      //         146.55,
      //         30.65
      //     ],
      //     "scale": [
      //         47.4,
      //         1.9,
      //         57.7
      //     ],
      //     "type": "Shelf",
      //     "selected": false
      // },
      // {
      //     "xIndex": 3,
      //     "inDivider": false,
      //     "d_xIndex": 0,
      //     "position": [
      //         174.20000000000002,
      //         194.54999999999998,
      //         30.65
      //     ],
      //     "scale": [
      //         47.4,
      //         1.9,
      //         57.7
      //     ],
      //     "type": "Shelf",
      //     "selected": false
      // },
      // {
      //     "xIndex": 3,
      //     "inDivider": false,
      //     "d_xIndex": 0,
      //     "position": [
      //         174.20000000000002,
      //         146.55,
      //         30.65
      //     ],
      //     "scale": [
      //         47.4,
      //         1.9,
      //         57.7
      //     ],
      //     "type": "Shelf",
      //     "selected": false
      // },
      // {
      //     "xIndex": 2,
      //     "inDivider": false,
      //     "d_xIndex": 0,
      //     "position": [
      //         124.7,
      //         98.55000000000001,
      //         30.65
      //     ],
      //     "scale": [
      //         47.4,
      //         1.9,
      //         57.7
      //     ],
      //     "type": "Shelf",
      //     "selected": false
      // },
      // {
      //     "xIndex": 3,
      //     "inDivider": false,
      //     "d_xIndex": 0,
      //     "position": [
      //         174.20000000000002,
      //         98.55000000000001,
      //         30.65
      //     ],
      //     "scale": [
      //         47.4,
      //         1.9,
      //         57.7
      //     ],
      //     "type": "Shelf",
      //     "selected": false
      // },
      // {
      //     "xIndex": 2,
      //     "inDivider": false,
      //     "d_xIndex": 0,
      //     "position": [
      //         124.7,
      //         50.550000000000004,
      //         30.65
      //     ],
      //     "scale": [
      //         47.4,
      //         1.9,
      //         57.7
      //     ],
      //     "type": "Shelf",
      //     "selected": false
      // },
      // {
      //     "xIndex": 3,
      //     "inDivider": false,
      //     "d_xIndex": 0,
      //     "position": [
      //         174.20000000000002,
      //         50.550000000000004,
      //         30.65
      //     ],
      //     "scale": [
      //         47.4,
      //         1.9,
      //         57.7
      //     ],
      //     "type": "Shelf",
      //     "selected": false
      // }
    ],
    maxHeight: Config.plate.minHeight,
    maxDepth: Config.plate.minDepth,
    originalBaseType: Config.baseType.panel,
    selectionInfo: {},
    totalSpace: [],
    internalDrawerSides: [],
    ledAssets: [],
    doorAssets: [],
    flapAssets: [],
    griffAssets: [],
    platesInfo: [],
    addAsset: async(payload) => {
      const { removal, asset, drawerShelf } = payload

      const furnishingAssets = [...get().furnishingAssets]
      if (removal !== undefined) {
        const index = getArrayIndex(
          furnishingAssets,
          removal.xIndex,
          removal.yPos,
          removal.inDivider,
          removal.d_xIndex,
          removal.d_yPos
        )
        furnishingAssets[
          getArrayIndex(
            furnishingAssets,
            removal.xIndex,
            removal.yPos,
            removal.inDivider,
            removal.d_xIndex,
            removal.d_yPos
          )
        ] = { ...asset }

        console.log(furnishingAssets[index], removal)

      } else {
        furnishingAssets.push(asset)
      }

     
      const { maxHeight, maxDepth } = getMaxVariables(furnishingAssets)
      set({ furnishingAssets, maxHeight, maxDepth })
      // drawerShelf?.forEach((item) => {
      //   const yIndex = getSortedYIndex(
      //     get().furnishingAssets,
      //     asset.xIndex,
      //     asset.position[1],
      //     asset.inDivider,
      //     asset.d_xIndex,
      //     asset.d_yIndex
      //   )

      //   const targetYIndex =
      //     item.location === "top"
      //       ? yIndex + 1
      //       : item.location === "bottom"
      //       ? yIndex - 1
      //       : yIndex

      //   const arrayIndex = getArrayIndex(
      //     get().furnishingAssets,
      //     asset.xIndex,
      //     targetYIndex,
      //     asset.inDivider,
      //     asset.d_xIndex,
      //     asset.d_yIndex
      //   )

      //   const existingAsset = get().furnishingAssets[arrayIndex]

      //   if (existingAsset !== undefined) {
      //     if (item.topVisible !== undefined) {
      //       existingAsset.topVisible = item.topVisible
      //     }
      //     if (item.bottomVisible !== undefined) {
      //       existingAsset.bottomVisible = item.bottomVisible
      //     }
      //   }
      // })

      // get().furnishingAssets.map((asset) => (asset.sideVisible = true))

      // get().internalDrawerSides = getInternalDrawerSides(get().furnishingAssets)

      // get().internalDrawerSides.map((xAssets, xIndex) =>
      //   xAssets.map((asset) => {
      //     for (let i = asset.startYIndex; i <= asset.stopYIndex; i++) {
      //       get().furnishingAssets[xIndex][
      //         getArrayIndex(get().furnishingAssets[xIndex], i)
      //       ].sideVisible = false
      //     }
      //   })
      // )
    },
    removeAsset: (payload) => {
      const furnishingAssets = [...get().furnishingAssets]

      furnishingAssets.splice(
        getArrayIndex(
          furnishingAssets,
          payload.xIndex,
          payload.yPos,
          payload.inDivider,
          payload.d_xIndex,
          payload.d_yPos
        ),
        1
      )

      const { maxHeight, maxDepth } = getMaxVariables(furnishingAssets)

      set({ furnishingAssets, maxHeight, maxDepth })

      // furnishingAssets.forEach((asset) => (asset.sideVisible = true))

      // internalDrawerSides = getInternalDrawerSides(furnishingAssets)

      // internalDrawerSides.map((xAssets, xIndex) =>
      //   xAssets.map((asset) => {
      //     for (let i = asset.startYIndex; i <= asset.stopYIndex; i++) {
      //       furnishingAssets[xIndex][
      //         getArrayIndex(furnishingAssets[xIndex], i)
      //       ].sideVisible = false
      //     }
      //   })
      // )
    },
    updateAssetsInSpace: (payload) => {
      const { topYPos, bottomYPos, xIndex, inDivider, d_xIndex, d_yPos } = payload

      const filterCondition = (item) => !inDivider ?
        (!item.inDivider &&
          item.xIndex === xIndex &&
          item.position[1] >= bottomYPos &&
          item.position[1] <= topYPos) :
        (item.inDivider && item.d_xIndex === d_xIndex && item.d_yPos === d_yPos && item.xIndex === xIndex && item.position[1] >= bottomYPos &&
          item.position[1] <= topYPos)

      const furnishingAssets = get().furnishingAssets
      const updatedAssets = get().furnishingAssets.filter(filterCondition)

      // console.log(payload,updatedAssets)
      updatedAssets.map((item, index) => {
        furnishingAssets[
          getArrayIndex(
            get().furnishingAssets,
            item.xIndex,
            item.position[1],
            item.inDivider,
            item.d_xIndex,
            item.d_yPos
          )
        ] = { ...item, position: [item.position[0], (topYPos - bottomYPos) / (updatedAssets.length + 2) * (index + 1) + bottomYPos, item.position[2]] }
      })
      set({ furnishingAssets })

      return topYPos - (topYPos - bottomYPos) / (updatedAssets.length + 2);
    },
    setFurnishingAssets: (furnishingAssets) => {
      set({ furnishingAssets })
    },
    setOriginalBaseType: (originalBaseType) => {
      set({ originalBaseType })
    },
    setSelectionInfo: (selectionInfo) => {
      set({ selectionInfo })
    },
    setTotalSpace: (totalSpace) => {
      set({ totalSpace })
    },
    showDrawerShelf: (payload) => {
      // const { type, xIndex, yPos, inDivider, d_xIndex, d_yPos } = payload
      // const furnishingAssets = [...get().furnishingAssets]
      // const arrayIndex = getArrayIndex(
      //   furnishingAssets,
      //   xIndex,
      //   yPos,
      //   inDivider,
      //   d_xIndex,
      //   d_yPos
      // )
      // if (type === Config.furnishing.type.internalDrawer) {
      //   let removalYIndex = -1
      //   for (let j = 0; j < internalDrawerSides[xIndex].length; j++) {
      //     if (
      //       arrayYIndex >= internalDrawerSides[xIndex][j].startYIndex &&
      //       arrayYIndex <= internalDrawerSides[xIndex][j].stopYIndex
      //     ) {
      //       removalYIndex = j
      //       for (
      //         let i = internalDrawerSides[xIndex][j].startYIndex;
      //         i <= internalDrawerSides[xIndex][j].stopYIndex;
      //         i++
      //       ) {
      //         furnishingAssets[xIndex][
      //           getArrayIndex(furnishingAssets[xIndex], i)
      //         ].sideVisible = true
      //       }
      //       break
      //     }
      //   }
      //   if (removalYIndex !== -1) {
      //     internalDrawerSides[xIndex].splice(removalYIndex, 1)
      //   }
      // }
      // const topIndex = getArrayIndex(
      //   furnishingAssets,
      //   xIndex,
      //   yIndex + 1,
      //   inDivider,
      //   d_xIndex,
      //   d_yIndex
      // )
      // const bottomIndex = getArrayIndex(
      //   furnishingAssets,
      //   xIndex,
      //   yIndex - 1,
      //   inDivider,
      //   d_xIndex,
      //   d_yIndex
      // )
      // furnishingAssets[arrayIndex].topVisible = true
      // furnishingAssets[arrayIndex].bottomVisible = true
      // if (furnishingAssets[topIndex]?.bottomVisible === false) {
      //   furnishingAssets[topIndex].bottomVisible = true
      // }
      // if (furnishingAssets[bottomIndex]?.topVisible === false) {
      //   furnishingAssets[bottomIndex].topVisible = true
      // }
    },
    updateDrawerScale: (payload) => {
      const {
        xIndex,
        yPos,
        inDivider,
        d_xIndex,
        d_yPos,
        scaleY,
        positionY
      } = payload
      const furnishingAssets = [...get().furnishingAssets]
      const arrayIndex = getArrayIndex(
        furnishingAssets,
        xIndex,
        yPos,
        inDivider,
        d_xIndex,
        d_yPos,
      )
      furnishingAssets[arrayIndex].scale[1] = scaleY
      furnishingAssets[arrayIndex].position[1] = positionY
      set({ furnishingAssets })
    },
    updateDrawerInfo: (payload) => {
      const {
        xIndex,
        yPos,
        inDivider,
        d_xIndex,
        d_yPos,
        topShelfDistance,
        positionY,
      } = payload

      const furnishingAssets = [...get().furnishingAssets]

      const arrayIndex = getArrayIndex(
        furnishingAssets,
        xIndex,
        yPos,
        inDivider,
        d_xIndex,
        d_yPos
      )

      furnishingAssets[arrayIndex].topShelfDistance = topShelfDistance

      if (positionY !== undefined) {
        furnishingAssets[arrayIndex].position[1] = positionY
      }

      set({ furnishingAssets })
    },
    addLed: (asset) => {
      const ledAssets = [...get().ledAssets]

      ledAssets.push(asset)

      set({ ledAssets })
    },
    moveLed: (payload) => {
      const ledAssets = [...get().ledAssets]
      const index = ledAssets.findIndex(
        (asset) => asset.xIndex === payload.former_xIndex
      )

      if (index !== -1)
        ledAssets[index] = {
          xIndex: payload.xIndex,
          position: payload.position,
          scale: payload.scale,
        }

      set({ ledAssets })
    },
    removeLed: (payload) => {
      const ledAssets = [...get().ledAssets]
      const index = ledAssets.findIndex(
        (asset) => asset.xIndex === payload.xIndex
      )

      if (index !== -1) ledAssets.splice(index, 1)
      set({ ledAssets })
    },
    setLedAssets: (ledAssets) => {
      set({ ledAssets })
    },
    updateDividerAsset: (payload) => {
      const { xIndex, yPos, scale, position, topShelfVisible, leftWidth } =
        payload

      const furnishingAssets = [...get().furnishingAssets]

      const arrayIndex = getArrayIndex(furnishingAssets, xIndex, yPos, false)

      if (scale !== undefined) furnishingAssets[arrayIndex].scale = scale

      if (position !== undefined)
        furnishingAssets[arrayIndex].position = position

      if (topShelfVisible !== undefined)
        furnishingAssets[arrayIndex].topShelfVisible = topShelfVisible

      if (leftWidth !== undefined) {
        furnishingAssets[arrayIndex].dividerLeftWidth = leftWidth
        const dividerScale = furnishingAssets[arrayIndex].scale
        const dividerPos = furnishingAssets[arrayIndex].position
        furnishingAssets.forEach((asset) => {
          if (
            asset.inDivider &&
            asset.d_xIndex === xIndex &&
            asset.d_yPos === yPos
          ) {
            if (asset.xIndex === 0) {
              asset.scale[0] =
                asset.type === Config.furnishing.type.shelf ||
                  asset.type === Config.furnishing.type.foldBottom ||
                  asset.type === Config.furnishing.type.glassBottom ||
                  asset.type === Config.furnishing.type.pantsPullout
                  ? leftWidth - Config.furnishing.default.spaceSides * 2
                  : asset.type === Config.furnishing.type.drawer
                    ? leftWidth - Config.furnishing.drawer.sideIncident * 2
                    : asset.type === Config.furnishing.type.internalDrawer
                      ? leftWidth -
                      (Config.furnishing.internalDrawer.panelSpace +
                        Config.furnishing.internalDrawer.panelWidth) *
                      2
                      : leftWidth
              asset.position[0] =
                dividerPos[0] - dividerScale[0] / 2 + leftWidth / 2
            } else {
              asset.scale[0] =
                asset.type === Config.furnishing.type.shelf ||
                  asset.type === Config.furnishing.type.foldBottom ||
                  asset.type === Config.furnishing.type.glassBottom ||
                  asset.type === Config.furnishing.type.pantsPullout
                  ? dividerScale[0] -
                  leftWidth -
                  Config.furnishing.divider.thickness -
                  Config.furnishing.default.spaceSides * 2
                  : asset.type === Config.furnishing.type.drawer
                    ? dividerScale[0] -
                    leftWidth -
                    Config.furnishing.divider.thickness -
                    Config.furnishing.drawer.sideIncident * 2
                    : asset.type === Config.furnishing.type.internalDrawer
                      ? dividerScale[0] -
                      leftWidth -
                      Config.furnishing.divider.thickness -
                      (Config.furnishing.internalDrawer.panelSpace +
                        Config.furnishing.internalDrawer.panelWidth) *
                      2
                      : dividerScale[0] -
                      leftWidth -
                      Config.furnishing.divider.thickness

              asset.position[0] =
                dividerPos[0] +
                dividerScale[0] / 2 -
                (dividerScale[0] -
                  leftWidth -
                  Config.furnishing.divider.thickness) /
                2
            }
          }
        })
      }

      set({ furnishingAssets })
    },
    addDoor: (payload) => {
      const { removal, asset } = payload

      const doorAssets = [...get().doorAssets]

      if (removal !== undefined) {
        doorAssets[
          doorAssets.findIndex(
            (item) =>
              item.xIndex === removal.xIndex &&
              item.position[1] === removal.posY
          )
        ] = { ...asset }
      } else {
        doorAssets.push(asset)
      }

      set({ doorAssets })
    },
    addFlap: (payload) => {
      const {removal, asset} = payload
      const flapAssets = [...get().flapAssets]
      if (removal !== undefined) {
        flapAssets[
          flapAssets.findIndex(
            (item) =>
              item.xIndex === removal.xIndex &&
            item.position[1] === removal.posY
          )
        ] = {...asset}
      } else {
        flapAssets.push(asset)
      }
      set({ flapAssets })
    },
    addGriff: (payload) => {
      const { removal, asset } =payload
      const griffAssets = [...get().griffAssets]
      if(removal !== undefined) {
        griffAssets[
          griffAssets.findIndex(
            (item) =>
              item.xIndex === removal.xIndex &&
            item.position[1] === removal.posY
          )
        ] = {...asset}
      } else {
        griffAssets.push(asset)
      }

      set({griffAssets})
    },
    removeDoor: (payload) => {
      const doorAssets = [...get().doorAssets]
      const index = doorAssets.findIndex(
        (asset) =>
          asset.xIndex === payload.xIndex && asset.position[1] === payload.posY
      )

      if (index !== -1) doorAssets.splice(index, 1)

      set({ doorAssets })
    },
    removeGriff: (payload) => {
      const griffAssets = [...get().griffAssets]
      const index = griffAssets.findIndex(
        (asset) =>
          asset.xIndex === payload.xIndex && asset.position[1] === payload.posY
      )

      if (index !== -1) griffAssets.splice(index,1)

      set({griffAssets})
    },
    removeFlap: (payload) => {
      const flapAssets = [...get().flapAssets]
      const index = flapAssets.findIndex(
        (asset) =>
          asset.xIndex === payload.xIndex && asset.position[1] === payload.posY
      )
      if (index !== -1 ) flapAssets.splice(index, 1)

      set({ flapAssets })
    },
    updateFurnishingAssests: (payload) => {
      const { xIndex, posY, position, scale, isShowControl} = payload
      const furnishingAssets = [...get().furnishingAssets]
      const index = furnishingAssets.findIndex(
        (asset) => asset.xIndex === xIndex && asset.position[1] === posY
      )
      if (index !== -1) 
        furnishingAssets[index] ={
          ...furnishingAssets[index],
          position,
          scale,
          isShowControl
        }

      set({ furnishingAssets })
    },
    updateDoor: (payload) => {
      const { xIndex, posY, position, scale, topAsset, bottomAsset, isPlint, innerAssetsTopIndex, innerAssetsBottomIndex } = payload
      
      const doorAssets = [...get().doorAssets]
      const index = doorAssets.findIndex(
        (asset) => asset.xIndex === xIndex && asset.position[1] === posY
      )
      if (index !== -1)
        doorAssets[index] = {
          ...doorAssets[index],
          position,
          scale,
          topAsset,
          bottomAsset,
          isPlint,
          innerAssetsTopIndex,
          innerAssetsBottomIndex
        }

      set({ doorAssets })
    },
    setDoorAssets: (doorAssets) => {
      set({ doorAssets })
    },
    setGriffAssets: (griffAssets) => {
      set({ griffAssets })
    },
    setFlapAssets: (flapAssets) => {
      set({ flapAssets })
    },
    setPlatesInfo: (platesInfo) => {
      set({ platesInfo })
    },
    setMaxHeight: (maxHeight) => {
      set({maxHeight})
    }
  }))
)

export default useFurnishingStore
