const Product = require('../model/prodcutmodel')
const errorhandler = require("../utils/errorhandler")
// const mongoose = require('mongoose');
const ApiFeatures = require('../utils/ApiFeatures');


exports.getproduct = async (req, res, next) => {
 try {
  const dperpage = 25;

  // Total products (no search, no filter)
  const productsCount = await Product.countDocuments();

  // Apply search & filter (without pagination)
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();
console.log("req.query",req.query)
  const filteredProducts = await apiFeatures.query;
  const filteredProductsCount = filteredProducts.length;

  // Apply pagination AFTER filtering
  apiFeatures.pagination(dperpage);
  const productsDetail = await apiFeatures.query.clone();
console.log(apiFeatures.query)
  return res.status(200).json({
    
    success: true,
    productsCount,
    filteredProductsCount,
    dperpage,
    products: productsDetail
    
  });

} catch (err) {
  return next(err);
}

};

exports.createproduct = async (req, res, next) => {
  try {
    req.body.user = req.user.id;
    console.log('Creating product with data:', req.body);
    const newProduct = await Product.create(req.body)
    res.status(201).json({
      success: true,
      product: newProduct
    })
  } catch (err) {
    // Pass original err so middleware can map ValidationError => 400
    return next(err);
  }
}

exports.getsingleproduct = async (req, res, next) => {
  const id = req.params.id;
  
  try {


    // validate ObjectId first to avoid Mongoose CastError


    const product = await Product.findById(id).populate('user', 'name email'); // 👈 only needed fields
    if (!product) {
      console.log('Product not found:', product);

      return next(new errorhandler('Product not found with this id', 404));


    }

    return res.status(200).json({
      success: true,
      product
    });
  } catch (err) {
    console.log('Fetching product with ID error:', id);
    return next(err)


  }
}

exports.updatedproduct = async (req, res, next) => {
  const id = req.params.id
  const product = await Product.findById(req.params.id)

  try {
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'

      })
    }
    const newproduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,



    }
    )
    return res.status(200).json({
      success: true,
      product: newproduct
    })

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    })

  }
}
exports.deleteproduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    });
  } catch (err) {
    return next(err);
  }
}
