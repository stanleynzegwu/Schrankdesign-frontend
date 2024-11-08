import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./features/user/userSlice"
import cartSlice from "./features/cart/cartSlice"
import cornerReducer from "./wardrobe/corner/slice"

export const store = configureStore({
  reducer: {
    user: userSlice,
    basket: cartSlice,
    corner: cornerReducer,
  },
})
