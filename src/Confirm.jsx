import { useEffect } from "react";
import Metadata from "./utilities/Metadata";
import { validateshipping } from "./Shipping";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { countries } from "countries-list";
import Steps from "./Steps";

const Confirm = () => {
  const { user } = useSelector((state) => state.authState);
  const { shippingAdress, items } = useSelector((state) => state.cartState);
  const navigate = useNavigate();
  const itemsPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingPrice = 10;

  const taxPrice = Number((itemsPrice * 0.05).toFixed(2));
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);



  useEffect(() => {
    validateshipping(shippingAdress, navigate);
  }, [shippingAdress, navigate]);

  const countryName =
    shippingAdress?.country && countries[shippingAdress.country]
      ? countries[shippingAdress.country].name
      : "";

     const paymentamount=()=>{
        const data=[
            taxPrice,
            shippingPrice,
            itemsPrice,
            totalPrice
        ]
        navigate("/payment")
        sessionStorage.setItem("payment",JSON.stringify(data))

     }


  return (
    <div className="container container-fluid">
        <Steps confirm={true} shipping={true} payment={false}/>
      <Metadata title={"Confirm Order"} />

      <div className="row d-flex justify-content-between">
        {/* LEFT */}
        <div className="col-12 col-lg-8 mt-5 order-confirm">
          <h4 className="mb-3">Shipping Info</h4>

          <p>
            <b>Name:</b> {user?.name}
          </p>
          <p>
            <b>Phone:</b> {shippingAdress?.phoneNo}
          </p>
          <p className="mb-4">
            <b>Address:</b>{" "}
            {shippingAdress?.address}, {shippingAdress?.city},{" "}
            {shippingAdress?.postalCode}, {countryName}
          </p>

          <hr />

          <h4 className="mt-4">Your Cart :</h4>
          <hr />

          {items?.map((item) => (
            <div className="cart-item my-5" key={item.product}>
              <div className="row align-items-center">
                <div className="col-4 col-lg-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    height="45"
                    width="65"
                  />
                </div>

                <div className="col-5 col-lg-5">
                  <a href={`/productdetails/${item.product}`}>
                    {item.name}
                  </a>
                </div>

                <div className="col-4 col-lg-2">
                  <p id="card_item_price">${item.price}</p>
                </div>

                <div className="col-4 col-lg-3">
                  <input
                    type="number"
                    className="form-control count d-inline"
                    value={item.quantity}
                    readOnly
                  />
                </div>
              </div>
            </div>
          ))}

          <hr />
        </div>

        {/* RIGHT */}
        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />

            <p>
              Subtotal:{" "}
              <span className="order-summary-values">
                ${itemsPrice.toFixed(2)}
              </span>
            </p>

            <p>
              Shipping:{" "}
              <span className="order-summary-values">${shippingPrice.toFixed(2)}</span>
            </p>

            <p>
              Tax: <span className="order-summary-values">
                ${taxPrice}
              
               </span>
            </p>

            <hr />

            <p>
              Total:{" "}
              <span className="order-summary-values">
                ${totalPrice}
              </span>
            </p>

            <hr />

            <button
              id="checkout_btn"
              className="btn btn-primary btn-block"
              onClick={paymentamount}

            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
