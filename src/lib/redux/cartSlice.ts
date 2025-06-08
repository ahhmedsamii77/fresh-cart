import { createSlice } from "@reduxjs/toolkit";
import { CartSliceType } from "./cartSlice.types";
const initialState: CartSliceType = {
  numOfCartItems: 0,
  cartId: "",
  data: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartData: (prevState, action) => {
      prevState.data = action.payload.data;
      prevState.numOfCartItems = action.payload.numOfCartItems;
      prevState.cartId = action.payload.cartId;
    },
  },
});

export default cartSlice.reducer;
export const { setCartData } = cartSlice.actions;
