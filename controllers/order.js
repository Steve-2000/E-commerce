const orderModel = require('../model/ordermodel')
const errorhandler = require('../utils/errorhandler')
const productModel = require('../model/prodcutmodel')

const userModel = require('../model/usermodel')



exports.createorder = async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body
  const order = await orderModel.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user: req.user.id,
    paidAt: Date.now()
  })
  res.status(201).json({
    sucess: true,
    order

  })

}

//get single oredr
exports.getsingleorder = async (req, res, next) => {
  const order = await orderModel.findById(req.params.id).populate('user', "name email");
  if (!order) {
    return next(new errorhandler(`order not found with this ${req.params.id}`, 404));

  }
  res.status(200).json({
    success: true,
    order,

  })
}




//admin get all oredrs+ order amount 
exports.getallorders = async (req, res, next) => {
  const order = await orderModel.find();
  let totalamount = 0;
  order.forEach(order => {
    totalamount += order.totalPrice
  })
  res.status(200).json({
    success: true,
    order,
    length: order.length,
    totalamount

  })


}

//admin update 
exports.updateorder = async (req, res, next) => {
  const order = await orderModel.findById(req.params.id);
  if (order.orderStatus == "delivered") {
    return next(new errorhandler("order already delivered", 400))
  }
  await Promise.all(order.orderItems.map(item => {
    return productupdate(item.product, item.quantity)


  }))
  order.orderStatus = req.body.status;
  if (req.body.status === "delivered") {
    order.deliveredAt = Date.now();
  }
  await order.save()

  return res.status(201).json({
    success: true,
    order
  }


  )
}
async function productupdate(productid, quantity) {
  const product = await productModel.findById(productid);
  product.stock = product.stock - quantity;
  await product.save({ validateBeforeSave: false })
}

//admin delete order 
exports.deleteorder = async (req, res, next) => {
  const order = await orderModel.findById(req.params.id);
  if (!order) {
    return next(new errorhandler("order not found", 400))
  }
  await order.deleteOne()
  res.status(201).json({
    success: true,
    order

  })
}


exports.userreview = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const { rating, comment } = req.body;
    const userId = req.user.id; // make sure your auth middleware sets this

    // 1️⃣ Find the product
    const product = await productModel.findById(productId);
    if (!product) {
      return next(new errorhandler("Product not found", 404));
    }

    // 2️⃣ Check if the user already reviewed
    const existingReview = product.reviews.find(
      review => review?.user?.toString() === userId.toString()
    );

    if (existingReview) {
      // 3️⃣ Update existing review
      existingReview.rating = rating;
      existingReview.comment = comment;
    } else {
      // 4️⃣ Add new review
      product.reviews.push({
        user: userId,
        rating,
        comment
      });
    }

    // 5️⃣ Update number of reviews

    // 6️⃣ Recalculate average rating
    const totalRating = product.reviews.reduce((acc, review) => {
      return acc + review.rating;
    }, 0);

    product.ratings = totalRating / product.reviews.length;


    // 7️⃣ Save the product document
    await product.save({ validateBeforeSave: false });

    res.status(201).json({
      success: true,
      message: "Review added/updated successfully"
    });
  } catch (error) {
    next(error);
  }
};

exports.getreview = async (req, res, next) => {
  const product = await productModel.findById(req.params.id);
  if (!product) {
    return next(new errorhandler("product not found", 400))
  }

  res.status(200).json({
    success: true,
    product: product.reviews
  })
}

exports.deletereview = async (req, res, next) => {
  const product = await productModel.findById(req.query.productid);
  if (!product) {
    return next(new errorhandler("product not found", 400))

  }
  const remainreview = product.reviews.filter(obj =>
    obj._id.toString() !== req.query.id.toString()

  )
  const numOfReviews = remainreview.length;
  const totalRatings = remainreview.reduce((acc, review) => {
    return acc + review.rating
  }, 0)
  const ratings = numOfReviews === 0 ? 0 : totalRatings / numOfReviews;
  const updatereview = await productModel.findByIdAndUpdate(req.query.productid, {
    reviews: remainreview, ratings, numOfReviews
  }, {
    validateBeforeSave: false,
    new: true,
  }
  )
  res.status(200).json({
    success: true,
    updatereview
  })




}