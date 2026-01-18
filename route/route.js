const express=require('express');
const { getproduct ,createproduct,getsingleproduct,updatedproduct,deleteproduct} = require('../controllers/product');
const {authenticateduser,isauthorizedUser,

}=require('../middleware/autheticateduser');
const router=express.Router();
router.get('/getproduct',getproduct);
//protected route for admin only
router.post('/addproduct',authenticateduser,isauthorizedUser('admin','user'),createproduct);
router.get('/getsingleproduct/:id',getsingleproduct)
router.put('/updatedproduct/:id',authenticateduser,isauthorizedUser('admin','user'),updatedproduct)
router.delete("/deleteproduct/:id",authenticateduser,isauthorizedUser('admin'),deleteproduct)




module.exports=router;  
