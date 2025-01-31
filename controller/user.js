const User = require("../models/user.js");

module.exports.renderUserSignInFrom=(req,res)=>{
    res.render("user/signup.ejs");
}

module.exports.createNewUser=async (req,res,next)=>{
 try{
   let { username,password,email }=req.body;
   let newUser=new User({ email, username, password });
   let registeredUser=await User.register(newUser,password);
   req.logIn(registeredUser , (err)=>{
   if(err){
    return next(err);
   }
   req.flash("success","Welcome to Wanderlust");
   res.redirect("/listings");
   });
 }catch(e){
    req.flash("error",e.message);
    res.redirect("/signup");
 }
}

module.exports.renderUserLogInFrom=(req,res)=>{
    res.render("user/login.ejs");
 }

module.exports.checkUser=async (req,res)=>{
    // res.send("Welcome to wanderlust! You are logged in!");
    req.flash("success","Welcome to wanderlust! You are logged in!");
    const redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logOutUser=(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
          return next(err);
        }
        req.flash("success", "you are logged out!");
        res.redirect("/listings");
    });
}