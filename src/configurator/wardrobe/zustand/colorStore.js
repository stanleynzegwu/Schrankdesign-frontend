import createSelectors from "./createSelectors"
import Config from "../../config"
import { create } from "zustand"

const useColorStoreBase = create((set) => ({
  bodyType: Config.color.type.wood,
  bodyTexture: {
    map: Config.color.wood.type0.map,
    normalMap: Config.color.wood.type0.normalMap,
    aoMap: Config.color.wood.type0.aoMap,
    metalnessMap: Config.color.wood.type0.metalnessMap,
    roughnessMap: Config.color.wood.type0.roughnessMap,
    property: {...Config.material['wtype0']},
    initial: true
  },
  bodyInfo: Config.initialTexture.bodyInfo,
  frontType: Config.color.type.wood,
  frontTexture: {
    map: Config.color.wood.type0.map,
    normalMap: Config.color.wood.type0.normalMap,
    aoMap: Config.color.wood.type0.aoMap,
    metalnessMap: Config.color.wood.type0.metalnessMap,
    roughnessMap: Config.color.wood.type0.roughnessMap,
    property: {...Config.material['wtype0']},
    initial: true
  },
  frontInfo: Config.initialTexture.frontInfo,
  drawerInfo: Config.initialTexture.drawerInfo,
  setBodyType: (bodyType) => set({ bodyType }),
  setBodyTexture: (bodyTexture) => set({ bodyTexture }),
  setBodyInfo: (bodyInfo) => set({ bodyInfo }),
  setFrontType: (frontType) => set({ frontType }),
  setFrontTexture: (frontTexture) => set({ frontTexture }),
  setFrontInfo: (frontInfo) => set({ frontInfo}),
  setDrawerInfo: (drawerInfo) => set({ drawerInfo}),
  initColor: (payload) => {
    set(payload)
  }
}))

const useColorStore = createSelectors(useColorStoreBase)

export default useColorStore
