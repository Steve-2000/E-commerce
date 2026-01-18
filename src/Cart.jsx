import React from 'react'
import { useSelector } from 'react-redux'
// import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteitem } from './actions/ProductActions'
// import {deleteCartItem} from './slices/CartSlices'
import { cartItems } from './actions/ProductActions'
// import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { Navigate } from 'react-router-dom'



const Cart = () => {
    const dispatch = useDispatch()
    // const location=useLocation()\\
    const navigate=useNavigate()

    const { items } = useSelector(state => state.cartState)
    
    
        const handleplus=({id, currentQuantity, stock})=>{
           let newQuantity;
            if(stock > currentQuantity){
                newQuantity = currentQuantity + 1
                dispatch(cartItems(id, newQuantity))
        



                

                
            }
        }
        const handleminus=({id,quantity})=>{
             let quantity1;
            if(quantity>1){
                quantity1=quantity-1
                dispatch(cartItems(id,quantity1))
            }
        }
        const handledelete=(id)=>{
            dispatch(deleteitem(id))
        }

const checkout=()=>{
    navigate("/login?redirect=shipping")
  



}

                

                
            

    

  return (
  
        
    <div className="container container-fluid">
    
        <h2 className="mt-5">Your Cart: <b>{items.length} items</b></h2>
        
        <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
                {items.map(item => (
                    item.quantity > 0 && (
                           <React.Fragment key={item.product}>
                <hr />
                <div className="cart-item">
                    <div className="row">
                        <div className="col-4 col-lg-3">
                            <img src={item.image} alt={item.name} height="90" width="115"/>
                        </div>

                        <div className="col-5 col-lg-3">
                            <a href={`/productdetails/${item.product}`}>{item.name}</a>
                        </div>


                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                            <p id="card_item_price">{item.price}</p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" onClick={()=>handleminus({id:item.product,quantity:item.quantity,stock:item.stock})}>-</span>
                                <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />

								<span className="btn btn-primary plus" onClick={()=>handleplus({id:item.product,currentQuantity:item.quantity,stock:item.stock})}>+</span>
                            </div>
                        </div>
 
                          <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                            <i id="delete_cart_item" className="btn btn-danger"onClick={()=>handledelete(item.product)}>🗑️</i>
                        </div>


                    </div>
                </div>
                </React.Fragment>
                )
                ))}
                <hr />
            </div>

            <div className="col-12 col-lg-3 my-4">
                <div id="order_summary">
                    <h4>Order Summary</h4>
                    <hr />
                    <p>Subtotal:  <span className="order-summary-values">{items.reduce((acc, item) => (acc + Number(item.quantity)), 0)} (Units)</span></p>
                    <p>Est. total: <span className="order-summary-values">${items.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</span></p>
    
                    <hr />
                    <button id="checkout_btn" className="btn btn-primary btn-block" disabled={items.length === 0} onClick={checkout}>Check out</button>
                </div>
                      
                    
             
            </div>
        </div>
    </div>

  )
}

export default Cart