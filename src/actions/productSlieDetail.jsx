import {productRequest,productSuccess,productFailure } from "../slices/ProductSlice";
import axios from 'axios'


export const getproduct = (id) => async(dispatch)=>{
    try{
        dispatch(productRequest())
        const {data}=await axios.get(`http://localhost:5000/api/v1/getsingleproduct/${id}`)

        dispatch(productSuccess(data))
        console.log(data)


    }
    catch(err){
        // Handle cases where response is undefined (e.g., Network Error)
        const errorMessage = err.response && err.response.data ? err.response.data.message : err.message;
        dispatch(productFailure(errorMessage));
    }
}