import { productsfailure,productsrequest,productssuccess } from "../slices/ProductSlices";
import axios from 'axios'
import {cardAddFail,cardAddRequest,cardAddSuccess,
    deleteCartItem,deletefail
} from "../slices/CartSlices"



export const getproducts = (currentPage = 1, keyword = null,price=[1,1000],category=null,rating=[1,5]) => async(dispatch)=>{
    try{
        dispatch(productsrequest())
        let link = `http://localhost:5000/api/v1/getproduct?page=${currentPage}`
        if(!(keyword==""|| null)){
            link += `&keyword=${keyword}`
        }
        if(price[0] && price[1]){
            link += `&price[lte]=${price[1]}&price[gte]=${price[0]}`
        }
        if(category!=null){
            link+=`&category=${category}`
        }
        if(rating[0] && rating[1]){
            link += `&ratings[lte]=${rating[1]*2}&ratings[gte]=${rating[0]}`
        }
        const {data} = await axios.get(link)
        dispatch(productssuccess(data))
        console.log(data)
        



    }
    catch(err){
        // Handle cases where response is undefined (e.g., Network Error)
        const errorMessage = err.response && err.response.data ? err.response.data.message : err.message;
        dispatch(productsfailure(errorMessage));
    }
}

//cart
export const cartItems=(_id,quantity)=>async(dispatch)=>{
    try{
        dispatch(cardAddRequest())
        const{data}=await axios.get(`http://localhost:5000/api/v1/getsingleproduct/${_id}`)
        dispatch(cardAddSuccess({
            product:data.product._id,
            quantity,
            price:data.product.price,
            image:data.product.images[0].image,
            name:data.product.name,
            stock:data.product.stock,
            
        }))
                 console.log(data)
       
    }catch(err){
        const error= err.response && err.response.data ? err.response.data.message : err.message;
        dispatch(cardAddFail(error))

    }


}
export const deleteitem = (id) => async (dispatch) => {
    try {

      dispatch(deleteCartItem(id));


}catch(err){
    dispatch(deletefail(err?.message))
}
}