const express=require('express');
const router=express.Router();
const {createorder,getsingleorder,
    getallorders,updateorder,deleteorder,userreview,getreview,deletereview
}=require('../controllers/order')
const {authenticateduser,isauthorizedUser}=require('../middleware/autheticateduser')
router.post("/order",authenticateduser, createorder)
router.get("/getsingleorder/:id",getsingleorder)

//admin route
router.get("/getallorders",authenticateduser,isauthorizedUser('user'),getallorders)
router.put("/updateorder/:id",authenticateduser,isauthorizedUser('user'), updateorder)
router.delete("/deleteorder/:id",authenticateduser,isauthorizedUser('user'),deleteorder)
router.put("/userreview/:id",authenticateduser,isauthorizedUser('user'),userreview)

//get review 
router.get("/getreview/:id",getreview)
router.delete("/deletereview",deletereview)

module.exports=router;