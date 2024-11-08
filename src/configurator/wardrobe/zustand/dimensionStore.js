import createSelectors from "./createSelectors"
import Config from "../../config"
import { create } from "zustand"

const useDimensionStore = createSelectors(
  create((set) => ({
    width: Config.plate.width,
    height: Config.plate.height,
    depth: Config.plate.depth,
    manual: false,
    elementsCount: 0,
    elementsWidths: [],
    eWidthsFixed: [],
    baseType: Config.baseType.panel,
    enableCutout: false,
    cutoutDepth: Config.cutout.depth,
    cutoutHeight: Config.cutout.height,
    enableFittingPanel: false,
    fittingType: Config.fittingType.all,
    isCornerView: false,
    korpusForm: false,
    korpusType: Config.korpusType.empty,
    korpusMaterial: false,
    handle: [],
    handleIndex: 0,
    handleListIndex: -1,
    handleDirection: Config.furnishing.default.handleDirection,
    pushOpen: true,
    feet: [],
    feetIndex: 0,
    feetListIndex: -1,
    feetCount:0,
    withOutFeet: false,
    withFeet: false,
    hanging: false,
    hangingSize: 0,
    minLength: 30,
    minHeight: Config.plate.minHeight,
    //settings properties
    minWidthC: Config.plate.minWidth,
    maxWidthC: Config.plate.maxWidth,
    minHeightC: Config.plate.minHeight,
    maxHeightC: Config.plate.maxHeight,
    minDepthC: Config.plate.minDepth,
    maxDepthC: Config.plate.maxDepth,
    baseCutout: true,
    externalPanel: true,
    korpusFormA: {
      active: true,
      value: {
        wardrobe: true,
        outer: true,
        top: true,
        uShape: true,
        inner: true,
        fullInner: true
      }
    },
    bodyColor: {
      active: true,
      value: {
        color: true,
        wood: true,
        venner: true,
        solid: true
      }
    },
    frontColor: {
      active: true,
      value: {
        color: true,
        wood: true,
        venner: true,
        solid: true
      }
    },
    individualColor: {
      active: true,
      value: {
        color: true,
        wood: true,
        venner: true,
        solid: true
      }
    },
    shelf: {
      active: true,
      value: {
        shelf: true,
        fold: true,
        glass: true,
        shoe: true
      }
    },
    drawer: {
      active: true,
      drawer: {
        active: true,
        value: {
          drawer1: true,
          drawer2: true,
          drawer3: true,
          customDrawer: true
        }
      },
      innerDrawer: {
        active: true,
        value: {
          drawer1: true,
          drawer2: true,
          drawer3: true
        }
      }
    },
    clothesRail: {
      active: true,
      value: {
        stange: true,
        lift: true,
        auszug: true
      }
    },
    griffe: {
      active: true,
      value: {
        push: true,
        mit: true
      }
    },
    door: {
      active: true,
      revolving: {
        active: true,
        value: {
          left: true,
          right: true,
          double: true
        },
      },
      mirror: {
        active: true,
        value: {
          left: true,
          right: true,
          double: true
        }
      },
      sliding: {
        active: true,
        value: {
          sliding1: true,
          sliding2: true
        }
      },
      flap: {
        active: true,
        value: {
          down: true,
          up: true
        }
      }
    },
    extra: {
      active: true,
      value: {
        led: true,
        divide: true
      }
    },
    feets: {
      active: true,
      value: {
        withFeet: true,
        hanging: true,
        withOutFeet: true
      }
    },
    handActive: [],
    feetActive: [],
    textureActive: [],
    setHandActive: (handActive) => set({ handActive}),
    setFeetActive: (feetActive) => set({feetActive}),
    setTextureActive: (textureActive) => set({textureActive}),
    setMinWidthC: (minWidthC) => set( { minWidthC }),
    setMaxWidthC: (maxWidthC) => set({ maxWidthC }),
    setMinHeightC: (minHeightC) => set({ minHeightC }),
    setMaxHeightC: (maxHeightC) => set({ maxHeightC }),
    setMinDepthC: (minDepthC) => set({ minDepthC }),
    setMaxDepthC: (maxDepthC) => set({ maxDepthC }),
    setBaseCutout: (baseCutout) => set({ baseCutout }),
    setExternalPanel: (externalPanel) => set({ externalPanel }),
    setKorpusFormA: (korpusFormA) => set({ korpusFormA }),
    setBodyColor: (bodyColor) => set({ bodyColor }),
    setFrontColor: (frontColor) => set({ frontColor }),
    setIndividualColor: (individualColor) => set({ individualColor}),
    setShelf: (shelf) => set({ shelf }),
    setDrawer: (drawer) => set({ drawer }),
    setClothesRail: (clothesRail) => set({ clothesRail }),
    setGriffe: (griffe) => set({ griffe }),
    setDoor: (door) => set({ door }),
    setExtra: (extra) => set({ extra }),
    setFeets: (feets) => set({ feets }),
    setWidth: (width) => set({width}),
    setHeight: (height) => set({height}),
    setDepth: (depth) => set({depth}),
    setManual: (manual) => set({manual}),
    setElementsCount: (elementsCount) => set({elementsCount}),
    setElementsWidths: (elementsWidths) => set({elementsWidths}),
    setEWidthsFixed: (eWidthsFixed) => set({eWidthsFixed}),
    setBaseType: (baseType) => set({baseType}),
    setEnableCoutout: (enableCutout) => set({enableCutout}),
    setCutoutDepth: (cutoutDepth) => set({cutoutDepth}),
    setCutoutHeight: (cutoutHeight) => set({cutoutHeight}),
    setEnableFittingPanel: (enableFittingPanel) => set({enableFittingPanel}),
    setKorpusForm: (korpusForm) => set({korpusForm}),
    setKorpusType: (korpusType) => set({korpusType}),
    setKorpusMaterial: (korpusMaterial) => set({korpusMaterial}),
    setFittingType: (fittingType) => set({fittingType}),
    setCornerView: (isCornerView) => set({isCornerView}),
    setHandle: (handle) => set({handle}),
    setHandleIndex: (handleIndex) => set({handleIndex}),
    setHandleListIndex: (handleListIndex) => set({handleListIndex}),
    setHandleDirection: (handleDirection) => set({handleDirection}),
    setFeet: (feet) => set({feet}),
    setFeetIndex: (feetIndex) => set({feetIndex}),
    setFeetListIndex: (feetListIndex) => set({feetListIndex}),
    setFeetCount: (feetCount) => set({feetCount}),
    setWithOutFeet: (withOutFeet) => set({withOutFeet}),
    setWithFeet: (withFeet) => set({withFeet}),
    setHanging: (hanging) => set({hanging}),
    setHangingSize: (hangingSize) => set({hangingSize}),
    setMinLength: (minLength) => set({minLength}),
    setMinHeight: (minHeight) => set({minHeight}),
    setPushOpen: (pushOpen) => set({pushOpen}),

    initDimentionActive: (payload) => {
      const {
        minWidth,
        maxWidth,
        minHeight,
        maxHeight,
        minDepth,
        maxDepth,
        baseCutout,
        externalPanel,
        korpusForm,
        bodyColor,
        frontColor,
        individualColor,
        shelf,
        drawer,
        clothesRail,
        griffe,
        door,
        extra,
        feets,
      } = payload
      set({
        minWidth,
        maxWidth,
        minHeight,
        maxHeight,
        minDepth,
        maxDepth,
        baseCutout,
        externalPanel,
        korpusForm,
        bodyColor,
        frontColor,
        individualColor,
        shelf,
        drawer,
        clothesRail,
        griffe,
        door,
        extra,
        feets,
      })
    },
    initDimentionMain: (payload) => {
      set(payload)
    }
  }))
)

export default useDimensionStore