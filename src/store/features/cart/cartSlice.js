import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("schrankdesign-app-cart")) || []
      : [],
  musterItems:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("musteritems")) || []
      : [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket(state, action) {
      state.items = [...state.items, action.payload];
      saveToSessionStorage(state.items);
    },
    addToMusterBasket(state, action) {
      state.musterItems = [...state.musterItems, action.payload];
      saveToSessionStorageMuster(state.musterItems);
    },
    removeFromBasket(state, action) {
      const { id } = action.payload;
      const index = state.items.findIndex((basketItem) => basketItem.id === id);

      if (index >= 0) {
        // Create a new array without the item to be removed
        const newBasket = [
          ...state.items.slice(0, index),
          ...state.items.slice(index + 1),
        ];

        // Update the state with the new array
        state.items = newBasket;
        saveToSessionStorage(newBasket);
      } else {
        console.warn("Can't remove as it is not in the basket");
      }
    },
    removeFromMusterBasket(state, action) {
      const { id } = action.payload;
      const index = state.musterItems.findIndex(
        (basketItem) => basketItem.id === id
      );

      if (index >= 0) {
        // Create a new array without the item to be removed
        const newBasket = [
          ...state.musterItems.slice(0, index),
          ...state.musterItems.slice(index + 1),
        ];

        // Update the state with the new array
        state.musterItems = newBasket;
        saveToSessionStorageMuster(newBasket);
      } else {
        console.warn("Can't remove as it is not in the basket");
      }
    },
    emptyBasket(state) {
      state.items = [];
    },
  },
});

export const {
  addToMusterBasket,
  removeFromMusterBasket,
  addToBasket,
  removeFromBasket,
  emptyBasket,
} = basketSlice.actions;

export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) =>
  state.basket.items.reduce((total, item) => total + item.price, 0);

export default basketSlice.reducer;

const saveToSessionStorage = (basketItems) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("schrankdesign-app-cart", JSON.stringify(basketItems));
  }
};
const saveToSessionStorageMuster = (basketItems) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("musteritems", JSON.stringify(basketItems));
  }
};
