import React from 'react'
import Steps from './Steps'

const Payment = () => {
                 
    const paymentamount=()=>{
      


    }
  return (
    <div>
 
<Steps shipping={true} confirm={true} payment={true}/>


        <div className="row wrapper">
		<div className="col-10 col-lg-5">
            <form className="shadow-lg">
                <h1 className="mb-4">Card Info</h1>
                <div className="form-group">
                  <label for="card_num_field">Card Number</label>
                  <input
                    type="text"
                    id="card_num_field"
                    className="form-control"
                    value=""
                  />
                </div>
				
				<div className="form-group">
                  <label for="card_exp_field">Card Expiry</label>
                  <input
                    type="text"
                    id="card_exp_field"
                    className="form-control"
                    value=""
                  />
                </div>
				
				<div className="form-group">
                  <label for="card_cvc_field">Card CVC</label>
                  <input
                    type="text"
                    id="card_cvc_field"
                    className="form-control"
                    value=""
                  />
                </div>
      
            
                <button
                  id="pay_btn"
                  type="submit"
                  className="btn btn-block py-3"
                 
                >
                  Pay
                </button>
    
              </form>
			  </div>
        </div>

    </div>
  )
}

export default Payment