const express=require('express');
// const { isauthorizedUser } = require('../middleware/autheticateduser');
const {registeruser,loginuser,logoutuser,forgotpassword,resetpassword,getuserprofile
    ,passwordchange,updateuserprofile,
        userdelete,updateuser,singleuser,getallusers
}=require('../controllers/auth');
const { isauthorizedUser,authenticateduser} = require('../middleware/autheticateduser');
const router=express.Router()
const path = require('path')
const fs = require('fs')

const multer  = require('multer')
const storage = multer.diskStorage({
 destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/Data/uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({ storage: storage })

router.post("/register",upload.single('avatar'),registeruser);
router.post("/login",loginuser);
router.post("/logout",logoutuser);
router.post("/forgotpassword",forgotpassword);
router.put("/password/reset/:token",resetpassword);
router.get("/userprofile",authenticateduser,getuserprofile)
router.put("/passwordchange",authenticateduser,passwordchange)
router.put("/updateprofile",authenticateduser,upload.single('avatar'),updateuserprofile)

// Admin routes
router.get("/allusers",authenticateduser,isauthorizedUser('admin'),getallusers);
router.get("/singleuser/:id",authenticateduser,isauthorizedUser('admin'),singleuser);
router.put("/updateuser/:id",authenticateduser,isauthorizedUser('admin'),updateuser);
router.delete("/deleteuser/:id",authenticateduser,isauthorizedUser('admin'),userdelete);



module.exports=router;