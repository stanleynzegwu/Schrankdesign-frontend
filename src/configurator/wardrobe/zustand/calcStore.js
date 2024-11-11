import createSelectors from "./createSelectors"
import { create } from "zustand"

const useCalcStore = createSelectors(
  create((set) => ({
    calcInfo: {},
    dimensionInfo: [],
    elementsInfo: [],

    showMeasure: false,

    measureInfo: {
      posX: 0,
      aboveTop: 0,
      aboveBottom: 0,
      belowTop: 0,
      belowBottom: 0,
    },

    setShowMeasure: (showMeasure) => set({ showMeasure }),
    setMeasureInfo: (measureInfo) => set({ measureInfo }),

    setCalcInfo: (calcInfo) => set({ calcInfo }),
    setDimensionInfo: (dimensionInfo) => set({dimensionInfo}),
    setElementsInfo: (elementsInfo) => set({elementsInfo}),
  }))
)

export default useCalcStore;
