import { createSlice } from "@reduxjs/toolkit";
import { WishListType } from "./wishlistSlice.types";
const initialState: WishListType = {
  count: 0,
  data: null,
};
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlistData: (prevState, action) => {
      prevState.count = action.payload.count;
      prevState.data = action.payload.data;
    },
  },
});

export default wishlistSlice.reducer;
export const { setWishlistData } = wishlistSlice.actions;
