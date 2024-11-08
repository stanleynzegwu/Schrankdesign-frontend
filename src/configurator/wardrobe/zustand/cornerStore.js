import createSelectors from "./createSelectors"
import Config from "../../config"
import { create } from "zustand"

const useCornerStore = createSelectors(
  create((set) => ({
    showDimensions: false,
    openDoor: false,
    viewOption: Config.view.front,
    setShowDimensions: (showDimensions) => set({ showDimensions }),
    setOpenDoor: (openDoor) => set({ openDoor }),
    setViewOption: (viewOption) => set({ viewOption }),
  }))
)

export default useCornerStore
