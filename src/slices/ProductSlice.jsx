import { createSlice } from "@reduxjs/toolkit";
const productcardslice = createSlice({
  name: "product",
  initialState: {
    loading: false, 
  },
  reducers: {
    productRequest(state,action) {
      state.loading = true;
      state.product = [];
      state.error = null;
    },
    productSuccess(state, action) {
      state.loading = false;
      state.product = action.payload.product;
      state.error = null;
    },
    productFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const { reducer, actions } = productcardslice;
export const { productRequest, productSuccess, productFailure } = actions;
export default reducer;
