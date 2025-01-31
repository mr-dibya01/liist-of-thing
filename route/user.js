const express=require("express");
const router=express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl }=require("../middleware.js")
const userController=require("../controller/user.js");

router
    .route("/signup")
    .get(userController.renderUserSignInFrom)
    .post(userController.createNewUser);

router
    .route("/login")
    .get(userController.renderUserLogInFrom)
    .post(saveRedirectUrl ,
      passport.authenticate("local",{
            failureRedirect:"/login",
            failureFlash:true,
        }) ,
     userController.checkUser
    );
      
router.get("/logout",userController.logOutUser);

// app.get("/demouser",async (req,res)=>{
//    let fakeUser=new User({
//     email:"milionaire@gmail.com",
//     username:"millionaire"
//    });
//    let registeredUser= await User.register(fakeUser,"hello");
//    res.send(registeredUser);
// });



module.exports=router;