import React from 'react'
import { Link } from 'react-router-dom'

const Steps = ({shipping, payment, confirm}) => {
  return (
    <div>
     
    


    <div className="checkout-progress d-flex justify-content-center mt-5">
     
      {/* Shipping Step */}
      {shipping ? (
        <Link to="/shipping" className="float-right">
          <div className="triangle2-active"></div>
          <div className={`step ${payment ? "complete" : "active"}`}>Shipping Info</div>
          <div className={`${payment ? "triangle-completed" : "triangle-active"}`}></div>
        </Link>
      ) : (
        <Link to="#!" disabled>
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">Shipping Info</div>
          <div className="triangle-incomplete"></div>
        </Link>
      )}

        {/* Confirm Step */}
      {confirm ? (
        <Link to="/order/confirm" className="float-right">
          <div className="triangle2-active"></div>
          <div className="step active">Confirm Order</div>
          <div className="triangle-active"></div>
        </Link>
      ) : (
        <Link to="#!" disabled>
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">Confirm Order</div>
          <div className="triangle-incomplete"></div>
        </Link>
      )}

      {/* Payment Step */}
      {payment ? (
        <Link to="/payment" className="float-right">
          <div className={`${confirm ? "triangle2-completed" : "triangle2-active"}`}></div>
          <div className={`step ${confirm ? "complete" : "active"}`}>Payment</div>
          <div className={`${confirm ? "triangle-completed" : "triangle-active"}`}></div>
        </Link>
      ) : (
        <Link to="#!" disabled>
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">Payment</div>
          <div className="triangle-incomplete"></div>
        </Link>
      )}

    
    </div>
    </div>
  )
}

export default Steps
   
