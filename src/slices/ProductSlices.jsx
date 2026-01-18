import { createSlice } from "@reduxjs/toolkit";
const productcardslice = createSlice({
  name: "products",
  initialState: {
    loading: false, 
  },
  reducers: {
    productsrequest(state,action) {
      state.loading = true;
      state.products = [];
      state.error = null;
    },
    productssuccess(state, action) {
      state.loading = false;
      state.products = action.payload.products;
      state.error = null;
      state.productsCount=action.payload.productsCount
      state.filteredProductsCount=action.payload.filteredProductsCount
      state.dperpage=action.payload.dperpage
      
  
    },
    productsfailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const { reducer, actions } = productcardslice;
export const { productsrequest, productssuccess, productsfailure } = actions;
export default reducer;
