import React, { useState } from "react";
import { countries } from "countries-list";
import { useSelector } from "react-redux";
import { shippingInfo } from "./slices/CartSlices";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Steps from "./Steps";
import { toast } from "react-toastify";
import Confirm from "./Confirm";


export const validateshipping = (shippingAdress, navigate) => {

    // const navigate=useNavigate();
    if(!shippingAdress || !shippingAdress.address || !shippingAdress.city || !shippingAdress.postalCode || !shippingAdress.phoneNo || !shippingAdress.country) {
        toast.error("Please fill in shipping information");
        navigate("/shipping");
    }
};
const Shipping = () => {
  





    const Navigate=useNavigate()
    const {shippingAdress}=useSelector(state=>state.cartState)
    const dispatch = useDispatch();
  const [address, setAddress] = useState(shippingAdress?.address || "");
  const [city, setCity] = useState(shippingAdress?.city || "");
  const [postalCode, setPostalCode] = useState(shippingAdress?.postalCode || "");
  const [phoneNo, setPhoneNo] = useState(shippingAdress?.phoneNo || "");
  const [country, setCountry] = useState(shippingAdress?.country || "");





  const selectedCountry = country ? countries[country] : null;
  console.log(selectedCountry);


  const submitHandler = (e) => {

    e.preventDefault();
    console.log({
      address,
      city,
      postalCode,
      phoneNo,
      country: selectedCountry
    })
    dispatch(shippingInfo( {
      address,
      city,
      postalCode,
      phoneNo,
      country
    } ))
    Navigate("/order/confirm")
 

 
  }
  const location = window.location;

  return (
<><Steps shipping={location.pathname === "/shipping"?true:false} confirm={location.pathname === "/order/confirm"?true:false} payment={location.pathname === "/payment"?true:false}/>

{location.pathname === "/shipping"?
 <div className="container container-fluid">
        
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandler}>
          <h1 className="mb-4">Shipping Info</h1>

          {/* Address */}
          <div className="form-group">
            <label htmlFor="address_field">Address</label>
            <input
              type="text"
              id="address_field"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          {/* City */}
          <div className="form-group">
            <label htmlFor="city_field">City</label>
            <input
              type="text"
              id="city_field"
              className="form-control"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          {/* Country */}
          <div className="form-group">
            <label htmlFor="country_field">Country</label>
            <select
              id="country_field"
              className="form-control"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            >
              <option value="">Select Country</option>
              {Object.keys(countries).map((code) => (
                <option key={code} value={code}>
                  {countries[code].name}
                  {countries[code].emoji
                  
                  }
                     
                </option>

              )
              )}
      
            </select>
          </div>
 
          {/* Phone */}
          <div className="form-group">
            <label htmlFor="phone_field">Phone No</label>
            <input
              type="tel"
              id="phone_field"
              className="form-control"
              placeholder={
                selectedCountry
                  ? `+${selectedCountry.phone}`
                  : "Enter phone number"
              }
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              required
            />
          </div>

          {/* Postal Code */}
          <div className="form-group">
            <label htmlFor="postal_code_field">Postal Code</label>
            <input
              type="text"
              id="postal_code_field"
              className="form-control"
              value={postalCode}
              
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-block py-3">
            CONTINUE
          </button>
        </form>
      </div>
    </div>
    </div>:
   location.pathname === "/order/confirm"?
    <Confirm/>:
  location.pathname === "/payment"&&
              <Payment/>
}





</>
   
  );
};

export default Shipping;
