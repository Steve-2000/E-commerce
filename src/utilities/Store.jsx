import {configureStore, combineReducers} from '@reduxjs/toolkit'
// slicers :product
import productcardsSlicer from '../slices/ProductSlices'
import productSlieDetail from '../slices/ProductSlice'
import authReducer from '../slices/AuthSlices'
import cartSlicer from '../slices/CartSlices'




const reducer=combineReducers({
    productcardsSlicer:productcardsSlicer,
    productcarddetailslicer:productSlieDetail,
    authState:authReducer,
    cartState:cartSlicer

})

const Store = configureStore({
    reducer
})

export default Store;