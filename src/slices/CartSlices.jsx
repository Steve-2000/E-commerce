import { createSlice } from "@reduxjs/toolkit";
const productcardslice = createSlice({
  name: "product",
  initialState: {
    items: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    loading: false,
    error: null,
    shippingAdress: localStorage.getItem("shippingAdress")
      ? JSON.parse(localStorage.getItem("shippingAdress"))
      : null,
  },
  reducers: {
    cardAddRequest(state,action) {
      state.loading = true;
    },
    cardAddSuccess(state, action) {
      state.loading = false;
      const item = action.payload;
      const isItemExist = state.items.find(i => i.product === item.product);
      
      if (isItemExist) {
      state.items = state.items.map(i => i.product === item.product ? item : i);
      } else {
        state.items.push(item);
      }
      
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    cardAddFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    deleteCartItem(state, action) {
      state.items = state.items.filter(i => i.product !== action.payload);
      state.erro=null;
    },
    deletefail(state,action){
      state.error=action.payload
    },
    shippingInfo(state,action){
      state.shippingAdress=action.payload
      state.error=null
      localStorage.setItem("shippingAdress", JSON.stringify(state.shippingAdress));

    }
  },
});

const { reducer, actions } = productcardslice;
export const { cardAddRequest,cardAddSuccess,cardAddFail,
  deleteCartItem,deletefail,
  shippingInfo

} = actions;
export default reducer;


