import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getproduct } from '../../actions/productSlieDetail'
import { toast } from 'react-toastify'
import Loader from '../../utilities/Loader'
import Metadata from '../../utilities/Metadata'
import { Link } from 'react-router-dom'
// import { useSelector } from 'react-redux'
import { cartItems } from '../../actions/ProductActions'

const ProductDetail = () => {
    // const{product}=useSelector(state=>state.productcarddetailslicer)
    const [quantity,setQuantity]=useState(1)

    const handleplus=()=>{
        if(product.stock > quantity){
            setQuantity(quantity+1)
        }
    }
    const handleminus=()=>{
        if(quantity > 1){
            setQuantity(quantity-1)
        }


    }


    const dispatch = useDispatch()
    const {product,error,loading}=useSelector(state=>state.productcarddetailslicer || {})
    const fullState = useSelector(state => state);
    console.log("DEBUG FULL STATE:", fullState); 
    const {id}=useParams()
    const [activeImage, setActiveImage] = useState('')

    useEffect(() => {
        if(product && product.images && product.images.length > 0){
            setActiveImage(product.images[0].image)
        }
    }, [product])

    const handleNextImage = () => {
        if (product.images && product.images.length > 0) {
            let currentIndex = product.images.findIndex(img => img.image === activeImage);
            if (currentIndex === -1) currentIndex = 0;
            const nextIndex = (currentIndex + 1) % product.images.length;
            setActiveImage(product.images[nextIndex].image);
        }
    }

    const handlePrevImage = () => {
        if (product.images && product.images.length > 0) {
            let currentIndex = product.images.findIndex(img => img.image === activeImage);
            if (currentIndex === -1) currentIndex = 0;
            const prevIndex = (currentIndex === 0) ? product.images.length - 1 : currentIndex - 1;
            setActiveImage(product.images[prevIndex].image);
        }
    }

useEffect(()=>{
    if(error){
       toast.error(error,{
        position:"top-center"
       })
    }
},[error])


    useEffect(()=>{
        

        dispatch(getproduct(id))

    },[dispatch,id])

    console.log("State Updated:", product); // 👈 Check console for this log



    const handleOreder=()=>{
        dispatch(cartItems(product._id,quantity))

    }
  return (
    <div>
        <Metadata title={product?.name}/>
        <h1>ProductDetail</h1>

        {loading ? <Loader/> : (
          product ? (
         <div className="container container-fluid">
        <div className="row d-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
               
                <div className="position-relative">
                    <img src={activeImage || (product.images && product.images[0] ? product.images[0].image : '')} alt={product.name} height="500" width="500" className="d-block w-100"/>
                    {product.images && product.images.length > 1 && (
                        <>
                            <button className="carousel-control-prev" type="button" onClick={handlePrevImage} style={{filter: 'invert(1)'}}>
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            </button>
                            <button className="carousel-control-next" type="button" onClick={handleNextImage} style={{filter: 'invert(1)'}}>
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            </button>
                        </>
                    )}
                </div>
                <div className="row mt-2">
                    {product.images && product.images.map(image => (
                        <div key={image._id} className="col-3">
                            <img 
                                className={`img-fluid ${image.image === activeImage ? "border border-warning" : ""}`}
                                src={image.image} 
                                alt={product.name} 
                                onClick={() => setActiveImage(image.image)}
                                style={{cursor: 'pointer'}}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="col-12 col-lg-5 mt-5">
                <h3>{product.name}</h3>
                <p id="product_id">{product._id}</p>

                <hr/>

                <div className="rating-outer">
                    <div className="rating-inner"></div>
                </div>
                <span id="no_of_reviews">{product.numOfReviews}</span>

                <hr/>
                 
                <p id="product_price">{product.price}</p>
                <div className="stockCounter d-inline">
                    <span className="btn btn-danger minus" onClick={handleminus}>-</span>

                    <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                    <span className="btn btn-primary plus" onClick={handleplus}>+</span>
                </div>
                 <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4"
                 disabled={product.stock === 0} onClick={handleOreder}>Add to Cart</button>

                <hr/>

                <p>Status: <span id="stock_status">{product.stock}</span></p>

                <hr/>


                <h4 className="mt-2">Description:</h4>
                <p>{product.description}</p>
                <hr/>
                <p id="product_seller" className="mb-3">Sold by: <strong>{product.user?.name}</strong></p>
				
				<button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                            Submit Your Review
                </button>
				
				<div className="row mt-2 mb-5">
                    <div className="rating w-50">

                        <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">

                                        <ul className="stars" >
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                        </ul>

                                        <textarea name="review" id="review" className="form-control mt-3">

                                        </textarea>

                                        <button className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
						
            </div>

        </div>
        </div>
        </div>
          ) : <h2 className="text-center mt-5">Product Not Found</h2>)}
      </div>
  )
}



export default ProductDetail
