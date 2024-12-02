import { create } from "zustand";
import Config from "@src/configurator/config";
import createSelectors from "./createSelectors";

const useDndStoreBase = create((set) => ({
  type: Config.furnishing.type.shelf,
  drawerHeight: Config.furnishing.drawer.defaultHeight[1],
  drawerTopDistance: Config.furnishing.drawer.topShelfDistance,
  
  drawerType: Config.furnishing.drawer.type.drawer8,
  door_category: Config.door.category.standard,
  door_type: Config.door.type.revolving_left,
  flap_type: Config.door.type.flap_down,

  assetDragging: false,
  productDragging: false,
  frontplateVisible: true,

  currentIndex: null,
  setCurrentIndex: (currentIndex) => set({ currentIndex }),

  setType: (type) => set({ type }),
  setDrawerHeight: (drawerHeight) => set({ drawerHeight }),
  setDrawerTopDistance: (drawerTopDistance) => set({ drawerTopDistance }),
  setProductDragging: (productDragging) => set({ productDragging }),
  setDoorType: (door_type) => set({ door_type }),
  setFlapType: (flap_type) => set({ flap_type }),
  setDoorCategory: (door_category) => set({ door_category }),
  setAssetDragging: (assetDragging) => set({ assetDragging }),
  setDrawerType: (drawerType) => set({ drawerType }),
  setFrontPlateVisible: (frontplateVisible) => set({frontplateVisible})
}))

const useDndStore = createSelectors(useDndStoreBase);

export default useDndStore;
