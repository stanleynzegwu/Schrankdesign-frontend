import createSelectors from "./createSelectors"
import Config from "../../config"
import { create } from "zustand"
import { getArrayIndex, getMaxVariables } from "../utils/getInfo"

const useFurnishingStore = createSelectors(
  create((set, get) => ({
    initFurnishing: (payload) => {
      set(payload)
    },
    furnishingAssets: [],
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
    updateAsset: (payload) => {
      const { index, newData } = payload;
      const furnishingAssets = [...get().furnishingAssets];
      if (index >= 0 && index < furnishingAssets.length) {
        furnishingAssets[index] = { ...furnishingAssets[index], ...newData };
        set({ furnishingAssets });
      }
    },
    addAsset: async(payload) => {
      const { removal, asset } = payload;
      const furnishingAssets = [...get().furnishingAssets];

      if (removal) {
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

      } else {
        furnishingAssets.push(asset)
      }

      const { maxHeight, maxDepth } = getMaxVariables(furnishingAssets)
      set({ furnishingAssets, maxHeight, maxDepth })
    },
    removeAssetByIndex: (index) => {
      const furnishingAssets = [...get().furnishingAssets];
      if (index >= 0 && index < furnishingAssets.length) furnishingAssets.splice(index, 1); // Remove item by index
      const { maxHeight, maxDepth } = getMaxVariables(furnishingAssets);
      set({ furnishingAssets, maxHeight, maxDepth });
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
    },
    updateAssetsInSpace: (payload) => {
      const { topYPos, bottomYPos, xIndex, inDivider, d_xIndex, d_yPos } = payload

      const filterCondition = (item) => !inDivider 
        ? (
            !item.inDivider 
            && item.xIndex === xIndex 
            && item.position[1] >= bottomYPos 
            && item.position[1] <= topYPos
          ) 
        : (
            item.inDivider 
            && item.d_xIndex === d_xIndex 
            && item.d_yPos === d_yPos 
            && item.xIndex === xIndex 
            && item.position[1] >= bottomYPos 
            && item.position[1] <= topYPos
          )

      const furnishingAssets = get().furnishingAssets
      const updatedAssets = get().furnishingAssets.filter(filterCondition)

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
      // console.log(asset)
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
    updateDoorDimensions: (payload) => {
      const { index, newData } = payload;
      const doorAssets = [...get().doorAssets];
      if (index >= 0 && index < doorAssets.length) {
        doorAssets[index] = { ...doorAssets[index], ...newData };
        set({ doorAssets });
      }
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
