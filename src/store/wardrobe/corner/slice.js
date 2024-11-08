import { createSlice } from "@reduxjs/toolkit"
import Config from "@src/configurator/config"

const initialState = {
  assetInfo: {
    scale: [47.6, Config.furnishing.divider.defaultHeight, 60],
    leftWidth: 23.8,
  },
  showDividerInfo: false,
}

export const cornerSlice = createSlice({
  name: "corner",
  initialState,
  reducers: {
    setShowDividerInfo: (state, action) => {
      state.showDividerInfo = action.payload
    },
    setAssetInfo: (state, action) => {
      state.assetInfo = { ...action.payload }
    },
  },
})

export const {
  setShowDividerInfo,
  setAssetInfo,
} = cornerSlice.actions

export default cornerSlice.reducer
