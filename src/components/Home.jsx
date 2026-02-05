import React, { Fragment, useEffect, useState,useRef } from "react";
import Metadata from "../utilities/Metadata";
import { useDispatch, useSelector } from "react-redux";
import { getproducts } from "../actions/ProductActions";
import { Link, useSearchParams } from "react-router-dom";
import Loader from "../utilities/Loader";
 import { toast } from 'react-toastify';

import ReactPaginate from 'react-paginate';
import NotFound from "./layouts/NotFound";
import Slider from "../utilities/Slider";
// import { useRef } from "react";

// import category from "../utilities/Category";
import Category from "../utilities/Category";
import Ratings from "../utilities/Ratings";
import { clearError } from "../slices/AuthSlices";


export default function Home() {
  const topRef=useRef(null)
  const bottomRef=useRef(null)


 const hasShownToast = useRef(false);
 const[page,setPage]=useState(1)
 const [price, setPrice] = useState([1, 1000]);
 const [searchParams] = useSearchParams();
 const keyword = searchParams.get('keyword') || "";
 const[category,setCategory]=useState(null);
 const[rating,setRating]=useState([1, 5]);





//  const[page,setPage]=useState({})
   const dispatch=useDispatch();
const{products,loading,error,filteredProductsCount,dperpage}=useSelector((state)=>state.productcardsSlicer)
    
 useEffect(() => {
  if (error) {
   toast.error(error, {
      position: "bottom-right",
      toastId: "error-toast",
      autoClose: 1000,
      onOpen:()=>dispatch(clearError())
   
    });
  }

}, [error,dispatch]);

useEffect(() => {
  dispatch(getproducts(page, keyword,price,category,rating));
  console.log(page)
}, [dispatch, page, keyword, price,category,rating]);





useEffect(() => {
  if (!loading && products?.length > 0 && !hasShownToast.current) {
    toast.success("Data fetched successfully", {
      position: "bottom-right",
      toastId: "data-fetched",
      autoClose: 1000,
      onOpen:()=>dispatch(clearError())

    });
    hasShownToast.current = true;
  }
}, [loading, products,dispatch]);

const handlePageClick = (e) => {
  setPage(e.selected + 1);
};
      
   
      console.log("rating"+rating)
  

 
      const scrollToTop = () => {
  topRef.current.scrollIntoView({ behavior: "smooth" });
};

const scrollToBottom = () => {
  bottomRef.current.scrollIntoView({ behavior: "smooth" });
};



  return (

    <>
    <Fragment>
    <Metadata title={"Latest Products"} />
      <h1 ref={topRef} id="products_heading" className="text-center my-4">{category?category:keyword?keyword:"latest prdoucts" }</h1>
{/* <button onClick={scrollToBottom}>⬇ Go Bottom</button> */}
        {loading ? <Loader/>:  <section id="products" className="container mt-5">
        <div className="row">
          <div className="col-md-3 mt-5">
            <h3>Filter by Price</h3>
            <Slider price={price} setPrice={setPrice} />
            <hr/>
            <h3>categories</h3>
           <Category setCategory={setCategory} />
            <hr/>
            <h3>ratings</h3>
           <Ratings rating={rating} setRating={setRating}/>
      
            <hr/>
           



          </div>
          <div className="col-md-9">
            <div className="row">
           
        {products && products.length > 0 ? products.map((product)=>(

          <div key={product._id} className="col-sm-12 col-md-6 col-lg-4 my-3">
            <div className="card p-3 rounded">
              <img
                className="card-img-top mx-auto"
                src={product.images[0].image}
                alt={product.name}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  <a href="#">
                    {product.name}
                  </a>
                </h5>
                <div className="ratings mt-auto">
                  <div className="rating-outer">
                    <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                  </div>
                  <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
                </div>
                <p className="card-text">${product.price}</p>

                <Link to={`/productdetails/${product._id}`} className="btn btn-block" id="view_btn">
                explore
            
                </Link>
              </div>
            </div>
          </div>
        )):<NotFound keyword={keyword}/>}
            </div>
            
          </div>
        </div >
        <div ref={bottomRef}><button onClick={scrollToTop}>⬆ Go Top</button></div>
      </section >
      
      
      }

 
      {dperpage < filteredProductsCount ? (
        <div className="d-flex justify-content-center mt-5">
          <ReactPaginate
            previousLabel={'Prev'}
            nextLabel={'Next'}
            breakLabel={'...'}
            pageCount={Math.ceil(filteredProductsCount / dperpage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            activeClassName={'active'}
            forcePage={page - 1}
          />
        </div>
      ):null}
      
     </Fragment>
    </>
  );
}
