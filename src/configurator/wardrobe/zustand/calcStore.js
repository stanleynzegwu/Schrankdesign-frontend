import createSelectors from "./createSelectors"
import { create } from "zustand"

const useCalcStore = createSelectors(
  create((set) => ({
    calcInfo: {},
    setCalcInfo: (calcInfo) => set({ calcInfo }),
  }))
)

export default useCalcStore
